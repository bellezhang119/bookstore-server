import User from "../models/User.js";
import Product from "../models/Product.js";
import bcrypt from "bcrypt";

// Read
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const userOrders = await Order.find({ userId: user._id });
    res.status(200).json({ userOrders });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

// Update
export const updateUser = async (req, res) => {
  try {
    const { id, firstName, lastName, phoneNumber, birthday } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, phoneNumber, birthday },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const salt = await bcrypt.genSalt();
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { password: newPasswordHash },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ msg: "Password updated successfully " });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { id, productId } = req.params;

    // Find the user and update the cart
    const updatedUser = await User.findOneAndUpdate(
      { _id: id, "cart.productId": productId }, // Find user with given ID and matching cart item
      { $inc: { "cart.$.quantity": 1 } }, // Increment quantity if cart item exists
      { new: true } // Return the modified user document
    );

    if (!updatedUser) {
      // If user is not found or cart item does not exist, add a new item to cart
      const newUser = await User.findByIdAndUpdate(
        id,
        { $push: { cart: { productId, quantity: 1 } } },
        { new: true }
      );
      console.log("New item added to cart");
      return res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id, productId } = req.params;

    // Find the user and update the cart
    const updatedUser = await User.findOneAndUpdate(
      { _id: id, "cart.productId": productId }, // Find user with given ID and matching cart item
      [
        {
          $set: {
            "cart.$[element].quantity": {
              $cond: {
                if: { $eq: ["$cart.quantity", 1] }, // If quantity is 1
                then: 0, // Set quantity to 0 (remove item from cart)
                else: { $subtract: ["$cart.quantity", 1] }, // Decrease quantity by 1
              },
            },
          },
        },
      ],
      { arrayFilters: [{ "element.productId": productId }], new: true } // Return the modified user document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User or cart item not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteFromCart = async (req, res) => {
  try {
    const { id, productId } = req.params;

    // Find the user and update the cart
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $pull: { cart: { productId: productId } } }, // Remove item from cart based on productId
      { new: true } // Return the modified user document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { id, productId } = req.params;
    const user = await User.findById(id);

    // Find the user and update the wishlist
    const updatedUser = await User.findOneAndUpdate(
      { _id: id, "wishlist.productId": productId }, // Find user with given ID and matching wishlist item
      { $inc: { "wishlist.$.quantity": 1 } }, // Increment quantity if wishlist item exists
      { new: true } // Return the modified user document
    );

    if (!updatedUser) {
      // If user is not found or wishlist item does not exist, add a new item to wishlist
      const newUser = await User.findByIdAndUpdate(
        id,
        { $push: { wishlist: { productId, quantity: 1 } } },
        { new: true }
      );
      console.log("New item added to wishlist");
      return res.status(200).json(newUser);
    }

    console.log("Quantity incremented");
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { id, productId } = req.params;

    // Find the user and update the wishlist
    const updatedUser = await User.findOneAndUpdate(
      { _id: id, "wishlist.productId": productId }, // Find user with given ID and matching wishlist item
      [
        {
          $set: {
            "wishlist.$[element].quantity": {
              $cond: {
                if: { $eq: ["$wishlist.quantity", 1] }, // If quantity is 1
                then: 0, // Set quantity to 0 (remove item from wishlist)
                else: { $subtract: ["$wishlist.quantity", 1] }, // Decrease quantity by 1
              },
            },
          },
        },
      ],
      { arrayFilters: [{ "element.productId": productId }], new: true } // Return the modified user document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User or wishlist item not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteFromWishlist = async (req, res) => {
  try {
    const { id, productId } = req.params;

    // Find the user and update the wishlist
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $pull: { wishlist: { productId: productId } } }, // Remove item from wishlist based on productId
      { new: true } // Return the modified user document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
