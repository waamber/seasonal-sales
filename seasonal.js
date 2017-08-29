function loadProducts(){
	var productsData = JSON.parse(this.responseText).products; 
	getCategories(productsData);
};

function error() {
	console.log("AHHHHH");
};

var productsRequest = new XMLHttpRequest;
productsRequest.addEventListener("load", loadProducts);
productsRequest.addEventListener("error", error);
productsRequest.open("GET", "products.json");
productsRequest.send();

function getCategories(productsData){
	var categoryRequest = new XMLHttpRequest;
	categoryRequest.addEventListener("load", loadCategories);
	categoryRequest.addEventListener("error", error);
	categoryRequest.open("GET", "categories.json");
	categoryRequest.send();
	
	function loadCategories(){
		var categoriesData = JSON.parse(this.responseText).categories;
		combineArrays(productsData, categoriesData);
	}
};

function combineArrays(productsArray, categoriesArray){
	productsArray.forEach(function(product){
		var currentCategoryId = product.category_id;
		categoriesArray.forEach(function(categories){
			if(currentCategoryId === categories.id){
				product["department"] = categories.name;
				product["finalPrice"] = product.price - categories.discount;
				product["season"] = categories.season_discount;
			}
		});
	});
	domString(productsArray);
}

function domString(products){
	var productString = "";
	for(var i = 0; i < products.length; i ++){
		productString += `<div class="productCard">
												<h2>${products[i].name}</h2>
												<h3>${products[i].department}</h3>
												<div class= "productImg"><img src ="${products[i].url}"></div>
												<h4>${products[i].finalPrice}</h4>
									</div>`;
	}
	writeToDom(productString);
};

function writeToDom(product){
		var productsContainer = document.getElementById("products-container");
		productsContainer.innerHTML = product; 
};

function selectedSeason(){
	var selection = document.getElementById("discounts").selectedIndex;
		if(selection === product.season){
			console.log(selection);
		}
};

selectedSeason();



