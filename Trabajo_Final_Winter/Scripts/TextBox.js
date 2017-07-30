var TextBox=function(game){
	Phaser.Sprite.call(this,game,-9999,-9999,'text_box');
	this.game=game;
	this.width=200;
	this.height=100;
	this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5, wordWrap: true, wordWrapWidth: 300 };
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
	this.texto.y=this.y+10;
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

var Inventoryline=function(game,pmaterial){
	this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5, wordWrap: true, wordWrapWidth: 700 };
	this.material=pmaterial;
	this.text=game.add.text(-999,-999,'',this.fontStyle);
	this.coin=game.add.sprite(-999,-999,'coin');
	this.sellButton=game.add.button(-999,-999,'button_placeholder',this.sell,this);
	this.game=game;
	this.coin.scale.setTo(1.8,1.8);
	this.sellButton.scale.setTo(2.5,1.2);
}

Inventoryline.prototype={
	accommodate:function(pX,pY){
		this.material.x=pX;
		this.material.y=pY;
		//this.text.text=('         '+this.material.name+'  x'+this.material.amount+'                                      x'+this.material.price);
		this.text.x=pX+40;
		this.text.y=pY;
		this.coin.x=pX+300;
		this.coin.y=pY;
		this.sellButton.x=pX+420;
		this.sellButton.y=pY;
		this.updateText();
	},
	updateText:function(){
		this.text.text=this.material.name;
		this.material.amountText.x=this.text.x+90;
		this.material.amountText.y=this.text.y;
		
		this.material.priceText.x=this.coin.x+40;
		this.material.priceText.y=this.coin.y;

		this.material.amountText.text='x'+this.material.amount;
		this.material.priceText.text='x'+this.material.price;
		
	},
	sell:function(){
		if(this.material.amount>0){
			this.material.amount--;

			switch(this.material.name){
				case 'cobre': localStorage.setItem('Cobre',this.material.amount);break;
				case 'cristal': localStorage.setItem('Cristal',this.material.amount);break;
				case 'caucho': localStorage.setItem('Caucho',this.material.amount);break;
			}
			
			this.game.moneyAmount+=this.material.price;
			console.log(this.game.moneyAmount);
			localStorage.setItem('Money',this.game.moneyAmount);
			this.game.moneyText.text=('x'+this.game.moneyAmount);
			this.accommodate(this.material.x,this.material.y);
		}
	},
	close:function(){
		this.material.x=-999999;
		this.text.x=-99999;
		this.coin.x=-99999;
		this.sellButton.x=-999999;
		this.material.amountText.x=-9999999;
		this.material.priceText.x=-9999999;
	}
}

//pMaterials es un arreglo de materiales (por ahora solo contiene maximo 2 materiales)
var WorkShopline=function(game,pName,pMaterials){
	this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5, wordWrap: true, wordWrapWidth: 700 };
	this.text=game.add.text(-999,-999,'',this.fontStyle);
	this.upgradeName=pName;
	this.level=1;
	this.levelStatus="[+----]";
	this.materials=pMaterials;
	this.upgradeButton= game.add.button(-999,-999,'button_placeholder',this.upgrade,this);
	this.upgradeButton.scale.setTo(2.5,1.2);
};

WorkShopline.prototype={
	
	accommodate:function(pX,pY){
		this.text.x=pX;
		this.text.y=pY;
		this.upgradeButton.x=pX+420;
		this.upgradeButton.y=pY;
		this.updateText();
	},
	updateText:function(){
		this.text.text=(this.upgradeName+' '+this.levelStatus+' Lv'+this.level);
		for(var i=0;i<this.materials.length;i++){
			this.materials[i].x=(this.text.x+335 -(i*85));
			this.materials[i].y=this.text.y;
			this.materials[i].amountText.x=this.materials[i].x+33;
			this.materials[i].amountText.y=this.text.y;
		}

	},
	upgrade:function(pMaterials){
		if(this.level<5){
			this.level++;
			var status='[';
			for(var i=0;i<this.level;i++){
				status+='+';
			}
			for(var i=0;i<5-this.level;i++){
				status+='-';
			}
			status+=']';
			this.levelStatus=status;
			//this.materials=pMaterials;
			this.accommodate(this.text.x,this.text.y);
		}
	},

	close:function(){
		this.text.x=-9999999;
		for(var i=0;i<this.materials.length;i++){
			this.materials[i].x=-999999;
			this.materials[i].amountText.x=-999999;
		}
		this.upgradeButton.x=-999999;
	}

};

