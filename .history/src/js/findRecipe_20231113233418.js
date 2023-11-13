import { fetchRecipes } from './utils.mjs';
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter()
export const fetchRecipes = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&tags=vegetarian,dessert`;


    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

// index.js (or your entry file)

require('dotenv').config();

// Rest of your code

fetchRecipes();
