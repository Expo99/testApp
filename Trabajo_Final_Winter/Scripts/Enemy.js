EnemyFather=function(game,player,key){
	Phaser.Sprite.call(this,game,-999,-999,'enemigo1');
	this.game=game;
	this.player=player;
	this.anchor.setTo(0.5,0.5);
	//this.checkWorldBounds=true;
	//this.outOfBoundsKill=true;
	this.game.physics.arcade.enable(this);
	this.enableBody=true;
	//this.exists=false;
	this.life=100;
	this.stop_moving=false;
	this.stop_fire=-1;// si es -1 es false, si es 1 es true;
	this.time_stopMoving=0;
	this.time_interFiring=150;
	this.timer_stopFiring=0;//un timer que me ayuda con el interfiring

	/*this.weapon=game.add.weapon(9,'enemy_bullet');
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.bulletSpeed = 600;
	this.weapon.fireRate = 300;
	this.weapon.trackSprite(this, 0, 0);*/

	//game.add.existing(this);
}

EnemyFather.prototype=Object.create(Phaser.Sprite.prototype);
EnemyFather.prototype.constructor = EnemyFather;


EnemyFather.prototype.Call=function(pX,pY){
	this.outOfBoundsKill=false;
	this.exists=true;
	this.visible=true;
	this.x=pX;
	this.y=pY;
	//this.reset(pX,pY);
}

EnemyFather.prototype.offScreen=function(){//aqui piuedo verificar cuando las naves no son destruidas y salen de la pantalla
	if(this.x+(this.width/2)<0){
		this.outOfBoundsKill=true;
		this.exists=false;//parece que no reconoce el outofBoundKill;
	}
};

/*EnemyFather.prototype.Fire(){
	this.weapon.fireAtSprite(this.player);
}
*/


var Enemyn1=function(game,player,key){
 	EnemyFather.call(this,game,player,key);

	this.weapon= game.add.weapon(50,'enemy_bullet');
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.bulletSpeed = 300;
	this.weapon.fireRate=1;
	this.weapon.fireAngle= 180;
	this.weapon.trackSprite(this, 0, 0);
	this.scale.set(4,3);
}

Enemyn1.prototype= Object.create(EnemyFather.prototype);
Enemyn1.prototype.constructor= Enemyn1;

Enemyn1.prototype.Update=function(){
	console.log(this.x);
	this.body.velocity.x = -100;
	this.Shoot();
	this.offScreen();
}

Enemyn1.prototype.Shoot=function(){
	this.time_interFiring--;

	if(this.time_interFiring<=0){
		this.time_interFiring= Math.floor((Math.random() * 250) + 100);
		this.weapon.fire(this);
	}
}




var Enemy={};

Enemy.normalEnemy1=function(game,player,key){

	EnemyFather.call(this,game,player,key);

	this.weapon= game.add.weapon(50,'bala_jugador');
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.bulletSpeed = 300;
	this.weapon.fireRate=1;
	this.weapon.fireAngle= 180;
	this.weapon.trackSprite(this, 0, 0);
	this.scale.set(4,3);
}
Enemy.normalEnemy1.prototype= Object.create(EnemyFather.prototype);
Enemy.normalEnemy1.prototype.constructor= Enemy.normalEnemy1;


Enemy.normalEnemy1.prototype.Update=function(){
	console.log(this.x);
	this.body.velocity.x = -100;
	this.Shoot();
	this.offScreen();
}

Enemy.normalEnemy1.prototype.Shoot=function(){
	this.time_interFiring--;

	if(this.time_interFiring<=0){
		this.time_interFiring= Math.floor((Math.random() * 250) + 100);
		this.weapon.fire(this);
	}
}



Enemy.normalEnemy2=function(game,player,key){
	EnemyFather.call(this,game,player,key);

}
Enemy.normalEnemy2.prototype= Object.create(EnemyFather.prototype);
Enemy.normalEnemy2.prototype.constructor= Enemy.normalEnemy2;

Enemy.normalEnemy3=function(game,player,key){
	EnemyFather.call(this,game,player,key);
}
Enemy.normalEnemy3.prototype= Object.create(EnemyFather.prototype);
Enemy.normalEnemy3.prototype.constructor= Enemy.normalEnemy3;

