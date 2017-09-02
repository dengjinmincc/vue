new Vue({
	el: "#shopping-cart",
	data: {
		productList: [
			{
				'pro_name': '【斯文】甘油 | 丙三醇', 
				'pro_brand': 'skc', 
				'pro_place': '韩国', 
				'pro_purity': '99.7%', 
				'pro_min': '215千克', //最小起订量
				'pro_depot': '上海仓海仓储', //所在仓库
				'pro_num': 3, 
				'pro_image': 'img/test.jpg', //图片链接
				'pro_price': 800
			}
		]
	}, 
	mounted: function(){
		var _this = this; 
		
		this.productList.map(function(item){
			_this.$set(item, 'select', true); 
		})
	},
	methods: {
		selectProduct: function(_isSelect){
			for(let i = 0; i < this.productList.length; i++){
				this.productList[i].select = !_isSelect; 
			}
		}, 
		deleteProduct: function(){
			this.productList = this.productList.filter(function(item){
				return !item.select; 
			}); 
			return this.productList; 
		}, 
		//删除单条产品
		deleteOneProduct: function(index){
			return this.productList.splice(index, 1); 
		}
	},
	computed: {
		isSelectAll: function(){
			return this.productList.every(function(val){
				return val.select; 
			})
		}, 
		getTotal: function(){
			var _proList = this.productList.filter(function(val){
				return val.select; 
			}), totalPrice = 0; 
			
			for(let i = 0; i < _proList.length; i++){
				totalPrice += _proList[i].pro_num * _proList[i].pro_price; 
			}
			
			return {totalNum: _proList.length, totalPrice: totalPrice}; 
		}
	}
})
