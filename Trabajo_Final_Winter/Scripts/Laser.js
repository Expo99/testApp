Laser=function(game){
	Phaser.Sprite.call(this,game,-999,-999,'beam');
	this.game=game;	
	this.bulletSpeed=500;
	game.physics.enable(this,Phaser.Physics.ARCADE);
	this.anchor.setTo(0,0.5);
	this.checkWorldBounds=true;
	this.outOfBoundsKill=true;
	this.exists=false;
	this.width=5;
	game.add.existing(this);

}
Laser.prototype= Object.create(Phaser.Sprite.prototype);

Laser.prototype.constructor = Laser;
Laser.prototype.fire=function(source){
	//if(this.game.input.activePointer.isDown){
		//console.log(this);y
		this.reset(source.x,source.y);
		
		if(this.width+this.x < this.game.world.width)
			this.width+=12;

		//if(this.x)
		//if(source.x - this.width<0){

		//}
		//this.reset(source.x,source.y);
		/*if(source.x-this.width>0){
			this.width+=5;
			console.log(this.width)
		}*/
		/*if(source.x-this.width>0){
			this.width=source.x;
		}*/
		//console.log("La posicion de la nave es: %s,%s La posicion del laser es: %s,%s %s",source.x,source.y,this.x,this.y,this.height);
		//this.exists=true;
	//}
}

Laser.prototype.borrarlaser=function(){
	console.log("Borrar");
	this.width=5;
	this.x=-999;
	this.y=-999;
}