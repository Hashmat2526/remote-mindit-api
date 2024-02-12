// models/User.js
const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    height: String,
    mass: String,
    hair_color: String,
    skin_color: String,
    eye_color: String,
    birth_year: String,
    gender: String,
    homeworld: {},
    imageUrl: String,
    films: [String],
    species: [String],
    vehicles: [String],
    starships: [String],
  },
  { timestamps: true }
);

/**
 * @typedef Character
 */
const CharacterModel = mongoose.model("Character", characterSchema);

module.exports = CharacterModel;
