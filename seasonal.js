function domString(products){
	var productString = "";
	for(var i = 0; i < products.length; i ++){
		productString += `<div class="productsCard">
												<h1>${products[i].name}</h1>
												<h3>${products[i].price}</h3>
											</div>`;
	writeToDom(productString);
	}
}; 

function writeToDom(strang){
	var productContainer = document.getElementById("products-container");
	productContainer.innerHTML = strang; 
};

function loadProducts(){
	var productsData = JSON.parse(this.responseText); //responseText gives you a string .parse turns it into JSON array
	domString(productsData.products);
};

function error() {
	console.log("AHHHHH");
};

function loadCategories(){
	var categoriesData = JSON.parse(this.responseText); //responseText gives you a string .parse turns it into JSON array
	domString(categoriesData.categories);
};

var categoryRequest = new XMLHttpRequest();
categoryRequest.addEventListener("load", loadCategories);
categoryRequest.addEventListener("error", error);
categoryRequest.open("GET", "categories.json");
categoryRequest.send();

var productsRequest = new XMLHttpRequest();
productsRequest.addEventListener("load", loadProducts);
productsRequest.addEventListener("error", error);
productsRequest.open("GET", "products.json");
productsRequest.send();