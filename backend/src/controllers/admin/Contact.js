const mongoose = require("mongoose");
const Contact = require("../../models/Contact");

const createContact = async (req, res) => {
  try {
    console.log(`[TRACE ${req.requestId || "n/a"}] createContact start`);
    const contact = await Contact.create(req.body);
    console.log(
      `[TRACE ${req.requestId || "n/a"}] createContact saved id=${contact._id}`,
    );
    return res.status(201).json(contact);
  } catch (error) {
    console.error(
      `[TRACE ${req.requestId || "n/a"}] createContact failed: ${error.message}`,
    );
    return res.status(400).json({ message: error.message });
  }
};

const getContacts = async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const contact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json(contact);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};