var Skinline=function(game,name,amount,key){
	this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5, wordWrap: true, wordWrapWidth: 700 };
	this.text=game.add.text(-999,-999,name,this.fontStyle);
	this.game=game;
	this.currency=game.add.sprite(-999,-999,key);
	this.currency.scale.setTo(1.8,1.8);
	this.textAmount= game.add.text(-999,-999,'x'+amount,key);
	this.BuyButton= game.add.button(-999,-999,'button_placeholder',this.buy,this);
	this.BuyButton.scale.setTo(2.5,1.2);
}


Skinline.prototype={
	accommodate:function(pX,pY){
		this.text.x=pX;
		this.text.y=pY;
		this.currency.x=pX+300;
		this.currency.y=pY;
		this.textAmount.x=this.currency.x+40;
		this.textAmount.y=pY;
		this.BuyButton.x=pX+420;
		this.BuyButton.y=pY;
	},
	buy:function(){
		var compra= this.game.add.text(500,70,'GRACIAS POR COMPRAR!!!! :)',this.fontStyle);
		var tween= this.game.add.tween(compra);
		tween.to({alpha:0},4000);
		tween.onComplete.add(function(compra){
			compra.destroy();
		},this);
		tween.start();
		console.log("Gracias por comprar");
	},
	close:function(){
		this.text.x=-99999;
		this.currency.x=-999999;
		this.textAmount.x=-99999;
		this.BuyButton.x=-9999;
	}
};

var Cashline=function(game,starAmount,cash){
	this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5, wordWrap: true, wordWrapWidth: 700 };
	this.starAmount=starAmount;
	this.starAmountText=game.add.text(-999,-999,'x'+starAmount,this.fontStyle);
	this.star= game.add.sprite(-999,-999,'star');
	this.game=game;
	this.cash=cash;
	this.cashText=game.add.text(-999,-999,'$'+cash+'.99',this.fontStyle);
	this.BuyButton= game.add.button(-999,-999,'button_placeholder',this.buy,this);
	this.BuyButton.scale.setTo(2.5,1.2);
}

Cashline.prototype={
	
	accommodate:function(pX,pY){
		this.star.x=pX;
		this.star.y=pY;
		this.starAmountText.x=this.star.x+60;
		this.starAmountText.y=pY;
		this.cashText.x=pX+300;
		this.cashText.y=pY;
		this.BuyButton.x=pX+420;
		this.BuyButton.y=pY;
	},

	buy:function(){
		this.game.starAmount+=this.starAmount;
		this.game.starText.text=('x'+this.game.starAmount);
		localStorage.setItem('Cash',this.game.starAmount);
		console.log("Gracias por comprar cash!!!");
	},
	close:function(){
		this.starAmountText.x=-999999;
		this.star.x=-99999;
		this.cashText.x=-99999;
		this.BuyButton.x=-99999;
	}
};

var Zoneline=function(game,name,zone){
	this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5, wordWrap: true, wordWrapWidth: 700 };
	this.zone=zone;
	this.zoneName=game.add.text(-999,-999,('['+this.zone+'] '+name),this.fontStyle);
	this.ExploreButton=game.add.button(-999,-999,'button_placeholder',this.explore,this);
	this.ExploreButton.scale.setTo(2.5,1.2);
};

Zoneline.prototype={

	accommodate:function(pX,pY){
		this.zoneName.x=pX;
		this.zoneName.y=pY;
		this.ExploreButton.x=pX+420;
		this.ExploreButton.y=pY;
	},
	explore:function(){
		console.log("Vamos a explorar!");
	},
	close:function(){
		this.zoneName.x=-999999;
		this.ExploreButton.x=-99999;
	}
}
var Box=function(game,pwidth,pheight){
	Phaser.Sprite.call(this,game,-9999,-9999,'text_box');
	this.game=game;
	game.add.existing(this);
	this.width=pwidth;
	this.height=pheight;
	this.texts=[];
	this.closeButton=game.add.button(-999,-999,'close',this.closeBox,this);
}

Box.prototype=Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor=Box;

Box.prototype.Call=function(pX,pY){
	this.x=pX;
	this.y=pY;
	this.exists=true;
	this.closeButton.exists=true;
	this.closeButton.x=this.x+this.width;
	this.closeButton.y=this.y-45;
	this.accommodate();
};


