import Product from "../models/Product.js";

// Read
export const getProducts = async (req, res) => {
  try {
    const { category, search, price } = req.query;

    let query = {};
    if (category) {
      query.categoryList = category;
    }

    if (search) {
      query.$or = [
        { productName: { $regex: search, $options: "i" } },
        { authorList: { $regex: search, $options: "i" } },
      ];
    }

    if (price) {
      const [minPrice, maxPrice] = price.split("-");
      query.productPrice = {
        $gte: parseInt(minPrice),
        $lte: parseInt(maxPrice),
      };
    }

    const products = await Product.find(query);

    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
