import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    productList: [
      {
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
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

OrderSchema.pre("save", async function (next) {
  const lastOrder = await Order.findOne({}, {}, { sort: { _id: -1 } });
  const nextOrderNumber = lastOrder
    ? String(Number(lastOrder._id) + 1).padStart(6, "0")
    : "000001";

  this._id = nextOrderNumber;
  next();
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
