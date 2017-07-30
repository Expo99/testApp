var Tutorial =function(game){
	this.type=0; //el tipo de tutorial que se debe mostrar
	this.hand=null;
	this.game=game;
	this.tutorialsCompleted=[] //una arreglo que representa cuantos tutoriales se han completado

	this.boxContainer= new TextBox(game);
	this.hand= this.game.add.sprite(-999,-999,'dedo');
	this.hand.scale.setTo(0.5,0.5);
	this.hand.angle=-45;
	for(var i=0;i<10;i++){
		
	}
	this.tutorialsData=game.cache.getJSON('tutorials');
	this.actualTutorial=null;
}

Tutorial.prototype = {

	createTutorials:function(){

	},
	openTutorial:function(type){
		this.actualTutorial=this.tutorialsData.nTutorial[type];
		console.log(this.actualTutorial);
		this.boxContainer.CreateBox(this.actualTutorial.x,this.actualTutorial.y,this.actualTutorial.width,
									this.actualTutorial.height,this.actualTutorial.text);
		this.hand.x=this.game.world.width/2 +this.actualTutorial.handX;
		this.hand.y=this.game.world.height/2 +this.actualTutorial.handY;
		/*switch(type){
			case 1: 
		}*/
	},

	specialTutorials:function(type){
		
		/*switch(type){
			case 1:/*ar twe=this.game.add.tween(this.hand);
				   twe.to({x:500,y:450},500);
				   twe.onComplete.add(function(){

				   },this);

		}*/
		

	},

	closeTutorial:function(type){
		this.boxContainer.Remove();
		this.hand.x=-999;
		this.hand.y=-999;
		this.tutorialsCompleted[type]=true;
	}
};
