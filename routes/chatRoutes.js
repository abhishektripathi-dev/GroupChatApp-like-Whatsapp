const express = require("express");
const { chatMsgToDb } = require("../controllers/chatController");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.use("/chat",authenticate ,chatMsgToDb);

module.exports = router;
