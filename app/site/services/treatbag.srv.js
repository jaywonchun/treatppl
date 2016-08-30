(function() {
	angular
		.module('shopApp')
		.service(TreatBagSrv, Treatbag);

		function Treatbag(){
			var self = this;
			console.log("inside treatbag");
			self.globalArray = [];

		}



})()

(function(){
	angular
		.module('shopApp')
		.controller('CupcakeCtrl',CupcakeCtrl);

	function CupcakeCtrl($scope,productSrv){
		var shopVm = this;

		shopVm.cupcakeArray =[];

		//TODO #3 Capture resolved products for view
		// Get array of products from service and assign it
		shopVm.products = productSrv.products;
	

		shopVm.saveToLocalStorage = saveToLocalStorage;

		

		function saveToLocalStorage(productObject) {
			


			//shopVm.cupcakeArray.push(productObject.name)
			shopVm.cupcakeArray.push(productObject);
			console.log("local storage working", productObject);

			$scope.$watch(function() {
			      return shopVm.cupcakeArray
			    }, function(newValue, oldValue) {
			      console.log("change detected: " , newValue)
			      localStorage.setItem('product', JSON.stringify(newValue));

			       
			    });

		
			
		}


		

	}

})();
