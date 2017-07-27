Shooter= function(game){};
Shooter.prototype={

	init:function(){
		this.nextFire = 0;
		this.life=3;
		this.bckScroll=50;
		this.materialsCollected=[];
		this.explosion=null;
		this.done=false;
		this.timePassed=0;
		this.levelData=null;
		this.zone=1;
	},
	create:function(){

		this.background = this.add.tileSprite(0,0,this.world.width, this.world.height,'bk1');
		this.background.autoScroll(-this.bckScroll,0);
		this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5};

		this.player =  new Player(this);
		this.player.anchor.setTo(0.5,0.5);

		this.weaponButton1= this.add.button(this.world.width/2 -450,this.world.height-150,'button_placeholder',this.changeSingle,this);
		this.weaponButton2= this.add.button(this.world.width/2 -100,this.world.height-150,'button_placeholder',this.changeLaser,this);
		this.return= this.add.button(70,40,'button_placeholder',this.back,this);
		this.weaponButton1.scale.setTo(4,2.9);
		this.weaponButton2.scale.setTo(4,2.9);
		this.return.scale.setTo(4,2.9);

		this.enemies= this.add.group();

		for(var i=0;i<10;i++){
			var enemy= new Enemy.normalEnemy1(this,this.player,'enemigo1');
			this.enemies.add(enemy);
		}
		this.jsonRead();

		//this.weaponButton3=this.add.button(350,450,'button_placeholder',this.changeTriple,this);;
	},

	changeSingle:function(type){
		this.player.weaponType=1;
		this.player.weaponB.borrarlaser();
	},

	changeLaser:function(type){
		if(this.player.weaponType==1){
			this.player.weaponType=2;
			this.player.weaponB.width=5;
		}
	},
	back:function(){
		this.state.start('Game');
	},
	updateEnemy:function(enemy){
		enemy.Update();
	},
	jsonRead:function(){
		this.levelData= this.cache.getJSON('level'+this.zone);
		this.currentEnemy=0;
		//El "x" : this.world.width+ x


	},

	update:function(){
		if(!this.done)
		{
			this.timePassed++;
			this.player.Update();
			//console.log(this.timePassed);
			if(this.zone>=1 && this.zone<=5){
				//console.log(this.levelData.enemies[this.currentEnemy].time);
				if(this.currentEnemy<=this.levelData.enemies.length-1){
					while(this.timePassed==this.levelData.enemies[this.currentEnemy].time){
						var ED=this.levelData.enemies[this.currentEnemy];
						var enemy=this.enemies.getFirstExists(false).Call(this.world.width+ED.x,ED.y);
						this.currentEnemy++;
						console.log("GO");
						if(this.currentEnemy==this.levelData.enemies.length){//si se pasa a un dato no existente que salga del while
							break;
						}
					}
				}
				
			}

			/*if(this.timePassed==100){
				console.log("mandar");
				this.enemies.getFirstExists(false).Call(this.world.width+100,200);
			}*/
			this.enemies.forEachExists(this.updateEnemy,this);
			//this.enemies.forEachExists(this.updateEnemy,this);
		}
	}
};