const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth");
const groupController = require("../controllers/groupController");

router.post("/creategroup", authenticate, groupController.createGroup);
router.get("/getgroup", authenticate, groupController.getGroups);
router.get("/checkadmin/:groupId", authenticate, groupController.checkAdmin);

module.exports = router;
