const express = require("express");
const { getChat, addChat } = require("../controllers/chatController");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.post("/chat", authenticate, addChat);
router.get("/chat", getChat);

module.exports = router;
