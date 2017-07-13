var Game = {};

Game.Boot = function(){
	
};

Game.Boot.prototype = {
	init:function(){
		this.input.maxPointers = 1;
		
		this.stage.disableVisibilityChange = true;
		
	},
	
	preload:function(){
		
		this.load.image('preloaderBar','assets/preloaderbar.png');
	},
	create:function(){
		this.state.start('Preloader');
	},
};