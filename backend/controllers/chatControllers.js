  // const Chat = require("../models/Chat");
  // const User = require("../models/User");

  // const accessChat = async (req, res) => {
  //   const { userId } = req.body;

  //   if (!userId) return res.status(400).send("UserId param not sent");

  //   try {
  //     let chat = await Chat.findOne({
  //       isGroupChat: false,
  //       users: { $all: [req.user._id, userId] },
  //     })
  //       .populate("users", "-password")
  //       .populate("latestMessage");

  //     if (chat) return res.send(chat);

  //     // Create new chat
  //     const newChat = await Chat.create({
  //       chatName: "sender",
  //       isGroupChat: false,
  //       users: [req.user._id, userId],
  //     });

  //     const fullChat = await Chat.findById(newChat._id).populate("users", "-password");
  //     res.status(200).send(fullChat);
  //   } catch (err) {
  //     res.status(500).send({ message: "Failed to access chat", error: err.message });
  //   }
  // };

  // const fetchChats = async (req, res) => {
  //   try {
  //     const chats = await Chat.find({ users: req.user._id })
  //       .populate("users", "-password")
  //       .populate("groupAdmin", "-password")
  //       .populate("latestMessage")
  //       .sort({ updatedAt: -1 });

  //     res.status(200).send(chats);
  //   } catch (err) {
  //     res.status(500).send({ message: "Failed to fetch chats", error: err.message });
  //   }
  // };

  // const createGroupChat = async (req, res) => {
  //   const { users, name } = req.body;

  //   if (!users || !name) {
  //     return res.status(400).send("Please provide all fields");
  //   }

  //   let usersArray = JSON.parse(users);
  //   if (usersArray.length < 2) {
  //     return res.status(400).send("Group chat needs at least 3 users");
  //   }

  //   usersArray.push(req.user); // add current user

  //   try {
  //     const groupChat = await Chat.create({
  //       chatName: name,
  //       isGroupChat: true,
  //       users: usersArray,
  //       groupAdmin: req.user._id,
  //     });

  //     const fullGroup = await Chat.findById(groupChat._id)
  //       .populate("users", "-password")
  //       .populate("groupAdmin", "-password");

  //     res.status(200).send(fullGroup);
  //   } catch (err) {
  //     res.status(500).send({ message: "Failed to create group", error: err.message });
  //   }
  // };

  // const renameGroup = async (req, res) => {
  //   const { chatId, chatName } = req.body;

  //   const updatedChat = await Chat.findByIdAndUpdate(
  //     chatId,
  //     { chatName },
  //     { new: true }
  //   )
  //     .populate("users", "-password")
  //     .populate("groupAdmin", "-password");

  //   if (!updatedChat) return res.status(404).send("Chat Not Found");

  //   res.status(200).send(updatedChat);
  // };

  // const addToGroup = async (req, res) => {
  //   const { chatId, userId } = req.body;

  //   const updatedChat = await Chat.findByIdAndUpdate(
  //     chatId,
  //     { $addToSet: { users: userId } },
  //     { new: true }
  //   )
  //     .populate("users", "-password")
  //     .populate("groupAdmin", "-password");

  //   if (!updatedChat) return res.status(404).send("Chat Not Found");

  //   res.status(200).send(updatedChat);
  // };

  // const removeFromGroup = async (req, res) => {
  //   const { chatId, userId } = req.body;

  //   const updatedChat = await Chat.findByIdAndUpdate(
  //     chatId,
  //     { $pull: { users: userId } },
  //     { new: true }
  //   )
  //     .populate("users", "-password")
  //     .populate("groupAdmin", "-password");

  //   if (!updatedChat) return res.status(404).send("Chat Not Found");

  //   res.status(200).send(updatedChat);
  // };

  // module.exports = {
  //   accessChat,
  //   fetchChats,
  //   createGroupChat,
  //   renameGroup,
  //   addToGroup,
  //   removeFromGroup,
  // };


  const Chat = require("../models/Chat");
  const User = require("../models/User");
  const Message = require("../models/Message");

  const accessChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ message: "UserId param not sent" });

    try {
      let chat = await Chat.findOne({
        isGroupChat: false,
        users: { $all: [req.user._id, userId] },
      })
        .populate("users", "-password")
        .populate("latestMessage");

      if (chat) return res.status(200).json(chat); // ✅ fixed

      const newChat = await Chat.create({
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      });

      await Message.create({
      sender: req.user._id,
      content: "👋 Chat started!",
      chat: newChat._id,
      });

      const fullChat = await Chat.findById(newChat._id).populate("users", "-password");
      res.status(200).json(fullChat); // ✅ fixed
    } catch (err) {
      res.status(500).json({ message: "Failed to access chat", error: err.message });
    }
  };

  // const fetchChats = async (req, res) => {
  //   try {
  //     const chats = await Chat.find({ users: req.user._id })
  //       .populate("users", "-password")
  //       .populate("groupAdmin", "-password")
  //       .populate("latestMessage")
  //       .sort({ updatedAt: -1 });

  //     res.status(200).json(chats); // ✅ fixed
  //   } catch (err) {
  //     res.status(500).json({ message: "Failed to fetch chats", error: err.message });
  //   }
  // };

  const fetchChats = async (req, res) => {
    try {
      const chats = await Chat.find({
        users: { $elemMatch: { $eq: req.user._id } },
      })
        .populate("users", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });

      res.status(200).json(chats);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  // const createGroupChat = async (req, res) => {
  //   const { users, name } = req.body;

  //   if (!users || !name) {
  //     return res.status(400).json({ message: "Please provide all fields" });
  //   }

  //   let usersArray = JSON.parse(users);
  //   if (usersArray.length < 2) {
  //     return res.status(400).json({ message: "Group chat needs at least 3 users" });
  //   }

  //   usersArray.push(req.user);

  //   try {
  //     const groupChat = await Chat.create({
  //       chatName: name,
  //       isGroupChat: true,
  //       users: usersArray,
  //       groupAdmin: req.user._id,
  //     });

  //     const fullGroup = await Chat.findById(groupChat._id)
  //       .populate("users", "-password")
  //       .populate("groupAdmin", "-password");

  //     res.status(200).json(fullGroup); // ✅ fixed
  //   } catch (err) {
  //     res.status(500).json({ message: "Failed to create group", error: err.message });
  //   }
  // };

const createGroupChat = async (req, res) => {
  const { users, name } = req.body;

  if (!users || !name) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  let usersArray = users;

  if (usersArray.length < 2) {
    return res.status(400).json({ message: "Group chat needs at least 3 users" });
  }

  usersArray.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: name,
      isGroupChat: true,
      users: usersArray,
      groupAdmin: req.user._id,
    });

    const fullGroup = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroup);
  } catch (err) {
    res.status(500).json({ message: "Failed to create group", error: err.message });
  }
};

  const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) return res.status(404).json({ message: "Chat Not Found" });

    res.status(200).json(updatedChat); // ✅ fixed
  };

  const addToGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) return res.status(404).json({ message: "Chat Not Found" });

    res.status(200).json(updatedChat); // ✅ fixed
  };

  const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) return res.status(404).json({ message: "Chat Not Found" });

    res.status(200).json(updatedChat); // ✅ fixed
  };

  module.exports = {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup,
  };