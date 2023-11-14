// The API

// export const fetchRecipes = async () => {
//     try {
//       const apiKey = 'f2e848f81f85424ab0240a9b15ded9da';
//       const endpoint = 'https://api.spoonacular.com/recipes/random';

//       const response = await fetch(`${endpoint}?apiKey=${apiKey}`);

//       if (!response.ok) {
//         throw new Error('Failed to fetch recipes');
//       }

//       const data = await response.json();
//       return data.recipes;
//     } catch (error) {
//       console.error('Error:', error);
//       throw error; // Rethrow the error for the calling code to handle
//     }
//   };
