EnemySnail = function(index,game,x,y){
	this.snail = game.add.sprite(x,y,'snail');
	this.snail.anchor.setTo(0.5,0.5);
	this.snail.name = index.toString();
	game.physics.arcade.enable(this.snail);
	this.snail.body.immovable = true;
	this.snail.body.collideWorldBounds = true;
	this.snail.body.allowGravity = false;
	
	
	this.snailTween = game.add.tween(this.snail).to({
		x: this.snail.x + 50
	},2000,'Linear',true,0,100,true);
	
};
var coinscollector ={
	coinsadd:function(obj1,obj2){
		mapc.putTile(-1,Groundlayer.getTileX(player.x),Groundlayer.getTileY(player.y));
		if(!obj1.hasTriggered || !obj2.hasTriggered){
			obj1.hasTriggered = obj2.hasTriggered = true;
			
			coinscount++;
		}		
	}
}

Game.level1 = function(game){};

var mapg;
var mapp;
var mapc;

var Groundlayer;
var platformLayer;
var coinsLayer;

var player;
var controls=[];
var playerSpeed = 100;
var jumpTimer = 0;
var button;
var called = false;

Game.level1.prototype = {
	create:function(game){
		coinscount=0;

		
		button = this.add.button(600,this.world.Y,'buttons',function(){
			console.log('pressed');
		},this,2,1,0);
		button.fixedToCamera = true;
		this.stage.backgroundColor = '#3A5963';	
		
		this.physics.arcade.gravity.y = 1400;
		mapg = this.add.tilemap('GroundLayer',64,64);
		mapp = this.add.tilemap('PlatLayer',64,64);
		mapc = this.add.tilemap('coinsLayer',64,64);
		
		mapg.addTilesetImage('tileset');
		mapp.addTilesetImage('tileset');
		mapc.addTilesetImage('tileset');
		
		Groundlayer = mapg.createLayer(0);
		platformLayer = mapp.createLayer(0);
		coinsLayer = mapc.createLayer(0);
		
		Groundlayer.resizeWorld();
		//paltformLayer.resizeWorld();
		mapg.setCollisionBetween(0,4);
		mapp.setCollisionBetween(0,4);
		//mapc.setCollisionBetween(0,6);
			
		mapg.setTileIndexCallback(5,this.gameover,this);
		mapp.setTileIndexCallback(5,this.gameover,this);
		
		this.game.physics.arcade.enable(coinsLayer);
		mapc.setTileIndexCallback(6,coinscollector.coinsadd,this);
		
		
		
		player = this.add.sprite(100,250,'player');
		player.scale.setTo(1.5,1.5);
		player.anchor.setTo(0.5,0.5);
		player.animations.add('walk',[0,1,2,1],6,true);
		this.physics.arcade.enable(player);
		this.camera.follow(player);
		player.body.collideWorldBounds = true;

		
		textBox = this.add.text(20,20,"COINS: "+coinscount);
	textBox.fixedToCamera = true;
		
		snail1 = new EnemySnail(0,game,400,this.world.height - 142);
		
		
				
	},
	
	update:function(){
		
		player.body.velocity.x = 0;
		if(player.body.onFloor()){
			this.state.start('Boot');
			alert("GAME OVER");
		}
		
		this.physics.arcade.collide(player,Groundlayer);
		this.physics.arcade.collide(player,platformLayer);
		
		this.physics.arcade.collide(player,coinsLayer,this.coinsadd,null,this);
		
		if(jumpbutton.isDown && jumpTimer < 2){
			jumpTimer = jumpTimer + 1;
				player.animations.play('walk');
				player.body.velocity.y = -600;
				
		}
	
	
		//TODO if cursor keys are placed
		if(keys.left.isDown){
			player.animations.play('walk');
			player.scale.set(1.5,1.5);
			player.body.velocity.x = -300;
		}
		else if(keys.right.isDown){
			player.animations.play('walk');
			player.scale.set(-1.5,1.5);
			player.body.velocity.x = +300;
		}
		else if(keys.up.isDown && jumpTimer < 2){
				jumpTimer++;
				player.animations.play('walk');
				player.body.velocity.y = -600;	
		}
		else{
			player.frame = 3;
		}
		
		if(jumpTimer == 2 && player.body.onFloor()){
			jumpTimer = 0;
		}  
		
		textBox.setText("COINS: "+coinscount);
	},
	
	gameover:function(){
		player.reset(100,250);
	},
	
	coins1:function(){
		if(this.body.checkCollision.down){
			alert('BANK');
		}
		if(player.body.touching.up){
			this.physics.arcade.collide(player,this);
		}
	},
	coinsadd:function(obj1,obj2){
		
		if(!obj1.hasTriggered && !obj2.hasTriggered){
			obj1.hasTriggered = obj2.hasTriggered = true;
			mapc.putTile(-1,Groundlayer.getTileX(player.x),Groundlayer.getTileY(player.y));
			coinscount++;
		}		
	}
	
};