const express = require("express");
const contactAdminRoutes = require("./admin/Contact");
const authAdminRoutes = require("./admin/auth");

const router = express.Router();

console.log('ran index.js');
router.use("/api/admin", authAdminRoutes);
router.use("/api/admin", contactAdminRoutes);


module.exports = router;
