// main.js

// Function to fetch recipes
const fetchRecipes = async () => {
    const apiKey = window.API_KEY;

    if (!apiKey) {
        console.error("API key is undefined. Check your setup.");
        return;
    }

    const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("API Response:", data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Call the fetchRecipes function
fetchRecipes();
