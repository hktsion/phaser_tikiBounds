var menuState = {
    init: function () {
        /*Init: http://phaser.io/docs/2.3.0/Phaser.State.html#init*/
        /*Vuelvo de juego es true cuando inicamos --> variable en load.js*/
        if (vuelvoDeJuego) {
            musica = this.game.add.audio("menuMusic");
            musica.play();
        }
    },
    preload: function () {
        this.background = this.game.add.image(0, 0, 'fondoMenu');
        this.nbGame = this.game.add.image(400, 100, 'nbGame');
        this.nbGame.anchor.setTo(0.5, 0.5);
        this.game.add.tween(this.nbGame).to({y: 90}, 1000, Phaser.Easing.Quadratic.InOut, true, 2, 1000, true);
        /*Botones del menú*/
        var jugarBtn = this.game.add.button(150, 440, 'botonJuega', this.jugar, this, 1, 0);
        jugarBtn.anchor.setTo(0.5, 0.5);
        this.inst = this.game.add.button(400, 440, 'botonInstrucc', this.instrucciones, this, 1, 0);
        this.inst.anchor.setTo(0.5, 0.5);
        this.rank = this.game.add.button(650, 440, 'botonRank', this.ranking, this, 1, 0);
        this.rank.anchor.setTo(0.5, 0.5);
        /*Botón para silenciar el audio*/
        mute = this.game.add.button(25, 570, "mute", this.audio, this);
        mute.scale.setTo(0.5, 0.5);
        mute.anchor.setTo(0.5, 0.5);
    },
    create: function () {

    },
    jugar: function () {
        musica.stop();
        setTimeout(function () {
            this.game.state.start("play");
        }, 2000);
    },
    instrucciones: function () {
        this.game.state.start("instrucciones");
        volverdejuego = false;
    },
    ranking: function () {
        this.game.state.start("ranking");
    },
    audio: function () {
        /*la función evalúa si el audio está sonando y al hacer click en el botón cambia al mute o audio*/
        if (mute.frame == 0) {
            mute.frame = 1;
            musica.pause();
            reproduciendo = false;
        } else {
            mute.frame = 0;
            musica.resume();
            reproduciendo = true;
        }

    }
};
