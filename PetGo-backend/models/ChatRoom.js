const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",
      required: true,
    },
    lastMessage: {
      type: String,
      default: "", // Lưu text tin nhắn cuối để hiện ở danh sách chat nhanh
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Một user và một shop chỉ có 1 phòng chat duy nhất với nhau
chatRoomSchema.index({ customer: 1, shop: 1 }, { unique: true });

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
