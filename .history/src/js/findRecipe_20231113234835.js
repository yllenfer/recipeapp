import { fetchRecipes } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
require("dotenv").config();
loadHeaderFooter();

require("dotenv").config();
fetchRecipes();
