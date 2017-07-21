Lifebar=function(game){
	Phaser.Group.call(this,game);
	this.game=game;
	this.maxBlocks=4;
	this.blocksAvailable=this.maxBlocks;
	for(var i=0;i<this.maxBlocks;i++){
		var lifeblock= game.add.sprite(50+(i*32),20,'lifebar_block');
		lifeblock.anchor.setTo(0.5,0.5);
		this.add(lifeblock);
	}
}

Lifebar.prototype= Object.create(Phaser.Group.prototype);

Lifebar.prototype.constructor = Lifebar;


Lifebar.prototype.lostBlock=function(){
	
	if(this.blocksAvailable>0){
		var block= this.getChildAt(this.blocksAvailable-1);
		console.log(block);
		block.kill();
		this.blocksAvailable--;
	}
	
	if(this.blocksAvailable<0)
		this.blocksAvailable=0;

};

Lifebar.prototype.recover=function(){
	if(this.blocksAvailable<this.maxBlocks){
		var block = this.getChildAt(this.blocksAvailable);
		console.log(block);
		block.reset(block.x,block.y);
		this.blocksAvailable++;
	}
	console.log(this.blocksAvailable);
}

