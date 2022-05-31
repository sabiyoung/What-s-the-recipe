/* Start-Saba */
import { apiService as api } from "../service/api.service.js";
api.get("recipes").then((recipes) => {
  recipes.data.forEach((recipe) => {
    const li = document.createElement("li");
    li.innerHTML = `
     <img src=${recipe.foodImage} />
	 <h3> ${recipe.foodName} </h3>
	
      `;
    const modal = document.createElement("div");
    modal.innerHTML = `<div class="modal-content ">
	  <i class="fas fa-times"></i>
	  <h3>${recipe.foodName}</h3>
	  <p>${recipe.foodIngredients}</p>
	  <div class="prep">Prep : 15mins</div>
	  <div  class="prep">Cook : 7mins</div>
	  </div>`;
    modal.classList.add("modal-ingeredients", "hide");
    const b = document.createElement("Button");
    b.innerHTML = '<button class="recipe-button">Recipe</button>';
    li.appendChild(b);
    b.appendChild(modal);
    document.body.querySelector("#product").appendChild(li);
    b.addEventListener("click", () => {
      //  window.location.href= `/edit-recipe.html`;
      modal.classList.remove("hide");
    });

    modal.addEventListener("click", (event) => {
      event.stopPropagation();
      modal.classList.add("hide");
    });
  });
});

/* end-Saba*/