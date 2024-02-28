import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 100,
    },
    cart: [
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
    wishlist: [
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
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    const lastUser = await User.findOne({}, {}, { sort: { _id: -1 } });
    let nextUserId;

    if (lastUser) {
      const lastUserIdNumeric = parseInt(lastUser._id.slice(2), 10); // Extract numeric part
      const nextUserIdNumeric = lastUserIdNumeric + 1;
      nextUserId = "nz" + String(nextUserIdNumeric).padStart(6, "0");
    } else {
      nextUserId = "nz000001";
    }

    this._id = nextUserId;
    next();
  } catch (err) {
    next(err); // Pass any errors to the next middleware
  }
});

const User = mongoose.model("User", UserSchema);
export default User;
