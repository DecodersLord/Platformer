//Phaser has Phaser.Game class


var game = new Phaser.Game(800,600,Phaser.AUTO,'myGame');

// GameStates Are for all Scenes/Screens for the game

var GameState = {init: init,preload: preload,create: create,update: update};

function init(){
	//console.log("INIT");
	//TODO bigger world
	this.world.resize(2000,600);
	
	H = this.world.height;
	W = this.world.width;
	
	//TODO defining ARCADE PHYSICS
	this.physics.startSystem(Phaser.Physics.ARCADE);
	this.physics.arcade.gravity.y = 1000;
	
	//TODO add for keyboard input
	keys = this.input.keyboard.createCursorKeys();
	jumpbutton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
	playerHealth = 100;
}

function preload(){
	this.game.load.spritesheet('player','Images/player_spritesheet.png',28,30,5,1,1);
	this.game.load.tilemap('tilemap','assets/platform102.json',null,Phaser.Tilemap.TILED_JSON);
	this.game.load.image('tiles','assets/greenground.png');
}

function create(){
	
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.stage.backgroundColor = "#7ec0ee";
	
	map = this.game.add.tilemap('tilemap');
	map.addTilesetImage('tiles','tiles');
	
	backGroundLayer = map.createLayer('BackgroundLayer');
	groundLayer = map.createLayer('GroundLayer');
	
	map.setCollisionBetween(1, 100, true, 'GroundLayer');
	
	
	player = this.add.sprite(0,0,'player');
	player.scale.setTo(1.5,1.5);
	groundLayer.resizeWorld();
	player.animations.add('walk',[0,1,2,1],6,true);
	player.anchor.setTo(0.5,0.5);
	this.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
	this.game.camera.follow(player);
	
	
}

function update(){
	this.game.physics.arcade.collide(player,groundLayer);
	
	
	/*if(jumpbutton.isDown){
		jump();
	}*/
	
	
	//TODO if cursor keys are placed
	if(keys.left.isDown){
		player.animations.play('walk');
		player.scale.set(1.5,1.5);
		player.body.velocity.x = -100;
	}
	else if(keys.right.isDown){
		player.animations.play('walk');
		player.scale.set(-1.5,1.5);
		player.body.velocity.x = +100;
	}
	else if(keys.up.isDown){
		player.animations.play('walk');
		jump();
	}
	else{
		player.frame = 3;
	}
}

game.state.add('level1',GameState);
game.state.start('level1');