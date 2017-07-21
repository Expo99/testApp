Preloader = function(game){
	Global={WIDTH:800,HEIGHT:400};
}
Preloader.prototype = {
	preload:function(){
		this.load.image('text_box','Assets/text_box.png');
		this.load.image('mothership','Assets/mothership.png');
		this.load.image('space','Assets/space.png');
		this.load.image('button_placeholder','Assets/button_placeholder.png');
		this.load.image('lifebar_block','Assets/lifebar_block.png');
		this.load.image('bk1','Assets/fondo1.png');
		this.load.image('player','Assets/jugador.png');
		this.load.image('bala_jugador','Assets/balaJugador.png');
		this.load.image('beam','Assets/beam.png');
	},
	create:function(){
		this.state.start('Game');
	}
}