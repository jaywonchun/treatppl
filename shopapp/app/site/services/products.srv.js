(function(){

	angular
		.module('shopApp')
		.service('productSrv',ProductService);

	function ProductService($state,api){
		var self = this;
		//public variables
		self.products = [
			{
				productId:'001',
				name:'SHADOW BOMBER',
				image: 'img-hat.png',
				description:'Heavy water resistant nylon material with YKK golden double zipper feature. Lined with our traditional Damascus Folded Steel pattern. Featured all 3D embroideries on the chest, sleeves and the back.',
				category:'All',
				price:'104.99',
				quantity:'7',
				status:'active',
				image:'../../assets/img/kin/Koaches-Jacket.jpg'
			},
			{
				productId:'002',
				name:'"KIN" KOACHES JACKET (BLACK)',
				description:'LIGHTWEIGHT, WATER RESISTANT, CLASSIC KOACHES JACKET. FEATURES GRAPHIC PRINTS ON CHEST, HOOD, SLEEVE & BACK.',
				category:'All',
				price:'64.99',
				quantity:'6',
				status:'active',
				image:'../../assets/img/kin/Shadow-Bomber.jpg'
			}
		];

		//public functions
		self.getProduct = getProduct;
		self.getProducts = getProducts;
		self.addProduct = addProduct;
		self.updateProduct = updateProduct;
		self.updateProductList = updateProductList;
		self.removeProduct = removeProduct;
		self.deleteProduct = deleteProduct;

		/* Function that gets all the products - used in resolve(app.js)*/
		function getProducts(){
			return api.request('/products',{},'GET')
			.then(function(res){
			//success callback
				console.log("Success",res);
			// In the products array put all the data found inside the response.data.products(database)
			//self.products = res.data.products;
				console.log("self.products",self.products);
			// Return array filled with data back to the user
				return res.data.products;
				return self.products;

			},function(res){
			//error callback - Console log the error
				console.log("Error",res);
				return;
			})
		}

		/*Function thar adds a product to the database*/
		function addProduct(product){
			api.request('/products',product,'POST')
			.then(function(res){
				console.log(res);
				if(res.status === 200){
				//product was added successfully
					self.products.push(res.data.product);
				//state.go('admin.dash');
				}
			})
		}

		function updateProduct(product,productId){
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
					state.go('admin.dash');

				}
			})
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
		}

		function removeProduct(productId){
			for(var i=0;i < self.products.length;i++){
				if(self.products[i].id == productId){
					delete self.products[i];
				}
			}
		}
	}
})();
