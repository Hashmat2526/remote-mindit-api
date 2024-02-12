// controllers/characterController.js
const Character = require("../models/character.model");

// Get all characters with pagination
exports.getAllCharacters = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
  const pageSize = parseInt(req.query.pageSize) || 8; // Default page size to 10 if not specified

  try {
    const totalCharacters = await Character.countDocuments();
    const totalPages = Math.ceil(totalCharacters / pageSize);
    const characters = await Character.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ characters, totalPages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a character by ID
exports.getCharacterById = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (character == null) {
      return res.status(404).json({ message: "Character not found" });
    }
    res.json(character);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a character by ID
exports.updateCharacter = async (req, res) => {
  try {
    const character = await Character.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (character == null) {
      return res.status(404).json({ message: "Character not found" });
    }
    res.json(character);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Delete a character by ID
exports.deleteCharacter = async (req, res) => {
  try {
    const character = await Character.findByIdAndDelete(req.params.id);
    if (character == null) {
      return res.status(404).json({ message: "Character not found" });
    }
    res.json({ message: "Character deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
