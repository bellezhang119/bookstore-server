import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
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
    description: {
        type: String,
    },
    authorList: {
      type: Array,
      default: [],
    },
    authorNames: {
      type: Array,
      default: [],
    },
    categoryList: {
      type: [String],
      enum: [
        "Drama",
        "Horror",
        "Thriller",
        "Fiction",
        "Classic",
        "Science Fiction",
        "Dystopian",
        "Satire",
        "Political Allegory",
        "Mystery",
        "Detective",
        "Romance",
        "Adventure",
        "Historical Fiction",
        "Fantasy",
        "Young Adult",
        "Non-Fiction",
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