Box.prototype.TabCall=function(pX,pY,tab1,tab2,firsttext){
	this.x=pX;
	this.y=pY;
	this.exists=true;
	this.closeButton.exists=true;
	this.closeButton.x=this.x+this.width;
	this.closeButton.y=this.y-45;
	tab1.x=pX;
	tab1.y=pY-30;
	tab2.x=pX+this.width-100;
	tab2.y=pY-30;
	this.texts=firsttext;
	this.accommodate();
}

Box.prototype.accommodate=function(){
	console.log("El inventario cuenta con: "+this.texts.length+" elementos");
	for(var i=0;i<this.texts.length;i++){
		this.texts[i].accommodate(this.x+30,(30+this.y+(i*100)));
	}
};

var CollectedBox=function(game,pwidth,pheight){
	Box.call(this,game,pwidth,pheight);
};

CollectedBox.prototype=Object.create(Box.prototype);
CollectedBox.prototype.constructor=CollectedBox;


CollectedBox.prototype.MoveReport=function(pX,pY){
	this.x=pX;
	var tween= this.game.add.tween(this);
	tween.to({y:pY},5000);
	tween.start();
}

CollectedBox.prototype.WriteReport=function(materialName,amount){
	var line= this.game.add.text(-999,-999,(materialName+'                                       x'+amount),this.fontStyle);
	this.texts.push(line);
}


CollectedBox.prototype.Update=function(){
	for(var i=0;i<this.texts.length;i++){
		this.texts[i].x=this.x+15;
		this.texts[i].y=25+this.y+(50*i);
	}
	this.closeButton.x=this.x+this.width;
	this.closeButton.y=this.y-45;
};

CollectedBox.prototype.closeBox=function(){
	this.game.state.start('Game',true,false,2);
};


var InventoryBox=function(game,pwidth,pheight){
	Box.call(this,game,pwidth,pheight);
};

InventoryBox.prototype=Object.create(Box.prototype);
InventoryBox.prototype.constructor=InventoryBox;

InventoryBox.prototype.AddLine=function(pmaterial){
	var line= new Inventoryline(this.game,pmaterial);
	this.texts.push(line);
};

InventoryBox.prototype.closeBox=function(){
	this.exists=false;
	this.closeButton.exists=false;
	for(var i=0;i<this.texts.length;i++){
		this.texts[i].close();
	}
	if(this.game.tutorialOn && this.game.tutorial.type==2){
		this.game.tutorial.nextTutorial();
	}
	this.game.windowOpen=false;
}


var WorkShopBox=function(game,pwidth,pheight){
	Box.call(this,game,pwidth,pheight);
	this.texts1=[];
	this.texts2=[];
	this.tab1=game.add.button(-9999,-9999,'tab_placeholder',function(){this.ChangeInfo(1)},this);
	this.tab2=game.add.button(-9999,-9999,'tab_placeholder',function(){this.ChangeInfo(2)},this);
	this.tab1.scale.setTo(3,1.5);
	this.tab2.scale.setTo(3,1.5);
};

WorkShopBox.prototype=Object.create(Box.prototype);
WorkShopBox.prototype.constructor=WorkShopBox;


WorkShopBox.prototype.AddLine=function(name,materials,type){
	var line=new WorkShopline(this.game,name,materials);

	switch(type){
		case 1:this.texts1.push(line);break;
		case 2:this.texts2.push(line);break;
	}
}

WorkShopBox.prototype.ChangeInfo=function(type){
	switch(type){
		case 1: this.texts=this.texts1;for(var i=0;i<this.texts2.length;i++){this.texts2[i].close();};break;
		case 2: this.texts=this.texts2;for(var i=0;i<this.texts1.length;i++){this.texts1[i].close()};break;
	}
	this.accommodate();
}

WorkShopBox.prototype.closeBox=function(){
	this.exists=false;
	this.closeButton.exists=false;
	for(var i=0;i<this.texts.length;i++){
		this.texts[i].close();
	}
	this.tab1.x=-999999;
	this.tab2.x=-999999;
	if(this.game.tutorialOn && this.game.tutorial.type==3){
		this.game.tutorial.nextTutorial();
	}
	this.game.windowOpen=false;
}

var ShopBox=function(game,pwidth,pheight){
	Box.call(this,game,pwidth,pheight);
	this.texts1=[];
	this.texts2=[];
	this.tab1=game.add.button(-9999,-9999,'tab_placeholder',function(){this.ChangeInfo(1)},this);
	this.tab2=game.add.button(-9999,-9999,'tab_placeholder',function(){this.ChangeInfo(2)},this);
	this.tab1.scale.setTo(3,1.5);
	this.tab2.scale.setTo(3,1.5);
}

