var winState = {
    preload: function () {
        this.pixies = this.game.add.audio("pixies");
        this.pixies.play();
        this.background = this.game.add.image(0, 0, 'fondoMenu');
        this.text = this.game.add.text(400, 150, "ENHORABUENA", {font: '80px Arial Black', fill: '#00FF40', stroke: '#42424e', strokeThickness: 7});
        this.text2 = this.game.add.text(400, 230, "Has conseguido recuperar tu tabla", {font: '34px Arial Black', fill: '#00FF40', stroke: '#42424e', strokeThickness: 7});
        this.text3 = this.game.add.text(400, 270, "Puntos: " + score, {font: '34px Arial Black', fill: '#00FF40', stroke: '#42424e', strokeThickness: 7});
        this.text.anchor.setTo(0.5, 0.5);
        this.text2.anchor.setTo(0.5, 0.5);
        this.text3.anchor.setTo(0.5, 0.5);
		
        this.volverbtn = this.game.add.button(725, 540, 'flechaVolver', this.volver, this, 1, 0);
        this.volverbtn.anchor.setTo(0.5, 0.5);

    },
    create: function () {
        setTimeout(function () {
            subeScore();
        }, 2000);
        /*setTimeout(function () {
            this.game.state.start("load");
            vuelvoDeJuego = true;
        }, 4000);*/
    },
    volver: function () {
        this.game.state.start("load");
        this.pixies.stop();
        vuelvoDeJuego = true;

    }
};

