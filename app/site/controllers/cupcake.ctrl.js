(function(){
	angular
		.module('shopApp')
		.controller('CupcakeCtrl',CupcakeCtrl);

	function CupcakeCtrl($scope,productSrv, Notification){
		var shopVm = this;




		//TODO #3 Capture resolved products for view
		// Get array of products from service and assign it
		shopVm.products = productSrv.products;
	

		shopVm.saveToLocalStorage = saveToLocalStorage;
		shopVm.checkForDisable = checkForDisable;
		
		shopVm.success = function(name) {
			        Notification.success({message: "You added " + name + " " +"to the cart"});
			    };

		shopVm.fail = function(name) {
			        Notification.error({message: "Oops! Don't have " + name + " " +"in stock, check back later"});
			    };


		function saveToLocalStorage(productObject) {
			    //console.log("inside cupcake  " , productSrv.getCupcakeCount())

			     var count = 1; 

			var x = productSrv.addToLocalStorage(productObject, count); 
			if(x === true) {
				shopVm.fail(productObject.name);

			}else {
				shopVm.success(productObject.name);

			}

		
		}

		function checkForDisable (product) {
					for(i =0; i < productSrv.cart.length; i++) {
						if(product.name === productSrv.cart[i].name) {
							product.disable = productSrv.cart[i].disable;
							console.log("FALSEproductdisable", product.disable)
							if(product.disable === true) {
								console.log("TRUEproductdisable", product.disable)

								return true
							}else{
								return false
							}
						}
					}		

		}

	}

})();
