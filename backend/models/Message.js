// const mongoose = require('mongoose');

// const Message = new mongoose.Schema({
//   chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
//   sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   content: { type: String, required: true }
// },
// {timestamps: true}
// );

// const MessageModel = mongoose.model("Message", Message);
// module.exports = MessageModel;


const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);