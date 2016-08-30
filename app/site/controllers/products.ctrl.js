(function(){
	angular
		.module('shopApp')
		.controller('ProductsCtrl',ProductsCtrl)

	function ProductsCtrl($scope, $window, productSrv, Notification){
		var productsVm = this;


		//TODO #3 Capture resolved products for view
		// Get array of products from service and assign it
		productsVm.products = productSrv.products;
		productsVm.checkForDisable = checkForDisable;

		// Function to retrieve all the products using the products service
		productsVm.saveToLocalStorage = saveToLocalStorage;

		productsVm.success = function(name) {
			        Notification.success({message: "You added " + name + " " +"to the cart"});
			    };

		productsVm.fail = function(name) {
			        Notification.error({message: "Oops! Don't have " + name + " " +"in stock, check back later"});
			    };


		function saveToLocalStorage(productObject) {

			var x = productSrv.addToLocalStorage(productObject); 
			if(x === true) {
				productsVm.fail(productObject.name);

			}else {
				productsVm.success(productObject.name);

			}


	
		console.log(productObject);


		}

		function checkForDisable (product) {
			for(i =0; i < productSrv.cart.length; i++) {
				if(product.name === productSrv.cart[i].name) {
					product.disable = productSrv.cart[i].disable;
					if(product.disable === true) {
						return true
					}else{
						return false
					}
				}
			}
		}
		  	
	}

})();
