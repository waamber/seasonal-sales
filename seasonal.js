var seasonsDiscount = document.getElementById("discounts");
var productsArray = [];

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
		productsArray = productsData;
	}
};

function combineArrays(productsArray, categoriesArray){
	productsArray.forEach(function(product){
		var currentCategoryId = product.category_id;
		categoriesArray.forEach(function(categories){
			if(currentCategoryId === categories.id){
				product["department"] = categories.name;
				product["season"] = categories.season_discount;
				product["discount"] = categories.discount;
				product["discountedPrice"] = product.price - (product.price * categories.discount);
			}
		});
	});
	domString(productsArray);
}

function domString(products){
	console.log(products);
	var productString = "";
	for(var i = 0; i < products.length; i ++){
		if(seasonsDiscount.value == products[i].category_id){
			var finalPrice = products[i].discountedPrice.toFixed(2);
		}else {
			var finalPrice = products[i].price;
		}
		productString += `<div class="productCard">
												<h2>${products[i].name}</h2>
												<h3>${products[i].department}</h3>
												<img src ="${products[i].url}">
												<h4>$${finalPrice}</h4>
											</div>`;
		
	}

	writeToDom(productString);
};

function writeToDom(product){
		var productsContainer = document.getElementById("products-container");
		productsContainer.innerHTML = product; 
};

seasonsDiscount.addEventListener("change", function(event){
	domString(productsArray);

});

//when i take away .value, error goes away, but when choosing season, everything is gone.

