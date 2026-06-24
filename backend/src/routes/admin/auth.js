const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  changeAdminPassword,
} = require("../../controllers/admin/auth");

console.log("ran auth.js");
// Admin Login (sign in)
router.post("/login", loginAdmin);

// Change Admin Password
router.put("/change-password", changeAdminPassword);

module.exports = router;
