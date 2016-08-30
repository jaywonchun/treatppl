(function(){
	angular
		.module('shopApp')
		.controller('CookieCtrl',CookieCtrl);

	function CookieCtrl($scope,productSrv, Notification){
		var cookieVm = this;
		console.log('cookiectrl')

		cookieVm.count = 0; 

		//TODO #3 Capture resolved products for view
		// Get array of products from service and assign it
		cookieVm.products = productSrv.products;

		cookieVm.saveToLocalStorage = saveToLocalStorage;
		cookieVm.checkForDisable = checkForDisable;

		cookieVm.success = function(name) {
			        Notification.success({message: "You added " + name + " " +"to the cart"});
			    };

		cookieVm.fail = function(name) {
			        Notification.error({message: "Oops! Don't have " + name + " " +"in stock, check back later"});
			    };

	
		function saveToLocalStorage(productObject) {
			   // productObject.purchaseQty = productSrv.getCupcakeCount(productObject);
			    //console.log("inside cupcake  " , productSrv.getCupcakeCount())
			    var count = 1; 
			    console.log("  object", productObject);
			   /* if (productSrv.disableButton(productObject) == true){
			    	console.log('Cant add any more');
			    	return
			    }*/

				  //productSrv.addToLocalStorage(productObject, count);
			    
			var x = productSrv.addToLocalStorage(productObject, count); 
			if(x === true) {
				cookieVm.fail(productObject.name);

			}else {
				cookieVm.success(productObject.name);

			}

				//needs to decrease quantity in srv.products and increase quantity srv.cart 
		
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



		//	return productSrv.disableButton(product);
			
			
		}

			//console.log(cookieVm.count, index);
			
			/*var addCount = 1

			productSrv.disableButton(disableObj, index );*/
		
	}

})();


/*
              for(x=0; x < self.cart.length; x++) {
            	if(self.cart[x].name === product.name){
            		//it means that the product is already in the cart 
            		//and has the key of purcahse quantity
            		//increment quantity 
            		
            		increment = increment +1;
            		console.log(increment);
            	    product.purchaseQty = increment;

            		console.log("updated product", product)

            	}else {
            		//if no match, it means that the purcahseQty key does not exist
            		//assign it 
            


            	}*/