import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
const TMDB_API_KEY = process.env.TMDB_API_KEY; // Store key in .env

export const fetchFromTMDB = async (url) => {
  const options = {
  
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
    throw error; // Re-throw to let the caller handle it
  }
};

// ye tmdb api ko call kr rha with authentication
