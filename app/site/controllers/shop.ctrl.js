(function(){
	angular
		.module('shopApp')
		.controller('ShopCtrl',ShopCtrl)

	function ShopCtrl($scope,productSrv,$uibModal){
	var productsVm = this;

		productsVm.items = ['item1', 'item2', 'item3'];

		  productsVm.animationsEnabled = true;

		  productsVm.open = open;

		  productsVm.open = function (size) {
		  	console.log('open');

		    var modalInstance = $uibModal.open({
		      animation: productsVm.animationsEnabled,
		      templateUrl: 'site/controllers/modal.html',
		      controller: 'ModalInstanceCtrl',
		      size: size,
		      resolve: {
		        items: function() {
		          return productsVm.items;
		        }
		      }
		    });
		}

		  productsVm.toggleAnimation = function () {
		    productsVm.animationsEnabled = !productsVm.animationsEnabled;
		};


	}

})();


