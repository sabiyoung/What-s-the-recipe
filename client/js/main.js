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
document.querySelectorAll(".products-container .product").forEach((product) => {
	product.onclick = () => {
		preveiwContainer.style.display = "flex";
		let name = product.getAttribute("data-name");
		previewBox.forEach((preview) => {
			let target = preview.getAttribute("data-target");
			if (name == target) {
				preview.classList.add("active");
			}
		});
	};
});
previewBox.forEach((close) => {
	close.querySelector(".fa-times").onclick = () => {
		close.classList.remove("active");
		preveiwContainer.style.display = "none";
	};
});
/* end-Tsion */
//  start Tsion sign up js
function val() {
	let name = document.getElementById("name").value;
	let LastName = document.getElementById("LastName").value;
	let email = document.getElementById("email").value;
	let pwd = document.getElementById("pwd").value;
	let cpwd = document.getElementById("cpwd").value;
	let error = document.getElementById("error_message");
	let text;
	error.style.padding = "10px";
    //  Regular expression(Rgx)
	let pwd_expression =
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
	// let letters = /^[A-Za-z]+$/;
	let filter =
		/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if (name.length == "") {
		text = "Please enter the name";
		error.innerHTML = text;
		return false;
	}
	if (LastName.length == "") {
		text = "Please enter the Last name ";
		error.innerHTML = text;
		return false;
	}
	if (email == "") {
		text = "Please enter your user email id";
		error_message.innerHTML = text;
		return false;
	}
	if (!filter.test(email)) {
		text = "Your email is invalid.";
		error_message.innerHTML = text;
		return false;
	}
	if (!pwd_expression.test(pwd)) {
		text =
			"Upper case, Lower case, Special character and Numeric letter are required in Password filed";
		error.innerHTML = text;
		return false;
	}
	if (pwd != cpwd) {
		text = "Password does not match";
		error.innerHTML = text;
		return false;
	}
	let frm = document.getElementById("myform");
	frm.style.display = "none";
	let hid = document.getElementById("hid");
	hid.style.display = "none";
	let disp = document.getElementById("success");
	disp.style.display = "block";
	error.style.padding = "0px";
	return false;
}

//  End Tsion sign up js
