const express = require("express");
const contactAdminRoutes = require("./admin/Contact");

const router = express.Router();

router.use("/admin", contactAdminRoutes);

module.exports = router;
