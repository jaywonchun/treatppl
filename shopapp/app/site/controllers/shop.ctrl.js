(function(){
	angular
		.module('shopApp')
		.controller('ShopCtrl',ShopCtrl)

	function ShopCtrl($state,$scope,productSrv){
		var shopVm = this;

		//TODO #3 Capture resolved products for view
		shopVm.products;


        shopVm.icecreamPage = icecreamPage;
        shopVm.cookiesPage= cookiesPage;
        shopVm.cupcakePage= cupcakePage;


		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});


		function icecreamPage() {
			alert("Clicked Ice Cream Page");

			//iceCreamVm.loadingAnotherPage = true;
			$state.go('icecream');
		}

		function cookiesPage() {
			alert("Clicked cookie Page");

			//iceCreamVm.loadingAnotherPage = true;
			$state.go('cookies');
		}

		function cupcakePage() {
			alert("Clicked cupcake Page");

			//iceCreamVm.loadingAnotherPage = true;
			$state.go('cupcake');
		}

	}



})();


