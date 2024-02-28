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

export const addRemoveDeleteCart = async (req, res) => {
  try {
    const { id, productId } = req.params;
    const { action } = req.body;
    const user = await User.findById(id);

    const index = user.cart.findIndex((item) => item.productId === productId);

    if (action === "add") {
      if (index !== -1) {
        user.cart[index].quantity++;
      } else {
        user.cart.push({ productId, quantity: 1 });
      }
    } else if (action === "remove" && index !== -1) {
      if (user.cart[index].quantity > 1) {
        user.cart[index].quantity--;
      } else {
        user.cart.splice(index, 1);
      }
    } else if (action === "delete" && index !== -1) {
      user.cart.splice(index, 1);
    } else {
      return res
        .status(400)
        .json({ message: "Item does not exist in the cart" });
    }

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveDeleteWishlist = async (req, res) => {
  try {
    const { id, productId } = req.params;
    const { action } = req.body;
    const user = await User.findById(id);

    const index = user.wishlist.findIndex((item) => item.productId === productId);

    if (action === "add") {
      if (index !== -1) {
        user.wishlist[index].quantity++;
      } else {
        user.wishlist.push({ productId, quantity: 1 });
      }
    } else if (action === "remove" && index !== -1) {
      if (user.wishlist[index].quantity > 1) {
        user.wishlist[index].quantity--;
      } else {
        user.wishlist.splice(index, 1);
      }
    } else if (action === "delete" && index !== -1) {
      user.wishlist.splice(index, 1);
    } else {
      return res
        .status(400)
        .json({ message: "Item does not exist in the wishlist" });
    }

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};