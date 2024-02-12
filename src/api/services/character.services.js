// services/characterService.js
const Character = require("../models/character.model");

// Get all characters
exports.getAllCharacters = async () => {
  try {
    return await Character.find();
  } catch (err) {
    throw new Error("Error fetching characters");
  }
};

// Create a new character
exports.createCharacter = async (characterData) => {
  try {
    const character = new Character(characterData);
    return await character.save();
  } catch (err) {
    throw new Error("Error creating character");
  }
};

// Get a character by ID
exports.getCharacterById = async (characterId) => {
  try {
    return await Character.findById(characterId);
  } catch (err) {
    throw new Error("Error fetching character");
  }
};

// Update a character by ID
exports.updateCharacter = async (characterId, characterData) => {
  try {
    return await Character.findByIdAndUpdate(characterId, characterData, {
      new: true,
    });
  } catch (err) {
    throw new Error("Error updating character");
  }
};

// Delete a character by ID
exports.deleteCharacter = async (characterId) => {
  try {
    return await Character.findByIdAndDelete(characterId);
  } catch (err) {
    throw new Error("Error deleting character");
  }
};
