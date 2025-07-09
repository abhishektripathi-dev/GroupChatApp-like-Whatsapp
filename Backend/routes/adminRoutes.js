const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth");
const adminController = require("../controllers/adminController");

router.post("/addmember", authenticate, adminController.addMember);
router.get("/getmember/:groupId", authenticate, adminController.getMembers);
router.post("/makeadmin", authenticate, adminController.makeAdmin);
router.delete("/removemember/:groupId/:userId", adminController.removeMember);

module.exports = router;
