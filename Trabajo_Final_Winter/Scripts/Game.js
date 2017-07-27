Game=function(game){};
Game.prototype={
	init:function(){
		this.check=true;
		this.timcheck=0;
	},
	create:function(){
		this.background = this.add.tileSprite(0,0,this.world.width, this.world.height,'space');
		this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5};

		this.mothership = this.add.sprite(this.world.width/2,this.world.height/2,'mothership');
		this.mothership.anchor.setTo(0.5,0.5);
		this.mothership.scale.setTo(0.55,0.55)

		this.shop = this.add.button(this.mothership.x+350,this.mothership.y-170,'button_placeholder',this.openShop,this);
		this.shop.scale.setTo(4,2.9);
		this.map = this.add.button(this.mothership.x+350,this.mothership.y-20,'button_placeholder',this.openMap,this);
		this.map.scale.set(4,2.9);

		this.explore= this.add.button(this.mothership.x-75,this.mothership.y-250,'button_placeholder',this.StartExploring,this);
		this.explore.scale.set(4,2.9);
		this.tutorial= new Tutorial(this);
		this.Lifebar= new Lifebar(this);

	
		this.openTutorial(0);
		/*if(localStorage.getItem('Start')==null){

			localStorage.setItem('Start','Creado una vez');
			console.log(localStorage.getItem('Start'));
		}
		else{
			console.log("El start ya esta creado");
		}*/


		//Guardar y cargar datos
		//http://www.thebotanistgame.com/blog/2015/08/12/saving-loading-game-state-phaserjs.html

	},

	openShop:function(){
		console.log("Abrir tienda")
		this.Lifebar.recover();
	},

	openMap:function(){
		console.log("Abrir mapa")
		this.Lifebar.lostBlock();
	},

	openTutorial:function(type){
		
		this.tutorial.openTutorial(type);
	},

	closeTutorial:function(type){
		this.tutorial.closeTutorial(type);
	},

	StartExploring:function(){
		console.log("Empezemos a explorar");
		this.state.start('Shooter');
	}
};