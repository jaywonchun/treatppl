angular
    .module('shopApp')
    .controller('ModalInstanceCtrl', function (productSrv, $scope, $uibModalInstance) {



    $scope.itemName = []


    var testlocal = localStorage.getItem('product');

    console.log("testlocal", testlocal)
    var name =  JSON.parse(testlocal);       
        for(x = 0; x< name.length; x ++) {
        $scope.itemName.push({name: name[x].name, price: name[x].price, purchaseQty: name[x].purchaseQty, quantity: name[x].quantity})
        console.log("object is", $scope.itemName )    
        }


    $scope.itemName = removeDuplicates($scope.itemName, "name");


    function removeDuplicates(arr, prop) {
         var new_arr = [];
         var lookup  = {};
     
         for (var i in arr) {
             lookup[arr[i][prop]] = arr[i];
         }
         for (i in lookup) {
             new_arr.push(lookup[i]);
         }
         return new_arr;
     } 


    $scope.loadLocalStorage = function () {
      var local = localStorage.getItem('product');
    }

    $scope.ok = function () {
      $uibModalInstance.close(productSrv.cart);
      localStorage.setItem('product', JSON.stringify(productSrv.cart));
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
      console.log($scope.items)
      $scope.items = [];
      console.log( "new",  $scope.items)
    };

    

    $scope.add = function (index) {

      if ($scope.itemName[index].purchaseQty < $scope.itemName[index].quantity){
        $scope.itemName[index].purchaseQty ++;
        console.log(productSrv.cart);
        console.log($scope.itemName[index])

        for(x = 0; x< productSrv.cart.length; x++) {
          if($scope.itemName[index].name === productSrv.cart[x].name) {

                console.log(productSrv.cart[x]);
               console.log($scope.itemName[index])

                    if($scope.itemName[index].purchaseQty === productSrv.cart[x].quantity){
                      console.log("hello");
                      productSrv.cart[x].disable = true;
                    }else {
                       productSrv.cart[x].disable = false;
                    }
                
                //console.log($scope.itemName[index])
               // console.log(productSrv.cart[x])
                 /* if (productSrv.cart[x].purchaseQty === $scope.itemName[index].purchaseQty) {
                        productSrv.cart[x].disable === true;
                  }*/
                productSrv.cart[x].purchaseQty = $scope.itemName[index].purchaseQty; 

          }
        }

            //localStorage.setItem('product', JSON.stringify(productSrv.cart));

      }
         
    }

    $scope.subtract = function (index) {
      if ($scope.itemName[index].purchaseQty > 1){
        console.log($scope.itemName[index].quantity)
        $scope.itemName[index].purchaseQty --;
        if( $scope.itemName[index].purchaseQty < 1) {
          console.log("STOP")
          return;
        }

        for(x = 0; x< productSrv.cart.length; x++) {
          if($scope.itemName[index].name === productSrv.cart[x].name) {

             if($scope.itemName[index].purchaseQty === productSrv.cart[x].quantity){
                      console.log("hello");
                      productSrv.cart[x].disable = true;
                    }else {
                       productSrv.cart[x].disable = false;
                    }
                

                productSrv.cart[x].purchaseQty = $scope.itemName[index].purchaseQty; 

          }
        }
      }
         
    }

    $scope.removeItem = function(index) {
          $scope.itemName.splice(index, 1);
          productSrv.cart = $scope.itemName;
    }

    $scope.subTotal = function () {
      console.log("trying to log", $scope.itemName.length);
            var subtotal = 0;
          

          for(x= 0 ; x < $scope.itemName.length;  x ++) {
          
          var subtotal = subtotal +  ($scope.itemName[x].price * $scope.itemName[x].purchaseQty);
          console.log(subtotal)


          }
         return subtotal
    }
});

