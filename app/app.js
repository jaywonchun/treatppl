(function(){
	'use strict';

	angular
		.module('shopApp',['ui.router']);

	angular
		.module('shopApp')
		.config(function($stateProvider, $httpProvider,$urlRouterProvider){

			$urlRouterProvider.otherwise('/home/splash');

			$stateProvider
			// Landing Page
			.state('shop',{
				url:'/home',
				templateUrl:'site/partials/shop-main.html',
				controller:'ShopCtrl as ctrl',
				//TODO #3 resolve products before main page load
				/*
				- products must return a meaningful value
				- Program will attempt to retrieve value through HTTP request
				*/
				resolve:{
					products:function(productSrv){
						return productSrv.getProducts();
					}
				}
			})

			// Splash Page
			.state('shop.splash',{
				url:'/splash',
				templateUrl:'site/partials/splash-page.html',
				controller:'SplashCtrl as ctrl',
			})

			// Cookie Page
			.state('shop.cookie',{
				url:'/cookie',
				templateUrl:'site/partials/cookie-page.html',
				controller:'CookieCtrl as ctrl',
				//TODO #3 resolve products before main page load
				/*
				- products must return a meaningful value
				- Program will attempt to retrieve value through HTTP request
				*/
				resolve:{
					products:function(productSrv){
						return productSrv.getProducts();
					}
				}
			})

			// Ice Cream Page
			.state('shop.icecream',{
				url:'/icecream',
				templateUrl:'site/partials/icecream-page.html',
				controller:'IcecreamCtrl as ctrl',
				//TODO #3 resolve products before main page load
				/*
				- products must return a meaningful value
				- Program will attempt to retrieve value through HTTP request
				*/
				resolve:{
					products:function(productSrv){
						return productSrv.getProducts();
					}
				}
			})

			// Cupcake Page
			.state('shop.cupcake',{
				url:'/cupcake',
				templateUrl:'site/partials/cupcake-page.html',
				controller:'CupcakeCtrl as ctrl',
				//TODO #3 resolve products before main page load
				/*
				- products must return a meaningful value
				- Program will attempt to retrieve value through HTTP request
				*/
				resolve:{
					products:function(productSrv){
						return productSrv.getProducts();
					}
				}
			})

			// View All Items
			.state('shop.products',{
				url:'/products',
				templateUrl:'site/partials/products-page.html',
				controller:'ProductsCtrl as ctrl',
				//TODO #3 resolve products before main page load
				/*
				- products must return a meaningful value
				- Program will attempt to retrieve value through HTTP request
				*/
				resolve:{
					products:function(productSrv){
						return productSrv.getProducts();
					}
				}
			})

			.state('admin',{
				url:'/admin',
				templateUrl:'site/partials/admin.html',
				controller:'AdminCtrl as ctrl',
				//TODO #2 Resolve Products before admin page load
				resolve:{
					products:function(productSrv){
						return productSrv.getProducts();
					}
				}
			})

			.state('admin.dash',{
				url:'/dashboard',
				templateUrl:'site/partials/admin-dash.html',
				controller:'AdminCtrl as ctrl',
			})

			.state('admin.add_product',{
				url:'/add_product',
				controller:'ProductCtrl as ctrl',
				templateUrl:'site/partials/admin-add-product.html'
			})

			.state('admin.edit_product',{
				url:'/edit_product/:productId',
				controller:'ProductCtrl as ctrl',
				templateUrl:'site/partials/admin-edit-product.html',
			})

			.state('auth',{
				url:'/auth',
				templateUrl:'site/partials/auth-main.html',
				controller:'AuthCtrl as ctrl',
			});

			$httpProvider.interceptors.push(function(){
		       return {
		           request: function(config) {
		               return config;
		           },
		           response: function(response) {
		               var auth_token = response.headers('authentication');
		               if(localStorage.authToken == undefined && auth_token != null){
		               		localStorage.authToken = auth_token;
		               }
		               return response;
		           }
		       }
		   });
		});
})();
