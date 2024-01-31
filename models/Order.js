import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    productList: {
      type: Array,
      default: [],
    },
    orderDate: {
      type: Date,
      required: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    transactionAmount: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
