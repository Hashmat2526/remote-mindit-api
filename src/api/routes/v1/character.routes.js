// routes/characterRoutes.js
const express = require("express");
const router = express.Router();
const characterController = require("../../controllers/character.controller");

// Get all characters
router.get("/", characterController.getAllCharacters);

// Get a character by ID
router.get("/:id", characterController.getCharacterById);

// Update a character by ID
router.patch("/:id", characterController.updateCharacter);

// Delete a character by ID
router.delete("/:id", characterController.deleteCharacter);

module.exports = router;
