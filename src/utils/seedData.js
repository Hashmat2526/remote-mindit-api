const axios = require("axios");
const {
  createCharacter,
  getAllCharacters,
} = require("../api/services/character.services");

const generateRandomImageUrl = () => {
  const width = 200; // Adjust the width of the image as needed
  const height = 200; // Adjust the height of the image as needed
  const randomNumber = Math.floor(Math.random() * 1000); // Get a random number between 0 and 999
  return `https://picsum.photos/${width}/${height}?random=${randomNumber}`;
};

const seedCharacters = async () => {
  try {
    // Check if characters already exist in the database
    const existingCharacters = await getAllCharacters();

    // If characters already exist in the database, return
    if (existingCharacters.length > 0) {
      console.log("Characters already exist in the database.");
      return;
    }

    let nextUrl = "https://swapi.dev/api/people/";

    while (nextUrl) {
      // Fetch characters from SWAPI
      const response = await axios.get(nextUrl);
      const characters = response.data.results;

      // If characters don't exist in the database, add them
      for (const character of characters) {
        const homeworldUrl = character?.homeworld;

        const homeworld = await axios.get(homeworldUrl);

        const newCharacter = {
          name: character?.name,
          height: character?.height,
          mass: character?.mass,
          hair_color: character?.hair_color,
          skin_color: character?.skin_color,
          eye_color: character?.eye_color,
          birth_year: character?.birth_year,
          gender: character?.gender,
          homeworld: homeworld?.data,
          films: character?.films,
          species: character?.species,
          vehicles: character?.vehicles,
          starships: character?.starships,
          imageUrl: generateRandomImageUrl(),
        };

        // Create character in the database
        await createCharacter(newCharacter);
      }

      nextUrl = response.data.next;
    }

    console.log("Characters added successfully.");
  } catch (err) {
    console.error("Error in seeding data", err);
  }
};

module.exports = { seedCharacters };
