(function(){
	angular
		.module('shopApp')
		.controller('ProductsCtrl',ProductsCtrl)

	function ProductsCtrl($scope, productSrv){
	var productsVm = this;

		//TODO #3 Capture resolved products for view
		// Get array of products from service and assign it
		productsVm.products = productSrv.products;


		// Function to retrieve all the products using the products service
		productsVm.getAllProducts = getAllProducts;
		function getAllProducts(){
				// Get array and store it in local variable
				var allProducts = productSrv.products;
				console.log("allProducts",allProducts);
		};

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    productsVm.products  = productSrv.products;
		});
	}

})();
