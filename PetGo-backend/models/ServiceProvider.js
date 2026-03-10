const mongoose = require("mongoose");
const User = require("./User");

const serviceProviderSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  address: {
    type: String,
    required: true,
    trim: true
  },

  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },

  phone: {
    type: String,
    required: true,
    trim: true
  },

  image: {
    type: String,
    default: "no-photo.jpg"
  },

  email: {
    type: String,
    required: true,
    trim: true
  }

},
{ timestamps: true }
);

// Khi tạo service provider → user trở thành shop_owner
serviceProviderSchema.pre("save", async function(next) {
  if (this.isNew) {
    const user = await User.findById(this.user);
    if (user) {
      user.role = "shop_owner";
      await user.save();
    }
  }
  next();
});

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema);