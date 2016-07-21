(function(){
	angular
		.module('shopApp')
		.controller('CookieCtrl',CookieCtrl);

	function CookieCtrl($scope,productSrv){
		var shopVm = this;
		console.log('cookiectrl')

		//TODO #3 Capture resolved products for view
		// Get array of products from service and assign it
		shopVm.products = productSrv.products;


		// Function to retrieve all the products using the products service
		shopVm.getAllProducts = getAllProducts;
		function getAllProducts(){
				// Get array and store it in local variable
				var allProducts = productSrv.products;
				console.log("allProducts",allProducts);
		};

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});
	}

})();