ShopBox.prototype=Object.create(Box.prototype);
ShopBox.prototype.constructor=ShopBox;
//Si se quiere un skin el extra se define como un key de sprite
//Si se quiere un pago cash el extra define el monto
ShopBox.prototype.AddLine=function(name,type,amount,extra){
	var line=null;
	switch(type){
		case 1:line= new Skinline(this.game,name,amount,extra);this.texts1.push(line);break;
		case 2:line= new Cashline(this.game,amount,extra);this.texts2.push(line);break;
	}
}

ShopBox.prototype.ChangeInfo=function(type){
	switch(type){
		case 1: this.texts=this.texts1;for(var i=0;i<this.texts2.length;i++){this.texts2[i].close();};break;
		case 2: this.texts=this.texts2;for(var i=0;i<this.texts1.length;i++){this.texts1[i].close()};break; 
	}
	this.accommodate();
};
ShopBox.prototype.closeBox=function(){
	this.exists=false;
	this.closeButton.exists=false;
	for(var i=0;i<this.texts.length;i++){
		this.texts[i].close();
	}
	this.tab1.x=-999999;
	this.tab2.x=-999999;
	if(this.game.tutorialOn && this.game.tutorial.type==5){
		this.game.tutorial.nextTutorial();
	}
	this.game.windowOpen=false;
};

var MapBox=function(game,pwidth,pheight){
	Box.call(this,game,pwidth,pheight);
	this.texts1=[];
	this.texts2=[];
	this.tab1=game.add.button(-9999,-9999,'tab_placeholder',function(){this.ChangeInfo(1)},this);
	this.tab2=game.add.button(-9999,-9999,'tab_placeholder',function(){this.ChangeInfo(2)},this);
	this.tab1.scale.setTo(3,1.5);
	this.tab2.scale.setTo(3,1.5);
}

MapBox.prototype=Object.create(Box.prototype);
MapBox.prototype.constructor=MapBox;


MapBox.prototype.AddLine=function(type,name,zone){
	var line=null;
	switch(type){
		case 1:line= new Zoneline(this.game,name,zone);this.texts1.push(line);break;
		//case 2:line= new Cashline(this.game,amount,extra);this.texts2.push(line);break;
	}
}

MapBox.prototype.ChangeInfo=function(type){
	switch(type){
		case 1: this.texts=this.texts1;for(var i=0;i<this.texts2.length;i++){this.texts2[i].close();};break;
		case 2: this.texts=this.texts2;for(var i=0;i<this.texts1.length;i++){this.texts1[i].close()};break; 
	}
	this.accommodate();
};
MapBox.prototype.closeBox=function(){
	this.exists=false;
	this.closeButton.exists=false;
	for(var i=0;i<this.texts.length;i++){
		this.texts[i].close();
	}
	this.tab1.x=-999999;
	this.tab2.x=-999999;
	if(this.game.tutorialOn && this.game.tutorial.type==4){
		this.game.tutorial.nextTutorial();
	}
	this.game.windowOpen=false;
};
		//this.upgradeImage.x=pX;
		//this.upgradeImage.y=pY;
		//this.text.text=('         '+this.material.name+'  x'+this.material.amount+'                                      x'+this.material.price);
		
		/*if(this.materials.length==1){
			this.text.text=(this.upgradeName+'  '+this.levelStatus+'  Lv:'+this.level+'                              x'+this.materials[0].amount);
			this.materials[0].x=pX+315;
			this.materials[0].y=pY;
		}
		if(this.materials.length==2){
			this.text.text=(this.upgradeName+'  '+this.levelStatus+'  Lv:'+this.level+'             x'+this.materials[0].amount+'            x'+this.materials[1].amount);
			this.materials[0].x=pX+230;
			this.materials[0].y=pY;
			this.materials[1].x=pX+315;
			this.materials[1].y=pY;
		}*/

/*Phaser.Sprite.call(this,game,-9999,-9999,'text_box');
	this.game=game;
	game.add.existing(this);
	this.texts=[];
	this.closeButton=game.add.button(-999,-999,'close',this.closeBox,this);*/

