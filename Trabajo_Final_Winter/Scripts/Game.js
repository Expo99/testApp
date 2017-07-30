Game=function(game){};
Game.prototype={
	init:function(){
		this.check=true;
		this.timcheck=0;
	},
	create:function(){
		this.background = this.add.tileSprite(0,0,this.world.width, this.world.height,'space');
		this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5};

		this.mothership = this.add.sprite(this.world.width/2,this.world.height/2+40,'mothership');
		this.mothership.anchor.setTo(0.5,0.5);
		this.mothership.scale.setTo(0.55,0.55)

		this.inventory=this.add.button(this.mothership.x+460,this.mothership.y-150,'button_placeholder',this.openInventory,this);
		this.inventory.scale.setTo(2,1.9);

		this.shop = this.add.button(this.mothership.x-340,this.mothership.y-318,'button_placeholder',this.openShop,this);
		this.shop.scale.setTo(4.5,1.8);

		this.workshop= this.add.button(this.mothership.x+410,this.mothership.y-40,'button_placeholder',this.openWorkShop,this);
		this.workshop.scale.setTo(4,2.9);

		this.map = this.add.button(this.mothership.x+410,this.mothership.y+100,'button_placeholder',this.openMap,this);
		this.map.scale.set(4,2.9);

		this.explore= this.add.button(this.mothership.x-75,this.mothership.y-250,'button_placeholder',this.StartExploring,this);
		this.explore.scale.set(4,2.9);
		this.tutorial= new Tutorial(this);
		this.Lifebar= new Lifebar(this);

		this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5, wordWrap: true, wordWrapWidth: 700 };
		this.money=this.add.sprite(this.shop.x+500,this.shop.y,'coin');
		this.moneyAmount=100;
		this.moneyText=this.add.text(this.money.x+50,this.money.y,'x'+this.moneyAmount,this.fontStyle);
		this.moneyText.scale.setTo(1.5,1.5);
		this.money.scale.setTo(2.5,2.5);


		this.star= this.add.sprite(this.shop.x+680,this.shop.y,'star');
		this.starAmount=50;
		this.starText= this.add.text(this.star.x+50,this.star.y,'x'+this.starAmount,this.fontStyle);
		this.starText.scale.setTo(1.5,1.5);
		this.star.scale.setTo(2.5,2.5);
		/*this.HUDBox=new TextBox(this)
		this.HUDBox.width=550;
		this.HUDBox.height=300;

		this.HUDBox.x=this.world.width/2-250;
		this.HUDBox.y=this.world.height/2-200;

		this.closeButton=this.add.button(this.HUDBox.x+this.HUDBox.width-50,this.HUDBox.y-45,'close',this.closeHudWindow,this);
		this.closeButton.scale.setTo(1.5,1.5);*/
		this.openTutorial(0);

		this.inventoryBox= new InventoryBox(this,550,300);
		this.inventoryBox.AddLine(new Material(this,'cobre',10,2,false,'material1'));
		this.inventoryBox.AddLine(new Material(this,'cristal',20,10,false,'material2'));
		this.inventoryBox.AddLine(new Material(this,'caucho',98,7,false,'material3'));

		this.workShopBox= new WorkShopBox(this,550,300);
		this.workShopBox.AddLine('velocidad',[new Material(this,'cobre',5,0,false,'material1')],1);
		this.workShopBox.AddLine('resistencia',[new Material(this,'cobre',9,0,false,'material1'),new Material(this,'cristal',2,0,false,'material2')],1);
		this.workShopBox.AddLine('daño',[new Material(this,'caucho',10,0,false,'material3'),new Material(this,'cristal',5,0,false,'material2')],1);


		this.workShopBox.AddLine('Doble bala',[new Material(this,'caucho',2,0,false,'material3')],2);
		this.workShopBox.AddLine('Laser',[new Material(this,'cristal',10,0,false,'material2'),new Material(this,'cobre',5,0,false,'material1')],2);
		this.workShopBox.AddLine('Triple disparo',[new Material(this,'caucho',3,0,false,'material3'),new Material(this,'cobre',3,0,false,'material1')],2);


		this.ShopBox= new ShopBox(this,550,330);
		this.ShopBox.AddLine('Poster',1,40,'star');
		this.ShopBox.AddLine('Flama Azul Nave nodriza',1,100,'coin');
		this.ShopBox.AddLine('Flama Azul nave',1,70,'coin');

		this.ShopBox.AddLine('dinero',2,100,1);
		this.ShopBox.AddLine('dinero',2,500,3);
		this.ShopBox.AddLine('dinero',2,2000,9);


		this.MapBox= new MapBox(this,550,330);
		this.MapBox.AddLine(1,'Una terrible bienvenida',1);
		this.MapBox.AddLine(1,'Escurridizos',2);
		this.MapBox.AddLine(1,'Las profundidades',3);
		this.windowopen=false;//evita que se abran 2 ventanas a la vez
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

	openInventory:function(){
		this.inventoryBox.Call(this.world.width/2-250,this.world.height/2-200);
	},
	openShop:function(){
		console.log("Abrir tienda")
		this.ShopBox.TabCall(this.world.width/2-250,this.world.height/2-200,this.ShopBox.tab1,this.ShopBox.tab2,this.ShopBox.texts1)
		console.log(this.ShopBox.texts);
	},

	openWorkShop:function(){
		this.workShopBox.TabCall(this.world.width/2-250,this.world.height/2-200,this.workShopBox.tab1,this.workShopBox.tab2,this.workShopBox.texts1);
		this.Lifebar.recover();
	},
	openMap:function(){
		console.log("Abrir mapa")
		this.MapBox.TabCall(this.world.width/2-250,this.world.height/2-200,this.MapBox.tab1,this.MapBox.tab2,this.MapBox.texts1)
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