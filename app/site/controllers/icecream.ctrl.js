(function(){
	angular
		.module('shopApp')
		.controller('IcecreamCtrl',IcecreamCtrl);

	function IcecreamCtrl(productSrv, $scope, Notification){
		var icecreamVm = this;

	


		icecreamVm.products = productSrv.products;


		icecreamVm.saveToLocalStorage = saveToLocalStorage;
		icecreamVm.checkForDisable = checkForDisable;

		icecreamVm.success = function(name) {
			        Notification.success({message: "You added " + name + " " +"to the cart"});
			    };

		icecreamVm.fail = function(name) {
			        Notification.error({message: "Oops! Don't have " + name + " " +"in stock, check back later"});
			    };

		

		function saveToLocalStorage(productObject) {
			var count = 1; 
			    //console.log("inside cupcake  " , productSrv.getCupcakeCount())
			var x = productSrv.addToLocalStorage(productObject, count); 
			if(x === true) {
				icecreamVm.fail(productObject.name);

			}else {
				icecreamVm.success(productObject.name);

			}
		
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
