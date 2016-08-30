(function(){

	angular
	.module('shopApp')
	.controller('ProductCtrl',ProductCtrl);

	function ProductCtrl($stateParams,api,productSrv){
		var productVm = this;


		productVm.categories = [
			{label:'Ice cream',value:'icecream'},
			{label:'Cookies',value:'cookies'},
			{label:'Cupcakes',value:'cupcakes'},
			
		];

		productVm.product = {};

		console.log( productVm.product)

		productVm.product_update_btn = 'Update Product';
		productVm.product_delete_btn = 'Remove Product';
		
		if($stateParams.productId != undefined){
			console.log("logging")
			productSrv.getProduct($stateParams.productId)
			.then(function(res){
				console.log(res);

				// Get Object and store
				productVm.product = res.data.product;

				// Get fields in object
				productVm.name = productVm.product.name;
				productVm.description = productVm.product.description;
				productVm.image= productVm.product.image;
				productVm.category = productVm.product.category;
				productVm.price = productVm.product.price;
				productVm.quantity = productVm.product.quantity;


	
				//TODO #2 set category based on edit form based on 
				//product category
				
				for(var index in productVm.categories) {
					if(productVm.product.category == productVm.categories[index].value){
						productVm.set_category = productVm.categories[index].value;
					}
				}
				
			})
		}






		//public functions
		productVm.addProduct = addProduct;
		productVm.updateProduct = updateProduct;
		productVm.deleteProduct = deleteProduct;

		function addProduct(){
			//TODO #2
			//create product object, pass to product service
			//Update text in button

		productVm.product = {
			"name": productVm.name,
			"image": productVm.image,
			"description": productVm.description,
			"category": productVm.category,
			"price": productVm.price,
			"quantity": productVm.quantity
			
		};

		var add = productSrv.addProduct(productVm.product);
	
		
			
			
		}

		function updateProduct(){
			//TODO #2
			//create product object, pass to product service
			//Update text in button
			console.log("name is"+ productVm.product.name)
			var id = productVm.product.id;
			
			productVm.product = {
			"name": productVm.name,
			"image": productVm.image,
			"description": productVm.description,
			"category": productVm.category,
			"price": productVm.price,
			"quantity": productVm.quantity
			};
		
		productSrv.updateProduct(productVm.product, id);


		}

		function deleteProduct(){
			//TODO #2
			//remove product, pass to product service
			//update text in button
			var id = productVm.product.id;
			console.log("id is"  +id);

			productSrv.deleteProduct(id);
		


		}
	}

})();




