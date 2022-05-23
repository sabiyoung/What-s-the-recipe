/* Start-Tsion */
// let preveiwContainer = document.querySelector(".products-preview");
// let previewBox = preveiwContainer.querySelectorAll(".preview");

// document.querySelectorAll(".products-container .product").forEach((product) => {
// 	product.onclick = () => {
// 		preveiwContainer.style.display = "flex";
// 		let name = product.getAttribute("data-name");
// 		previewBox.forEach((preview) => {
// 			let target = preview.getAttribute("data-target");
// 			if (name == target) {
// 				preview.classList.add("active");
// 			}
// 		});
// 	};
// });

// previewBox.forEach((close) => {
// 	close.querySelector(".fa-times").onclick = () => {
// 		close.classList.remove("active");
// 		preveiwContainer.style.display = "none";
// 	};
// });
/* end-Tsion */
import { apiService as api } from "../service/api.service.js";
api.get('recipe').then(recipes => {
	recipes.data.forEach(recipe => {
		const li = document.createElement('li');
		li.innerHTML = `
     <img src=${recipe.foodImage} />
	 <h3> ${recipe.foodName} </h3>
		`;
		document.body.querySelector('#product').appendChild(li)
});
})