import Order from "../models/Order.js";
import User from "../models/User.js";

// Create
export const createOrder = async (req, res) => {
  try {
    const { productList, userId } = req.body;

    if (!productList || !userId) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const user = await User.findById(userId);

    let transactionAmount = 0;
    productList.forEach((item) => {
      const itemPrice = parseFloat(item.productPrice) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;
      transactionAmount += itemPrice * itemQuantity;
    });

    const orderData = {
      productList,
      orderDate: new Date(),
      transactionAmount,
      userId,
    };

    const order = new Order(orderData);
    await order.save();

    await User.updateOne({ _id: userId }, { $set: { cart: [] } });

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
