// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const Chat = require('../models/Chat');
// const Message = require('../models/Message');

// // ✅ Create or get a 1-to-1 chat
// router.post('/start', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   try {
//     const { userId } = req.body;

//     if (userId === req.user._id.toString()) {
//       return res.status(400).json({ error: "Can't chat with yourself" });
//     }

//     let chat = await Chat.findOne({
//       isGroup: false,
//       participants: { $all: [req.user._id, userId], $size: 2 }
//     });

//     if (!chat) {
//       chat = new Chat({
//         isGroup: false,
//         participants: [req.user._id, userId],
//         createdBy: req.user._id
//       });
//       await chat.save();
//     }

//     res.json(chat);
//   } catch (err) {
//     console.error('1-to-1 chat error:', err.message);
//     res.status(500).json({ error: 'Failed to start chat' });
//   }
// });

// // ✅ Create a group chat
// router.post('/group', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   try {
//     const { name, participantIds } = req.body;

//     if (!name || !participantIds || participantIds.length < 2) {
//       return res.status(400).json({ error: "Group name and at least 2 participants required" });
//     }

//     const chat = new Chat({
//       isGroup: true,
//       name,
//       participants: [...participantIds, req.user._id],
//       createdBy: req.user._id
//     });

//     await chat.save();
//     res.json(chat);
//   } catch (err) {
//     console.error('Group chat error:', err.message);
//     res.status(500).json({ error: 'Failed to create group chat' });
//   }
// });

// // ✅ Get all chats for logged-in user
// router.get('/list', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   try {
//     const chats = await Chat.find({ participants: req.user._id })
//       .populate('participants', 'name email')
//       .sort({ updatedAt: -1 });

//     res.json(chats);
//   } catch (err) {
//     console.error('Chat list error:', err.message);
//     res.status(500).json({ error: 'Failed to fetch chat list' });
//   }
// });

// // ✅ Get all messages for a chat
// router.get('/:chatId/messages', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   try {
//     const chatId = req.params.chatId;

//     const messages = await Message.find({ chatId })
//       .populate('sender', 'name email')
//       .sort('timestamp');

//     res.json(messages);
//   } catch (err) {
//     console.error('Message fetch error:', err.message);
//     res.status(500).json({ error: 'Failed to fetch messages' });
//   }
// });

// // POST /chat/send
// // router.post("/send", passport.authenticate("jwt", { session: false }), async (req, res) => {
// //   const { chatId, content } = req.body;

// //   if (!chatId || !content) {
// //     return res.status(400).json({ error: "Missing chatId or content" });
// //   }

// //   try {
// //     const message = new Message({
// //       chatId,
// //       sender: req.user._id,
// //       content,
// //     });

// //     await message.save();
// //     await message.populate("sender", "name email");
// //     res.status(200).json(populated);

// //     // res.status(200).json({
// //     //   _id: message._id,
// //     //   chatId: message.chatId,
// //     //   content: message.content,
// //     //   sender: {
// //     //     _id: message.sender._id,
// //     //     name: message.sender.name,
// //     //     email: message.sender.email,
// //     //   },
// //     //   timestamp: message.timestamp,
// //     // });
// //   } catch (err) {
// //     console.error("Error in /chat/send:", err);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });
// router.post("/send", passport.authenticate("jwt", { session: false }), async (req, res) => {
//   const { chatId, content } = req.body;

//   if (!chatId || !content) {
//     return res.status(400).json({ error: "Missing chatId or content" });
//   }

//   try {
//     const message = new Message({
//       chatId,
//       sender: req.user._id,
//       content,
//     });

//     await message.save();

//     // Populate sender properly
//     const populatedMessage = await Message.findById(message._id).populate("sender", "name email");

//     res.status(200).json(populatedMessage);
//   } catch (err) {
//     console.error("Error in /chat/send:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");
const { getAllMessages, sendMessage } = require("../controllers/messageControllers");

// Access or create a one-to-one chat
router.post("/", passport.authenticate("jwt", { session: false }), accessChat);

// Fetch all chats for logged-in user
router.get("/list", passport.authenticate("jwt", { session: false }), fetchChats);

// Create a group chat
router.post("/group", passport.authenticate("jwt", { session: false }), createGroupChat);

// Rename group
router.put("/rename", passport.authenticate("jwt", { session: false }), renameGroup);

// Add user to group
router.put("/groupadd", passport.authenticate("jwt", { session: false }), addToGroup);

// Remove user from group
router.put("/groupremove", passport.authenticate("jwt", { session: false }), removeFromGroup);

router.post('/start', passport.authenticate('jwt', { session: false }), accessChat);

// Fetch all messages in a chat
router.get("/:chatId/messages", passport.authenticate("jwt", { session: false }), getAllMessages);

// Send a new message
router.post("/message", passport.authenticate("jwt", { session: false }), sendMessage);

module.exports = router;