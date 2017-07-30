Player=function(game){
	Phaser.Sprite.call(this,game,100,100,'player');
	this.game=game;
	this.weaponType=1;
	this.anchor.setTo(0.5,0.5);
	this.game.physics.arcade.enable(this);
	this.enableBody=true;
	
	this.weaponA1= game.add.weapon(50,'bala_jugador');
	this.weaponA1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weaponA1.bulletSpeed = 200;
	this.weaponA1.fireRate = 450;
	this.weaponA1.fireAngle= 0;
	this.weaponA1.trackSprite(this, 0, 14);

	this.weaponA2= game.add.weapon(50,'bala_jugador');
	this.weaponA2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weaponA2.bulletSpeed = 250;
	this.weaponA2.fireRate = 400;
	this.weaponA2.fireAngle= 0;
	this.weaponA2.trackSprite(this, 0, -14);

	this.weaponB= new Laser(game);

	this.scale.setTo(1.8,1.8);
	game.add.existing(this);
}

Player.prototype=Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.Update=function(){
	this.x = this.game.input.x;
	this.y = this.game.input.y;
	this.Shoot();
}

Player.prototype.Shoot=function(){
	if(this.weaponType==1){
		this.weaponA1.fire();
		this.weaponA2.fire();
	}
	
	if(this.weaponType==2){
		this.weaponB.fire(this);
	}
}

Player.prototype.Death=function(){

}