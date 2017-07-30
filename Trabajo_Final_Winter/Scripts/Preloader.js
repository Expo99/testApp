Preloader = function(game){
	Global={WIDTH:800,HEIGHT:500};
}
Preloader.prototype = {
	preload:function(){
		this.load.image('text_box','Assets/text_box.png');
		this.load.image('mothership','Assets/mothership.png');
		this.load.image('space','Assets/space.png');
		this.load.image('button_placeholder','Assets/button_placeholder.png');
		this.load.image('tab_placeholder','Assets/tab_placeholder.png');
		this.load.image('lifebar_block','Assets/lifebar_block.png');
		this.load.image('bk1','Assets/fondo1.png');
		this.load.image('player','Assets/jugador.png');
		this.load.image('bala_jugador','Assets/balaJugador.png');
		this.load.image('beam','Assets/beam.png');
		this.load.image('enemy_bullet','Assets/enemy-bullet.png');
		this.load.image('enemigo1','Assets/enemigo1.png');
		this.load.image('dedo','Assets/dedo.png');
		this.load.image('close','Assets/close.png');
		this.load.image('material1','Assets/material1.png');
		this.load.image('material2','Assets/material2.png');
		this.load.image('material3','Assets/material3.png');
		this.load.image('coin','Assets/dinero.png');
		this.load.image('star','Assets/star.png');
		this.load.image('AD','Assets/AD.png');

		this.load.json('level1','Data/level1.json');
		this.load.json('tutorials','Data/tutorials.json');
	},
	create:function(){
		this.state.start('Game',true,false,1);
	}
}