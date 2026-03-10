const mongoose = require("mongoose");
const ServiceCategory = require("./ServiceCategory");
const ServiceProvider = require("./ServiceProvider");

const petServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add service name"],
      trim: true,
      maxlength: [100, "Service name cannot be more than 100 characters"],
    },

    description: {
      type: String,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: true,
    },

    serviceProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",
      required: true,
    },

    price: {
      type: Number,
      required: [true, "Please add service price"],
      min: [0, "Price cannot be less than 0"],
    },

    duration: {
      type: Number, // phút
      required: true,
    },

    image: {
      type: String,
      default: "no-photo.jpg",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("PetService", petServiceSchema);
