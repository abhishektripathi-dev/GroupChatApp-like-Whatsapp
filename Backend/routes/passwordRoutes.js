const express = require("express");
const {
    updatepassword,
    resetpassword,
    forgotpassword,
} = require("../controllers/resetPasswordController");

const router = express.Router();

router.post("/forgotpassword", forgotpassword);

router.get("/updatepassword/:resetpasswordid", updatepassword);

router.post("/resetpassword/:id", resetpassword);

module.exports = router;
