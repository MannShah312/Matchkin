const express = require("express");
const router = express.Router();
const passport = require("passport");
const { sendMessage, getAllMessages } = require("../controllers/messageControllers");

// Send a message
router.post("/", passport.authenticate("jwt", { session: false }), sendMessage);

// Get all messages for a given chat
router.get("/:chatId", passport.authenticate("jwt", { session: false }), getAllMessages);

module.exports = router;