const express = require("express");
const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../../controllers/admin/Contact");

const router = express.Router();

router.use((req, _res, next) => {
  console.log(
    `[TRACE ${req.requestId || "n/a"}] Matched /admin${req.path} (${req.method})`,
  );
  next();
});

router.post("/", createContact);
router.get("/", getContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
