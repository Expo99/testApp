Shooter= function(game){
	
};
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
		//this.return= this.add.button(70,40,'button_placeholder',this.back,this);
		this.weaponButton1.scale.setTo(4,2.9);
		this.weaponButton2.scale.setTo(4,2.9);
		//this.return.scale.setTo(4,2.9);

		this.enemies= this.add.group();
		this.materialsDropped=this.add.group();

		this.tutorial= new Tutorial(this);

		this.report=new CollectedBox(this,550,300);

		for(var i=0;i<50;i++){
			var enemy= new Enemy.normalEnemy1(this,this.player,'enemigo1');
			this.enemies.add(enemy);
		}
		this.lifebar= new Lifebar(this,parseInt(localStorage.getItem('Life')));
		this.jsonRead();
		if(localStorage.getItem('Start')=='true')
			this.tutorial.openTutorial(1);
		//this.weaponButton3=this.add.button(350,450,'button_placeholder',this.changeTriple,this);;
	},

	hitenemy_Bullet:function(enemy,bullet){
		bullet.kill();
		enemy.health--;

		if(enemy.health<=0){
			var nMaterial= Math.floor((Math.random() * 4) + 0);
			
			for(var i=0;i<=nMaterial;i++){
				var typeMaterial= Math.floor((Math.random()*3)+0);
				var material=null;
				switch(typeMaterial){
					case 0: material= new Material(this.game,'cobre',1,0,true,'material1');break;
					case 1: material= new Material(this.game,'cristal',1,0,true,'material2');break;
					case 2: material= new Material(this.game,'caucho',1,0,true,'material3');break;
				}
				material.Appear(enemy.x,enemy.y);
				this.materialsDropped.add(material);
			}
			enemy.kill();
		}
	},

	hit_player:function(player,bullet){
		bullet.kill();
		var loselife= parseInt(localStorage.getItem('Life'))-1;
		this.lifebar.lostBlock();
		localStorage.setItem('Life',loselife);
		if(this.lifebar.blocksAvailable==0){
			localStorage.setItem('Life','0');
			this.state.start('Game',true,false,2);
		}
	},

	hitenemy_Laser:function(enemy,laser){
		laser.width=this.player.x+(enemy.x+enemy.width/2);
		enemy.health-=0.1;
		if(enemy.health<=0){
			var nMaterial= Math.floor((Math.random() * 4) + 0);
			
			for(var i=0;i<=nMaterial;i++){
				var typeMaterial= Math.floor((Math.random()*3)+0);
				var material=null;
				switch(typeMaterial){
					case 0: material= new Material(this.game,'cobre',1,0,true,'material1');break;
					case 1: material= new Material(this.game,'cristal',1,0,true,'material2');break;
					case 2: material= new Material(this.game,'caucho',1,0,true,'material3');break;
				}
				material.Appear(enemy.x,enemy.y);
				this.materialsDropped.add(material);
			}
			enemy.kill();
		}
	},

	hitmaterial:function(material,player){
		this.materialsCollected.push(material);
		material.Destroy();

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
		this.state.start('Game',true,false,1);
	},
	updateEnemy:function(enemy){
		enemy.Update();

		this.physics.arcade.overlap(enemy,this.player.weaponA1.bullets,this.hitenemy_Bullet,null,this);
		this.physics.arcade.overlap(enemy,this.player.weaponA2.bullets,this.hitenemy_Bullet,null,this);
		this.physics.arcade.overlap(enemy,this.player.weaponB,this.hitenemy_Laser,null,this);

		this.physics.arcade.overlap(enemy.weapon.bullets,this.player,this.hit_player,null,this);
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
				if(this.currentEnemy<=this.levelData.enemies.length-1)
				{
					while(this.timePassed==this.levelData.enemies[this.currentEnemy].time)
					{
						var ED=this.levelData.enemies[this.currentEnemy];
						var enemy=this.enemies.getFirstExists(false).Call(this.world.width+ED.x,ED.y);
						this.currentEnemy++;
						if(this.currentEnemy==this.levelData.enemies.length){//si se pasa a un dato no existente que salga del while
							break;
						}
					}
				}		
			}
			this.materialsDropped.forEachExists(function(material){this.physics.arcade.overlap(material,this.player,this.hitmaterial,null,this)},this);
			this.enemies.forEachExists(this.updateEnemy,this);
			if(this.timePassed==this.levelData.duration){
				console.log(this.materialsCollected);
				var mat1=0;
				var mat2=0;
				var mat3=0;
				for(var i=0;i<this.materialsCollected.length;i++){
					if(this.materialsCollected[i].name=='cobre'){
						mat1++;
					}
					if(this.materialsCollected[i].name=='cristal'){
						mat2++;
					}
					if(this.materialsCollected[i].name=='caucho'){
						mat3++;
					}
				}
				this.report.WriteReport('cobre',mat1);
				this.report.WriteReport('cristal',mat2);
				this.report.WriteReport('caucho',mat3);


				var newCobre= parseInt(localStorage.getItem('Cobre'))+mat1;
				var newCristal= parseInt(localStorage.getItem('Cristal'))+mat2;
				var newCaucho= parseInt(localStorage.getItem('Caucho'))+mat3;

				/*console.log(newCobre);
				console.log(newCristal);
				console.log(newCaucho);*/
				//console.log('El valor anterior del cobre fue: '+parseInt(localStorage.getItem('Cobre')));
				localStorage.setItem('Cobre',newCobre);
				//console.log('A cobre se le agregara el valor de: '+mat1);
				//console.log('El nuevo valor del cobre es: '+parseInt(localStorage.getItem('Cobre')));


				//console.log('El valor anterior del cristal fue: '+parseInt(localStorage.getItem('Cristal')));
				localStorage.setItem('Cristal',newCristal);
				//console.log('A cristal se le agregara el valor de: '+mat2);
				//console.log('El nuevo valor del cristal es: '+parseInt(localStorage.getItem('Cristal')));


				//console.log('El valor anterior del caucho fue: '+parseInt(localStorage.getItem('Caucho')));
				localStorage.setItem('Caucho',newCaucho);
				//console.log('A caucho se le agregara el valor de: '+mat3);
				//console.log('El nuevo valor del caucho es: '+parseInt(localStorage.getItem('Caucho')));

				this.report.MoveReport(this.world.width/2-250,this.world.height/2-200);
			}
			this.report.Update();
		}
	}
};