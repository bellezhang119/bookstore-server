import Order from "./models/Order.js";

// Create
export const createOrder = async (req, res) => {
  try {
    const { productList, userId } = req.body;

    if (!productList || !userId) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const productDetails = await Promise.all(
      productList.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          productId: item.productId,
          quantity: item.quantity,
          productPrice: product ? product.productPrice : 0,
        };
      })
    );

    const transactionAmount = productDetails.reduce(
      (total, item) => total + item.quantity * item.productPrice,
      0
    );

    const orderData = {
      productList,
      orderDate: new Date(),
      transactionAmount,
      userId,
    };

    const order = new Order(orderData);
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

// Read
export const getOrder = async (req, res) => {
  try {
    const order = Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

// Update
export const updateOrder = async (req, res) => {
  try {
    const order = Order.findById(req.params.id);

    const { updateType } = req.body;
    if (
      !updateType ||
      (updateType !== "isComplete" && updateType !== "isCancelled")
    ) {
      return res.status(400).json({ msg: "Invalid updateType parameter" });
    }

    if (updateType === "isComplete") {
      order.isComplete = true;
    } else if (updateType === "isCancelled") {
      order.isCancelled = true;
    }

    await order.save();

    res.status(200).json(order);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
