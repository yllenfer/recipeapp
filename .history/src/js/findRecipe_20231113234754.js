import { fetchRecipes } from './utils.mjs';
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter()
require('dotenv').config();

fetchRecipes();


