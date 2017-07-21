Game=function(game){};
Game.prototype={
	init:function(){
		this.check=true;
		this.timcheck=0;
	},
	create:function(){
		this.background = this.add.tileSprite(0,0,this.world.width, this.world.height,'space');
		this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5};

		this.mothership = this.add.sprite(350,280,'mothership');
		this.mothership.anchor.setTo(0.5,0.5);
		this.mothership.scale.setTo(0.5,0.5)

		this.shop = this.add.button(650,250,'button_placeholder',this.openShop,this);
		this.shop.scale.setTo(2.5,1.9);
		this.map = this.add.button(650,350,'button_placeholder',this.openMap,this);
		this.map.scale.set(2.5,1.9);

		this.explore= this.add.button(350,90,'button_placeholder',this.StartExploring,this);
		this.explore.scale.set(2.5,1.9);

		this.Lifebar= new Lifebar(this);

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

	StartExploring:function(){
		console.log("Empezemos a explorar");
		this.state.start('Shooter');
	}
};