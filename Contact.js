const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: false },
    phone_number: { type: Number, required: true },
    address: { type: String, required: true },
    profile_picture: { type: String, required: false },
    favourite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
