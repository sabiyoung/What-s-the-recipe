/* start-saba */
import { apiService as api } from "../service/api.service.js";

document.getElementById("recipeForm").addEventListener("submit", createRecipe);
function createRecipe(e) {
  e.preventDefault();
  const foodName = document.getElementById("name").value;
  const foodImage = document.getElementById("image").value;
  const foodIngredients = document.getElementById("ingredients").value;
  console.log("form has been submitted");

  api.post("create-recipe", {
      foodName: foodName,
      foodImage: foodImage,
      foodIngredients: foodIngredients
        .split(",")
        .map((ingredient) => ingredient.trim())
        .flat(),
    })
    .then((data) => console.log(data));
}
