var TextBox=function(game){
	Phaser.Sprite.call(this,game,-9999,-9999,'text_box');
	this.game=game;
	this.width=200;
	this.height=100;
	this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5, wordWrap: true, wordWrapWidth: 320 };
	game.add.existing(this);
	this.texto=this.game.add.text(-999,-999,'',this.fontStyle);
	this.texto.x=-999;
	this.texto.y=-999;
	
}

TextBox.prototype= Object.create(Phaser.Sprite.prototype);
TextBox.prototype.constructor= TextBox;

TextBox.prototype.CreateBox=function(pX,pY,pwidth,pheight,pText){
	this.x=pX;
	this.y=pY;
	this.width=pwidth;
	this.height=pheight;
	this.texto.text= pText;
	this.texto.x=this.x+10;
	this.texto.y=this.y+20;
}

TextBox.prototype.Remove=function(){
	this.x=-999;
	this.y=-999;
	this.texto.text='';
	this.texto.x=-999;
	this.texto.y=-999;
	this.width=0;
	this.height=0;
}

