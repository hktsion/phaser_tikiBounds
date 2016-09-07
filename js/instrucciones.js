var estiloMenu = {fontSize: '12px Arial Black', fill: '#ffffff', stroke: '#42424e', strokeThickness: 7, align: "center"};

var instruccionesState = {
    init: function () {
        this.background = this.game.add.sprite(0, 0, 'fondoMenu');

        /*Botón para volver al menú principal*/
        this.volverbtn = this.game.add.button(700, 550, 'flechaVolver', this.volver, this, 1, 0);
        this.volverbtn.anchor.setTo(0.5, 0.5);
        this.volverbtn.scale.setTo(0.9, 0.9);

        this.nbGame = this.game.add.image(400, 50, 'instrucciones');
        this.nbGame.anchor.setTo(0.5, 0.5);
        this.game.add.tween(this.nbGame).to({y: 60}, 1000, Phaser.Easing.Quadratic.InOut, true, 2, 1000, true);

        this.arrowLeft = [this.game.add.image(285, 420, "arrowLeft"), this.game.add.text(460, 420, "Mover  a la izquierda", estiloMenu)];
        for (var i = 0; i < this.arrowLeft.length; i++) {
            this.arrowLeft[i].anchor.set(0.5, 0.5);
        }
        this.arrowLeft[0].scale.setTo(0.5, 0.5);

        this.arrowRight = [this.game.add.image(290, 470, "arrowRight"), this.game.add.text(460, 470, "Mover  a la derecha", estiloMenu)];
        for (var i = 0; i < this.arrowRight.length; i++) {
            this.arrowRight[i].anchor.set(0.5, 0.5);
        }
        this.arrowRight[0].scale.setTo(0.5, 0.5);


        this.spacebar = this.game.add.image(260, 510, "spacebar");
        this.spacebar.scale.setTo(0.7, 0.7);
        this.spacebarTxt = this.game.add.text(490, 530, "Saltar", estiloMenu);


    },
    preload: function () {
        this.text = this.game.add.text(400, 250, "Te han robado tu tabla y debes recuperarla.\n Alguien la ha visto al final de la playa, \npor el camino encontrarás dificultades.\nCoge el máximo número de monedas y recupera tu tabla, \nquizás más adelante puedas cambiar los puntos \npor mejoras en tu tabla \nTen cuidado, el tiempo vuela", estiloMenu);
        this.text.anchor.setTo(0.5, 0.5);
        this.text.align = "center";

    },
    volver: function () {
        this.game.state.start("menu");
        vuelvoDeJuego = false;

    }
};




