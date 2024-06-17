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
        productPrice: {
          type: Number,
          required: true,
        },
        picturePath: {
          type: String,
          default: "",
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
  try {
    const lastOrder = await Order.findOne({}, {}, { sort: { _id: -1 } });
    let nextOrderId;

    if (lastOrder) {
      const lastOrderIdNumeric = parseInt(lastOrder._id.slice(2), 10); // Extract numeric part
      const nextOrderIdNumeric = lastOrderIdNumeric + 1;
      nextOrderId = "bk" + String(nextOrderIdNumeric).padStart(6, "0");
    } else {
      nextOrderId = "bk000001";
    }

    this._id = nextOrderId;
    next();
  } catch (err) {
    next(err); // Pass any errors to the next middleware
  }
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
