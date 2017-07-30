var Material=function(game,name,amount,price,type,key){
	Phaser.Sprite.call(this,game,-9999,-9999,key);
	this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5, wordWrap: true, wordWrapWidth: 700 };
	this.name=name;
	this.game=game;
	//this.price=price;
	this.price=price;
	this.amount=amount;
	this.priceText=game.add.text(-999,-999,('x'+this.price),this.fontStyle);
	this.amountText=game.add.text(-999,-999,('x'+this.amount),this.fontStyle);

	if(type){//determina si es un material para recoger o no
		this.game.physics.arcade.enable(this);
		this.enableBody=true;
		this.checkWorldBounds = true;
    	this.outOfBoundsKill = true;
		this.scale.setTo(1.5,1.5);
	}
	this.scale.setTo(1.8,1.8);
	game.add.existing(this);
}

Material.prototype=Object.create(Phaser.Sprite.prototype);
Material.prototype.constructor=Material;

Material.prototype.Appear=function(pX,pY){
	this.x=pX+(Math.floor((Math.random() * 80) - 80));
	this.y=pY+(Math.floor((Math.random() * 80) - 80));
	this.body.velocity.x=-50;
}


Material.prototype.Destroy=function(){
	this.destroy();
}


