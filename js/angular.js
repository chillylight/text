var app = angular.module('myApp', [],function($provide){
	$provide.provider('CustomService',function(){
		this.$get = function(){
			return {
				message:"CustomService Message"
			}
		}
	});
});

app.controller('cartcontroller', function($scope,CustomService) {
	console.log(CustomService);

    $scope.cart = [
		{
			id:101,
			name:'iphone6',
			price:5224,
			quantity:5,		
		},
		{
			id:102,
			name:'iphone7',
			price:5240,
			quantity:15,		
		},
		{
			id:103,
			name:'iphone8',
			price:5420,
			quantity:2,		
		},
		{
			id:104,
			name:'iphone9',
			price:7220,
			quantity:25	
		}
	];

	$scope.tolalPrice = function(){
		var total = 0;
		angular.forEach($scope.cart,function(item){
		total += item.price*item.quantity;
		})

		return total;
	}

	$scope.tolalQuantity = function(){
		total = 0;
		angular.forEach($scope.cart,function(item){
		total += parseInt(item.quantity);
		})
		return total;
	}	

	$scope.remove = function(id){
		var index = -1;
		angular.forEach($scope.cart,function(item,key){
			if (item.id === id) {
				index = key;
			}		
		})
		if (index !== -1) {
			$scope.cart.splice(index,1);
		}
	}

	var findIndex = function(id){
		var index = -1;
		angular.forEach($scope.cart,function(item,key){
			if (item.id === id) {
				index = key;
				return;
			}
		});
		return index;
	}
	/* 增加购买数量 */
	$scope.add = function(id){
		var index = findIndex(id);
		if (index!==-1) {
			++$scope.cart[index].quantity;
		}
	}

	/* 减少购买数量 */
	$scope.reduce = function(id){
		var index = findIndex(id);
		if (index!==-1) {
			if ($scope.cart[index].quantity>1) {
				--$scope.cart[index].quantity;
			}else{
				var returnKey = confirm("从购物车删除");
				if (returnKey) {
					$scope.remove(id);
				}
			}
		}
	}

	$scope.$watch('cart',function(newValue,oldValue){
		angular.forEach(newValue,function(item,key){
			if (item.quantity<1) {
				var returnKey = confirm("是否从购物车删除");
				if (returnKey) {
					$scope.remove(item.id);
				}else{
					item.quantity = oldValue[key].quantity;
				}
			}
			if(item.quantity>30){
				var tishi = alert("已经达到最大购买量");
				item.quantity = 30;
			}
		})
	},true)

	$scope.date = new Date();

	setInterval(function(){
		$scope.$apply(function(){
			$scope.date = new Date();
		},1000)
	})
})