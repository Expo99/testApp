/**
Orden de llamada

Text() --- constructor de la clase
SetText()--- con esto se seteara el texto que queremos mostrar
ShowText()--- se encarga de llamar a las funciones ReadText y AddCharByChar
ReadText() --- Esta funcion devolvera el valor del texto que esta en el archivo json
AddCharByChar() ---Añadira el texto caracter por caracter. Llama 2 veces a la funcion PushText() que permite tener un vector donde el texto se muestra por partes y otro donde carga todo
PushText()-- Añade el texto al cuadro letra por letra. Usa la funcion GetNextWord()
GetNextWord()-- Me permite conseguir la siguiente palabra del texto
CheckText()-- Se ´puede llamar esta funcion para verificar si ya se termino de escribir el texto del json y si se puede pasar al siguiente
*/

var Text=function(game,size,level,type){
	this.game=game;
	this.CuadroSize=size;
	this.fontStyle = {font:'20px Arial',fill:'#FFCC00',stroke: "#333", strokeThickness: 5, wordWrap: true, wordWrapWidth: 670 };
	this.MyTimer=this.game.time.create(false);
	this.level=level;
	this.nextText=false;
	
	this.TextFile=this.game.cache.getJSON('textos');//ver problema del json
	this.Textposition=null;
	this.TYPE=type;
	this.textExtrachar=0;
}

Text.prototype.Create=function(){
	this.text_box=this.game.add.sprite(-999,-999,'text_box');
	this.text_box.width=0;
	this.text_box.height=0;
	this.text_box.anchor.setTo(0.5,0.5);
	this.sourceText=this.game.add.text(-999,-999,'',this.fontStyle);

	this.texto= this.game.add.text(200,500,'',this.fontStyle);
	this.texto.x=-999;
	this.texto.y=-999;
	
	this.textoSupport=this.game.add.text(-9999999,-9999999,'',this.fontStyle);//me permite almacenar el texto en un timer aparte para leerlo rapidamente

}

Text.prototype.Destroy=function(){
	this.text_box.destroy();
	this.texto.destroy();
	this.textoSupport.destroy();
	this.sourceText.destroy();
}
Text.prototype.ReadText=function(){//me permite sacar la informacion del json 
	if(this.TYPE=="normal"){
		return this.TextFile.texto[this.Textposition];
	}
	else{
		switch(this.level){
			case 1: return this.TextFile.decision.zona1[this.Textposition];break;
			case 2: return this.TextFile.decision.zona2[this.Textposition];break;
			case 3: return this.TextFile.decision.zona3[this.Textposition];break;
			/*case 1: if(this.TYPE=="rep1"){
				console.log(this.TextFile.decision.zona1[this.Textposition].resp1);
				return this.TextFile.decision.zona1[this.Textposition].resp1;
			}
			if(this.TYPE=="rep2"){
				console.log(this.TextFile.decision.zona1[this.Textposition].resp2);
				return this.TextFile.decision.zona1[this.Textposition].resp2;
			}
			if(this.TYPE=="rep3"){
				console.log(this.TextFile.decision.zona1[this.Textposition].resp3);
				return this.TextFile.decision.zona1[this.Textposition].resp3;
			}break;*/
		}
	}
};

