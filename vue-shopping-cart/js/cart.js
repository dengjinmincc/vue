var vm = new Vue({
	el: '#app', 
	data: {
		productList: [], 
		totalPrice: 0, 
		delFlag: false, 
		checkAllFlag: false, 
		curProduct: ''
	}, 
	filters: {
		
	}, 
	mounted: function(){
		this.createView(); 
	}, 
	methods: {
		createView: function(){
			var _this = this; 
			
			this.$http.get('data/cartData.json').then(function(res){
				//console.log(res.data.result.list);
				_this.productList = res.data.result.list;
			})
		}, 
		changeMoney: function(product, way){
			if(way > 0){
				product.productQuantity++; 
			}else{
				product.productQuantity--; 
				if(product.productQuantity < 1){
					product.productQuantity = 1; 
				}
			}; 
			this.calcTotalPrice(); 
		}, 
		selectedProduct: function(item){
			if(typeof item.checked == 'undefined'){
				this.$set(item, 'checked', true);
			}else{
				item.checked = !item.checked; 
			}
			this.calcTotalPrice(); 
		}, 
		calcTotalPrice: function(){
			var _this = this; 
			this.totalPrice = 0; 
			this.productList.forEach(function(item, index){
				if(item.checked){
					_this.totalPrice += item.productPrice * item.productQuantity; 
				}
			}); 
		}, 
		checkAll: function(flag){
			var _this = this; 
			this.checkAllFlag = flag; 
			this.productList.forEach(function(item, index){
				if(item.checked == "undefined"){
					_this.$set(item, 'checked', flag); 
				}else{
					item.checked = _this.checkAllFlag; 
				}
			})
			this.calcTotalPrice(); 
		}, 
		deleteConfirm: function(item){
			this.delFlag = true; 
			this.curProduct = item; 
		}, 
		deleteProduct: function(){
			var index = this.productList.indexOf(this.curProduct); 
			this.productList.splice(index, 1); 
			this.delFlag = false; 
		}, 
		cancelDelete: function(){
			this.delFlag = false; 
		}
	}
}); 
