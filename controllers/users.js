import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import bcrypt from "bcrypt";

// Read
// Get user by id
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

// Get orders associated with id
export const getUserOrders = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
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
// Update user fields
export const updateUser = async (req, res) => {
  try {
    const { _id, firstName, lastName, phoneNumber, birthday } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      _id,
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

// Updated password (If current password is correct)
export const updatePassword = async (req, res) => {
  try {
    const _id = req.params._id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // Hash new password
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

// Append wishlist to cart
export const addWishlistToCart = async (req, res) => {
  try {
    const userId = req.params._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Create new cart map
    const cartMap = {};

    // Add all items in current cart to new cart
    // Append or initiate quantity to 0 before adding quantity if item doesn't exist
    user.cart.forEach((item) => {
      cartMap[item.productId] = (cartMap[item.productId] || 0) + item.quantity;
    });

    // Add all items in current wishlist to new cart
    // Append or initiate quantity to 0 before adding quantity if item doesn't exist
    user.wishlist.forEach((item) => {
      cartMap[item.productId] = (cartMap[item.productId] || 0) + item.quantity;
    });

    // Convert cart map into cart array
    const updatedCart = Object.keys(cartMap).map((productId) => ({
      productId,
      quantity: cartMap[productId],
    }));

    // Find user document by id
    // Clear wishlist and update cart
    await User.updateOne(
      { _id: userId },
      { $set: { wishlist: [], cart: updatedCart } }
    );

    const updatedUser = await User.findById(userId);

    res.status(200).json(updatedUser.cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get user's cart by id
export const getUserCart = async (req, res) => {
  try {
    const userId = req.params._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItems = user.cart;

    const productDetailsPromises = cartItems.map(async (item) => {
      const product = await Product.findById(item.productId);
      return {
        product,
        quantity: item.quantity,
      };
    });

    const cartDetails = await Promise.all(productDetailsPromises);

    res.status(200).json(cartDetails);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { _id, productId } = req.params;

    const updatedUser = await User.findOneAndUpdate(
      { _id: _id, "cart.productId": productId }, // Find user with given ID and matching cart item
      { $inc: { "cart.$.quantity": 1 } }, // Increment quantity if cart item exists
      { new: true } // Return the modified user document
    );

    if (!updatedUser) {
      // If user is not found or cart item does not exist, add a new item to cart
      const newUser = await User.findByIdAndUpdate(
        _id,
        { $push: { cart: { productId, quantity: 1 } } },
        { new: true }
      );
      return res.status(200).json(newUser);
    } else {
      return res.status(200).json(updatedUser);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Remove item from cart, if the quantity is 1, delete item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { _id, productId } = req.params;

    // Find the user and check if the product is in the cart
    const user = await User.findOne({ _id, "cart.productId": productId });
    if (!user) {
      return res.status(404).json({ message: "User or cart item not found" });
    }

    // Find the cart item and its quantity
    const cartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (cartItem.quantity === 1) {
      // Remove the item from the cart if the quantity is 1
      await User.updateOne({ _id }, { $pull: { cart: { productId } } });
    } else {
      // Decrement the quantity of the cart item
      await User.updateOne(
        { _id, "cart.productId": productId },
        { $inc: { "cart.$.quantity": -1 } }
      );
    }

    const updatedUser = await User.findById(_id);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete item from cart
export const deleteFromCart = async (req, res) => {
  try {
    const { _id, productId } = req.params;

    // Find the user and update the cart
    const updatedUser = await User.findOneAndUpdate(
      { _id: _id },
      { $pull: { cart: { productId: productId } } }, // Remove item from cart based on productId
      { new: true } // Return the modified user document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user wishlist by id
export const getUserWishlist = async (req, res) => {
  try {
    const userId = req.params._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const wishlistItems = user.wishlist;

    const productDetailsPromises = wishlistItems.map(async (item) => {
      const product = await Product.findById(item.productId);
      return {
        product,
        quantity: item.quantity,
      };
    });

    const wishlistDetails = await Promise.all(productDetailsPromises);

    res.status(200).json(wishlistDetails);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Add item to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { _id, productId } = req.params;
    const user = await User.findById(_id);

    const updatedUser = await User.findOneAndUpdate(
      { _id: _id, "wishlist.productId": productId }, // Find user with given ID and matching wishlist item
      { $inc: { "wishlist.$.quantity": 1 } }, // Increment quantity if wishlist item exists
      { new: true } // Return the modified user document
    );

    if (!updatedUser) {
      // If user is not found or wishlist item does not exist, add a new item to wishlist
      const newUser = await User.findByIdAndUpdate(
        _id,
        { $push: { wishlist: { productId, quantity: 1 } } },
        { new: true }
      );
      return res.status(200).json(newUser);
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Remove item from wishlist, is quantity is 1, delete item from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { _id, productId } = req.params;

    // Find the user and check if the product is in the wishlist
    const user = await User.findOne({ _id, "wishlist.productId": productId });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User or wishlist item not found" });
    }

    // Find the wishlist item and its quantity
    const wishlistItem = user.wishlist.find(
      (item) => item.productId.toString() === productId
    );
    if (!wishlistItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    if (wishlistItem.quantity === 1) {
      // Remove the item from the wishlist if the quantity is 1
      await User.updateOne({ _id }, { $pull: { wishlist: { productId } } });
    } else {
      // Decrement the quantity of the wishlist item
      await User.updateOne(
        { _id, "wishlist.productId": productId },
        { $inc: { "wishlist.$.quantity": -1 } }
      );
    }

    const updatedUser = await User.findById(_id); // Get the updated user document
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete item from wishlist
export const deleteFromWishlist = async (req, res) => {
  try {
    const { _id, productId } = req.params;

    // Find the user and update the wishlist
    const updatedUser = await User.findOneAndUpdate(
      { _id: _id },
      { $pull: { wishlist: { productId: productId } } }, // Remove item from wishlist based on productId
      { new: true } // Return the modified user document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
