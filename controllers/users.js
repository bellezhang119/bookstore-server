import User from "../models/User";
import bcrypt from "bcrypt";

// Read
export const getUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

// Update
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

export const updatePassword = async (req, res) => {
  try {
    const _id = req.params._id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(_id);
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

    res.status(200).json({ msg: "Password updated successfully "});
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
