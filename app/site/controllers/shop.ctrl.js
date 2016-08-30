(function(){
	angular
		.module('shopApp')
		.controller('ShopCtrl',ShopCtrl)

	function ShopCtrl($scope,productSrv,$uibModal){
	var productsVm = this;

	productsVm.onClick = onClick;
	productsVm.signin = signin;
	productsVm.items =[]
	productsVm.animationsEnabled = true;
	productsVm.open = open;

	productsVm.open = function (size) {
			  	
	    var modalInstance = $uibModal.open({
	      animation: productsVm.animationsEnabled,
	      templateUrl: 'site/partials/modal.html',
	      controller: 'ModalInstanceCtrl as ctrl',
    });


	modalInstance.result()

 	}

	productsVm.toggleAnimation = function () {
		productsVm.animationsEnabled = !productsVm.animationsEnabled;
	};


	function onClick() {
		var testlocal = localStorage.getItem('product');
		var listLength =  JSON.parse(testlocal);
		if(listLength == null) {
			return 0
		}else {
			var quantitySum = 0;
			for(i = 0; i < listLength.length; i++){
				quantitySum += listLength[i].purchaseQty
			}
		   return quantitySum

		}

	}

	function signin () {
		console.log("clicked to sign in");
	}

}

})();