Text.prototype.SetText=function(x,y,position){//me permite llamar a la ventana de texto con una animacion
	//console.log("EmpezarTexto");
	this.Create();//OPTIMIZAR ESTO
	var type=type;
	this.Textposition=position;
	this.text_box.x=x;
	this.text_box.y=y;
	if(this.TYPE=="normal"){
		this.texto.x=x-400/2;
		this.texto.y=y-150/2 +10;
		this.sourceText.x=x-400/2;
		this.sourceText.y=y-150/2 -27;
	}
	else{
		this.texto.x=x-190/2;
		this.texto.y=y-180/2 +10;
	}
	//console.log(this.text_box.x+ " "+ this.text_box.y);
	var twe=this.game.add.tween(this.text_box);
	if(this.TYPE=="normal"){
	//	console.log("hola");
		twe.to({width:400,height:150},100);
	}
	else{ 
		twe.to({width:190,height:180},100);
	}
	//console.log(this.TYPE);
	twe.onComplete.add(function(){
		this.ShowText();
		this.nextText=true;
	},this);
	twe.start();

};
Text.prototype.FinishText=function(){//me permite cerrar la ventana de texto con una animacion
	
	this.nextText=false;
	this.texto.text='';
	this.texto.x=-999;
	this.texto.y=-999;
	this.sourceText.x=-999;
	this.sourceText.y=-999;
	this.sourceText.text='';
	var twe=this.game.add.tween(this.text_box);
	twe.to({width:0,height:0},100);
	twe.onComplete.add(function(){
		this.text_box.x=-999;
		this.text_box.y=-999;
		if(this.TYPE=="normal"){
			this.game.pause=false;
		}		
		this.Destroy();
	},this);
	twe.start();

};
Text.prototype.NextText=function(){//me permite verificar si se puede avanzar al siguiente texto y si no que muestre todo el texto actual
	
	var siguiente=this.ReadText().next;
	this.texto.text='';
	this.textoSupport.text='';
	
	if(siguiente ==-1){//cuando ya no se quiera revisar mas se debe poner un -1 en la variable next
	//	console.log("TERMINE CON LOS TEXTOS");
		this.FinishText();
		return true;//significa que ya termino los textos
	}
	else{
		this.Textposition=siguiente;
		this.ShowText();
	}
	return false;//significa que aun hay etextos por revisar
	
};
Text.prototype.ShowText=function(){//me permite llamara a la funcion que mostrara el texto
	
	var textito=this.ReadText();	
	if(this.TYPE=="normal"){
		this.sourceText.text=textito.source;
		this.AddCharByChar(textito.text,0.4);
	}
	else{
		//console.log(textito);
		switch(this.TYPE){
			case "rep1": this.AddCharByChar(textito.resp1,0.9);break;
			case "rep2": this.AddCharByChar(textito.resp2,0.9);break;
			case "rep3": this.AddCharByChar(textito.resp3,0.9);break;
		}
		//this.AddCharByChar(textito,0.4);
	}
	
};
//Devuelve true o false dependiendo si el texto termino de escribirse
Text.prototype.TheTextIsFinish=function(){
	//console.log(this.TYPE);
	if(this.TYPE=="normal"){
		if(this.ReadText().text.length == this.texto.text.length -this.textExtrachar){
	//	console.log("Complete el texto en: "+this.TYPE);
		return true;
		}
	}
	else{
		var go;
		switch(this.TYPE){
			case "rep1": go=this.ReadText().resp1.length == this.texto.text.length -this.textExtrachar;break;
			case "rep2": go=this.ReadText().resp2.length == this.texto.text.length -this.textExtrachar;break;
			case "rep3":go=this.ReadText().resp3.length == this.texto.text.length -this.textExtrachar;break;
		}
	//	console.log(go)
		if(go){
			return true;
		}
	}
	/*if(this.TYPE=="normal"){
		if(this.ReadText().text.length == this.texto.text.length -this.textExtrachar){
			console.log("Es true para :"+this.TYPE);
			return true;
		}
	}
	else{
		var go;
		switch(this.TYPE){
			case "rep1": go=this.ReadText().resp1.length == this.texto.text.length -this.textExtrachar;
			case "rep2": go=this.ReadText().resp2.length == this.texto.text.length -this.textExtrachar;
			case "rep3":go=this.ReadText().resp3.length == this.texto.text.length -this.textExtrachar;
		}
		if(go){
			console.log("Es true para :"+this.TYPE);
			return true;
		}
	}*/
//	this.game.time.events.removeAll();//ESTO REMUEVE TODOS LOS EVENTOS DEL TIMER!!!!!!!!
	this.MyTimer.removeAll();
	this.texto.text='';
	this.texto.text= this.textoSupport.text;
	//console.log("Es false para :"+this.TYPE);
	return false;
}
Text.prototype.CheckText=function(remove){//me permite chequear cuanto se ha escrito del texto original
	//console.log(this.ReadText().text.length+ ' = '+(this.texto.text.length-this.textExtrachar));
	if(this.TYPE=="normal"){
		if(this.ReadText().text.length == this.texto.text.length -this.textExtrachar){
		//console.log("Complete el texto en: "+this.TYPE);
		this.NextText();
		return true;
		}
	}
	else{
		var go;
		switch(this.TYPE){
			case "rep1": go=this.ReadText().resp1.length == this.texto.text.length -this.textExtrachar;break;
			case "rep2": go=this.ReadText().resp2.length == this.texto.text.length -this.textExtrachar;break;
			case "rep3":go=this.ReadText().resp3.length == this.texto.text.length -this.textExtrachar;break;
		}
		//console.log(go)
		if(go){
			this.NextText();
			return true;
		}
	}
	if(remove){
		this.MyTimer.removeAll();
		//this.game.time.events.removeAll();//Bryan para un  futuro crea tus propios timers porque esto puede ser perjudicial a gran escala
	}
	
	this.texto.text='';
	this.texto.text= this.textoSupport.text;
	return false;

	
};
Text.prototype.GetNextWord=function(tex,position,total){//Me permite conseguir la siguiente palabra del texto

	//AVISO TODOS LOS TEXTOS DEBEN EMPEZAR CON UN ESPACIO EN EL JSON SI NO ESTO FALLARA
	var line=[];
	while(tex[position]!=undefined){
		if(tex[position]==' '){
			return line;
		}
		else{
			line.push(tex[position]);
			position++;
		}
	}
	return line;
	
};
Text.prototype.PushText=function(txt,time,texto){//me permite introducir los caracteres del texto
	var i;
	var txtLen= txt.length;
	var wordTimer=0;
	var esto=this;
	var SizeAcumulado=0;
	var totalTime=0;
	var sizecuadro=this.CuadroSize
	time=time/5;
	for (i = 0; i < txtLen; i++) // loop through each character of the custom text
    {  
    	this.MyTimer.add(Phaser.Timer.SECOND* totalTime,function(){
    		if(wordTimer==0){
        		var line=esto.GetNextWord(txt,this.i+1);
        		wordTimer=line.length+1;
        		if(line.length+SizeAcumulado>=sizecuadro){//AVISO EL VALOR DE 40 LUEGO DEBE SER REMPLAZADO POR EL VALOR DEL CUADRO EN EL QUE ESTA EL TEXTO
        			texto.text += this.txt[this.i];
        			texto.text+='\n ';
        			SizeAcumulado-=sizecuadro;
        		}
        		else{
        			texto.text += this.txt[this.i];
        		}
        	}
        	else{
        		texto.text += this.txt[this.i];// add the next character
        	}
        	SizeAcumulado++;//=this.texto.text.length;       	
        	wordTimer--;

    	},{texto: texto, txt: txt, i:i,esto:esto,wordTimer:wordTimer, SizeAcumulado: SizeAcumulado,sizecuadro:sizecuadro});
        /*this.game.time.events.add(Phaser.Timer.SECOND * totalTime, function() {//Bryan para un  futuro crea tus propios timers porque esto puede ser perjudicial a gran escala
        	if(wordTimer==0){
        		var line=esto.GetNextWord(txt,this.i+1);
        		wordTimer=line.length+1;
        		if(line.length+SizeAcumulado>=sizecuadro){//AVISO EL VALOR DE 40 LUEGO DEBE SER REMPLAZADO POR EL VALOR DEL CUADRO EN EL QUE ESTA EL TEXTO
        			texto.text += this.txt[this.i];
        			texto.text+='\n ';
        			SizeAcumulado-=sizecuadro;
        		}
        		else{
        			texto.text += this.txt[this.i];
        		}
        	}
        	else{
        		texto.text += this.txt[this.i];// add the next character
        	}
        	SizeAcumulado++;//=this.texto.text.length;
        	
        	wordTimer--;
        },{texto: texto, txt: txt, i:i,esto:esto,wordTimer:wordTimer, SizeAcumulado: SizeAcumulado,sizecuadro:sizecuadro});  // for scoping purposes*/
        totalTime += time;  // the next character will appear at this time
    }
    this.MyTimer.start();
    
};
Text.prototype.AddCharByChar=function(txt,time){//funcion que me permite agregar caracter por caracter
	
	this.textExtrachar=0;
	var extrachar=0;

	//ESTATE AL TANTO CON LOS TEXTOS SI ALGO FALLA TAL VEZ SEA ESTO
    extrachar=(Math.floor(txt.length/this.CuadroSize)*2);//me permite calcular la cantidad de  '\n ' en el texto (equivale un espacio) 
    

    this.PushText(txt,time,this.texto);
    this.PushText(txt,0.005,this.textoSupport);
    this.textExtrachar=extrachar;
 
}