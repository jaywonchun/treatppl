(function(){
	'use strict';

	angular
		.module('shopApp')
		.controller('AdminCtrl',AdminCtrl);

	function AdminCtrl($scope,$state,productSrv){
		var adminVm = this;
		adminVm.productSrv = productSrv;


		//adminVm.addSweets = addSweets;

		//check if logged in
	if(localStorage.authToken == undefined || localStorage.authToken == null){
			$state.go('auth');
		}
					
		adminVm.products = adminVm.productSrv.products
		console.log(adminVm.products);


		if(adminVm.products.length > 0 ){
			adminVm.is_products = true;
		}

		//watch for updates to products object
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
			if(productSrv.products.length > 0){
			    adminVm.products = productSrv.products;
			    adminVm.is_products = true;
			}
		});

		//public functions
		adminVm.editProduct = editProduct;
		adminVm.logout = logout;

		function editProduct(product){
			console.log("Logging from editProduct");
			$state.go('admin.edit_product',{productId:product.id});
		}

		function logout(){
			localStorage.removeItem('authToken');
			$state.go('auth');
		}

	/*	function addSweets(sweet) {
			var treat = productSrv.addProduct(sweet);

		}
*/
		//make function to go to next page

	}
})();


