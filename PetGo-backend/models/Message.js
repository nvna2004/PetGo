const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Dù là shop thì người nhắn vẫn là 1 User (chủ shop)
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Cập nhật lastMessage của ChatRoom mỗi khi có tin nhắn mới
messageSchema.post("save", async function (doc, next) {
  const ChatRoom = mongoose.model("ChatRoom");
  await ChatRoom.findByIdAndUpdate(doc.chatRoom, {
    lastMessage: doc.text,
    lastMessageAt: doc.createdAt,
  });
  next();
});

module.exports = mongoose.model("Message", messageSchema);
