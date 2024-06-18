import Product from "../models/Product.js";

// Read
// Get product with matching search (name or author name), categories, price range and sort
export const getProducts = async (req, res) => {
  try {
    const { categories, search, minPrice, maxPrice, sort } = req.query;

    let query = {};
    if (categories) {
      query.categoryList = { $in: categories.split(',') };
    }

    // Filter by matching product name and author name
    if (search) {
      query.$or = [
        { productName: { $regex: search, $options: "i" } },
        { authorNames: { $elemMatch: { $regex: search, $options: "i" } } },
      ];
    }

    if (minPrice || maxPrice) {
      query.productPrice = {};
      if (minPrice) {
        query.productPrice.$gte = parseInt(minPrice);
      }
      if (maxPrice) {
        query.productPrice.$lte = parseInt(maxPrice);
      }
    }

    let sortOptions = {};
    if (sort) {
      if (sort === "priceAsc") sortOptions.productPrice = 1;
      if (sort === "priceDesc") sortOptions.productPrice = -1;
      if (sort === "dateAsc") sortOptions.publishDate = 1;
      if (sort === "dateDesc") sortOptions.publishDate = -1;
    }

    const products = await Product.find(query).sort(sortOptions);

    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

// Get product by id
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
