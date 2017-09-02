new Vue({
	el: "#app", 
	data: {
		addText: '', 
		proList: [
			{name: 'HTML5', status: false}, 
			{name: 'CSS3', status: false}, 
			{name: 'JavaScript', status: false}, 
			{name: 'Vue', status: false}
		], 
		newList: [], 
		curId: '', 
		beforeEditText: '', 
		curType: 0
	}, 
	mounted: function(){
		this.newList = this.proList; 
	},
	methods: {
		addList: function(){
			this.proList.push(
				{name: this.addText, status: false}
			); 
			
			this.addText = ''; 
		}, 
		chooseList: function(type){
			switch(type){
				case 1: 
					this.newList = this.proList; 
					break;
				case 2: 
					this.newList = this.proList.filter(function(item){
						return item.status; 
					}); 
					break; 
				case 3:
					this.newList = this.proList.filter(function(item){
						return !item.status; 
					})
			}
		}, 
		deleteList: function(index){
			this.proList.splice(index, 1); 
			
			this.newList = this.proList; 
		}, 
		editBefore: function(name){
			this.beforeEditText = name; 
		}, 
		edited: function(){
			this.curId = ''; 
		}, 
		cancelEdit: function(val){
			val.name = this.beforeEditText; 
			this.curId = ''; 
		}
	}, 
	computed: {
		notend: function(){
			return this.proList.filter(function(item){
				return !item.status; 
			}).length; 
		}
	}
})
