const Message = require("../models/Message");
const Chat = require("../models/Chat");
const User = require("../models/User");

// POST /api/message — Send a new message
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).send("Missing content or chatId");
  }

  try {
    const newMessage = await Message.create({
      sender: req.user._id,
      content,
      chat: chatId,
    });

    // populate sender with user info
    let fullMessage = await newMessage.populate("sender", "name email role");
    fullMessage = await fullMessage.populate("chat");
    fullMessage = await User.populate(fullMessage, {
      path: "chat.users",
      select: "name email role",
    });

    // update latestMessage on chat
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: fullMessage,
    });

    res.status(200).json(fullMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Failed to send message");
  }
};

// GET /api/message/:chatId — Get all messages in a chat
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email role")
      .populate("chat");

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Failed to get messages");
  }
};
module.exports = {
  sendMessage,
  getAllMessages,
};