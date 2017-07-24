Game.Preloader = function(game){
	this.preloadBar = null;
};

Game.Preloader.prototype = {
	preload:function(){
		this.preloadBar = this.add.sprite(this.world.centerX,this.world.centerY,'preloaderBar');
		
		this.preloadBar.anchor.setTo(0.5,0.5);
		this.time.advancedTiming = true;
		this.load.setPreloadSprite(this.preloadBar);
		
		//LOAD ALL ASSETS
		
		this.load.tilemap('GroundLayer','assets/platform102_Tile Layer 1.csv');
		
		this.load.tilemap('PlatLayer','assets/platform102_Tile Layer 2.csv');
		
		this.load.tilemap('coinsLayer','assets/platform102_Tile Layer 3.csv');
		

		this.load.image('tileset','assets/tiles.png');
		
		//this.load.image('coins','assets/coinGold.png');
		this.load.spritesheet('player','assets/player_spritesheet.png',28,30,5,1,1);
		
		this.load.spritesheet('buttons','assets/buttons.png',193,71);
		
		this.load.image('snail','assets/snailWalk1.png');
		
		keys = this.input.keyboard.createCursorKeys();
	jumpbutton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	
	create:function(){
		this.state.start('level1');
	},
};