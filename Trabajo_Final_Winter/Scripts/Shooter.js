Shooter= function(game){};
Shooter.prototype={

	init:function(){
		this.nextFire = 0;
		this.life=3;
		this.bckScroll=50;
		this.materialsCollected=[];
		this.explosion=null;
		this.done=false;
	},
	create:function(){

		this.background = this.add.tileSprite(0,0,this.world.width, this.world.height,'bk1');
		this.background.autoScroll(-this.bckScroll,0);
		this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5};

		this.player =  new Player(this);
		this.player.anchor.setTo(0.5,0.5);

		this.weaponButton1= this.add.button(150,420,'button_placeholder',this.changeSingle,this);
		this.weaponButton2= this.add.button(350,420,'button_placeholder',this.changeLaser,this);
		this.return= this.add.button(70,40,'button_placeholder',this.back,this);
		this.weaponButton1.scale.setTo(2.5,1.9);
		this.weaponButton2.scale.setTo(2.5,1.9);
		this.return.scale.setTo(2.5,1.9);
		//this.weaponButton3=this.add.button(350,450,'button_placeholder',this.changeTriple,this);;
	},

	changeSingle:function(type){
		this.player.weaponType=1;
		this.player.weaponB.hidelaser();
	},

	changeLaser:function(type){
		this.player.weaponType=2;

	},
	back:function(){
		this.state.start('Game');
	},
	update:function(){
		if(!this.done)
		{
			this.player.Update();
		}
	}
};