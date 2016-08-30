(function(){

	angular
		.module('shopApp')
		.service('productSrv',ProductService);

	function ProductService($state,api){
		var self = this;
		//public variables
		self.products = [];
		self.cart = [];
	
	
		//public functions
		self.getProduct = getProduct;
		self.getProducts = getProducts;
		self.addProduct = addProduct;
		self.updateProduct = updateProduct;
		self.updateProductList = updateProductList;
		self.removeProduct = removeProduct;
		self.deleteProduct = deleteProduct;
		self.addToLocalStorage= addToLocalStorage;
		self.removeFromCart = removeFromCart;
		//self.disableButton = disableButton; 

		function getProducts(){
			return api.request('/products',{},'GET')
			.then(function(res){
				//success callback
				console.log(res);
				self.products = res.data.products;
				return res.data.products;
			},function(res){
				//error callback
				console.log(res);
				return;
			})
		}
//give in an object 
		function addProduct(product){
			api.request('/products',product,'POST')
			.then(function(res){
				console.log(res);
				if(res.status === 200){
					//product was added successfully
					self.products.push(res.data.product);
					$state.go('admin.dash');
				}
			})
		}

		function updateProduct(product,productId){
			console.log('TRYING TO UPDATE');
			console.log(product);
			console.log(productId);
			api.request('/products/'+productId,product,'PUT')
			.then(function(res){
				console.log(res);
				if(res.status === 200){
					//product was updated successfully
					self.updateProductList(product,productId);
					
				}
			})
		}

		function deleteProduct(productId){
			api.request('/products/'+productId,{},'DEL')
			.then(function(res){
				console.log(res);
				if(res.status === 200){
					//product was deleted successfully
					self.removeProduct(productId);
					return self.getProducts()
					/*important*/
					
				}
			})
			.then(function(data) {
						$state.go('admin.dash');
					}
					);
		}

		function getProduct(productId){
			return api.request('/products/'+productId,{},'GET');
		}

		function updateProductList(product,productId){
			for(var i=0;i < self.products.length;i++){
				if(self.products[i].id == productId){
					self.products[i].name = product.name;
					self.products[i].image = product.image;
					self.products[i].description = product.description;
					self.products[i].category = product.category;
					self.products[i].price = product.price;
					self.products[i].quantity = product.quantity;
				}
			}
			console.log(self.products);
		}

		function removeProduct(productId){
			for(var i=0;i < self.products.length;i++){
				if(self.products[i].id == productId){
					delete self.products[i];
				}
			}
		}


		function addToCart(){
			self.cart.push(productId);
		}

		function removeFromCart(productId){
			console.log(self.cart)
			self.cart.splice(productId);
			console.log(self.cart); 
		}

		function addToLocalStorage(product, count) {

  			if (self.cart.length === 0) {
        		product.purchaseQty = 1;
        		
        		
        		if(product.purchaseQty >= product.quantity){
        			product.disable = true; 
        			return product.disable ;
        		}

        		product.disable = false;
        		self.cart.push(product);

  			} else {
  				var duplicateExist = false;
	            for (var i = 0; i < self.cart.length; i++) {
	            	if(self.cart[i].name === product.name){
	            		
	            		
					//////// THE OBJECT CANT FIND PURCHASE QUANtity when REFRESHED OR CHANGED TABS
				        /*if(product.purchaseQty === product.quantity){return}*/
							
						if(self.cart[i].purchaseQty >= product.quantity){
										
							self.cart[i].disable = true;
							 console.log("LLL")
			        		return self.cart[i].disable;
			        	}

				        self.cart[i].purchaseQty += 1;
				        duplicateExist = true;

	            	}
	            }	
	            //clicked different item
	            if (!duplicateExist) {
	            	product.purchaseQty = 1;
			
					if(product.purchaseQty >= product.quantity){
        				return;
        			}

        			product.disable = false;
            		self.cart.push(product);
	            }
	            
  			}

			localStorage.setItem('product', JSON.stringify(self.cart));

		}

	}
})();