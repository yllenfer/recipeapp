// The API

export const fetchRecipes = async () => {
    try {
      const apiKey = 'YOUR_SPOONACULAR_API_KEY';
      const endpoint = 'https://api.spoonacular.com/recipes/random';
  
      const response = await fetch(`${endpoint}?apiKey=${apiKey}`);
  
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
  
      const data = await response.json();
      return data.recipes;
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error for the calling code to handle
    }
  };
  