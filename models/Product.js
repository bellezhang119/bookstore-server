import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    publishDate: {
      type: Date,
      required: true,
    },
    authorList: {
      type: Array,
      default: [],
    },
    categoryList: {
      type: [String],
      enum: [
        "Fiction",
        "Non-Fiction",
        "Mystery",
        "Romance",
        "Science Fiction",
        "Fantasy",
        "Biography",
        "Self-Help",
        "Poetry",
        "History",
        "Other",
      ],
    },
    picturePath: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