//Por ahora los textos no pueden pasar mas de una linea
/*InventoryBox.prototype.Call=function(pX,pY,pwidth,pheight){
	this.x=pX;
	this.y=pY;
	this.width=pwidth;
	this.height=pheight;
	this.exists=true;
	this.closeButton.exists=true;
	this.closeButton.x=this.x+this.width;
	this.closeButton.y=this.y-45;
	this.accommodate();
};*/
/*InventoryBox.prototype.accommodate=function(){
	console.log("El inventario cuenta con: "+this.texts.length+" elementos");
	for(var i=0;i<this.texts.length;i++){
		this.texts[i].accommodate(this.x+30,(30+this.y+(i*100)));
	}
};

InventoryBox.prototype.closeBox=function(){
	this.exists=false;
	this.closeButton.exists=false;
	for(var i=0;i<this.texts.length;i++){
		this.texts[i].close();
	}
}*/


/*var DoubleBox=function(game){
	Phaser.Sprite.call(this,game,-9999,-9999,'text_box');
	this.game=game;
	game.add.existing(this);
	this.texts=[];
	this.closeButton=game.add.button(-999,-999,'close',this.closeBox,this);
};


DoubleBox.prototype=Object.create(Phaser.Sprite.prototype);
DoubleBox.prototype.constructor=DoubleBox;*/


/*InformationBox.prototype.AddText=function(pX,pY,pText,pAmount){//el "x" y el "y" son los valores relativos al cuadro que los contiene
	var line={};
	line.text=this.game.add.text(this.x+pX,this.y+pY,pText);
	line.button=null;
	line.amount=pAmount//la cantidad de ese objeto disponible
	this.texts.push(line);
};

InformationBox.prototype.AddTextWithButton=function(pX,pY,pText,pAmount,pButtonType){
	var line={};
	line.text= this.game.add.text(this.x+pX,this.y+pY,pText);

	switch(pButtonType){
		//case 1:line.button=this.game.add.button(this.x+width-50,this.y+pY,'button_placeholder',this.SellButton,this);break;
	//	case 2:line.button=this.game.add.button(this.x+width-50,this.y+pY,'button_placeholder',this.UpgradeButton,this);break;
	//	case 3:line.button=this.game.add.button(this.x+width-50,this.y+pY,'button_placeholder',this.BuyButton,this);break;
	}
	
	line.amount=pAmount;
};*/



/*var DualInformationBox=function(game){
	Phaser.Sprite.call(this,game,-9999,-9999,'text_box');
	this.tab1=game.add.sprite(this.x,this.y-90,'text_box');
	this.tab2=game.add.sprite(this.x+this.width/2,this.y-90,'text_box');
	this.game=game;
	this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5, wordWrap: true, wordWrapWidth: 300 };
	game.add.existing(this);

	this.tab1.width=this.width/2;
	this.tab2.width=this.width/2;
	this.tab1.height=90;
	this.tab2.height=90;
	this.texts=[];

}

DualInformationBox.prototype=Object.create(Phaser.Sprite.prototype);
DualInformationBox.prototype.constructor=DualInformationBox;


DualInformationBox.prototype.Call=function(){

}

/*

*/

/*var Tab=function(game,pX,pY,pText,pName){//el tab contiene la información que ira en el recuadro pero no el recuadro en si
	Phaser.Sprite.call(this,game,-9999,-9999,'text_box');
	this.game=game;
	this.name=pName;
	this.texts=[];
	//this.line={};
	//this.line.button=null;
	//line.text= this.game.add.text(this.x+pX,this.y+pY,pText);
	//line.amount=pAmount;
}

Tab.prototype=Object.create(Phaser.Sprite.prototype);
Tab.prototype.constructor=Tab;

Tab.prototype.AddText=function(pX,pY,pText,type){
	var line={};
	line.button=AddButton(type);
	line.text=this.game.add.text(this.x+pX+this.y,pText);
	line.objectsNeed=[];
	line.amount=null;
}

Tab.prototype.UpdateText=function(i){
	this.texts[i].text=""
}
Tab.prototype.AddButton=function(type){
	switch(type){
		case 1:line.button=this.game.add.button(this.x+width-50,this.y+pY,'button_placeholder',this.SellButton,this);break;
		case 2:line.button=this.game.add.button(this.x+width-50,this.y+pY,'button_placeholder',this.UpgradeButton,this);break;
		case 3:line.button=this.game.add.button(this.x+width-50,this.y+pY,'button_placeholder',this.BuyButton,this);break;
	}
}

/*Tab.prototype.SellButton=function(){

};

Tab.prototype.UpgradeButton=function(){

};

Tab.prototype.BuyButton=function(){

};*/






