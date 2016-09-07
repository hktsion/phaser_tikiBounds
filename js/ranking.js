/*variables globales*/
var phaserJSON;
var tablaTop1A, tablaTop1B, tablaTop2A, tablaTop2B;
var rankingState = {
    init: function () {
        phaserJSON = this.game.cache.getJSON("top");
    },
    preload: function () {
        this.background = this.game.add.image(0, 0, 'fondoMenu');
        this.nbGame = this.game.add.image(400, 60, 'top20');
        this.nbGame.anchor.setTo(0.5, 0.5);
        this.game.add.tween(this.nbGame).to({y: 70}, 1000, Phaser.Easing.Quadratic.InOut, true, 2, 1000, true);
        /*Botón para volver al menú principal*/
        this.volverbtn = this.game.add.button(700, 550, 'flechaVolver', this.volver, this, 1, 0);
        this.volverbtn.anchor.setTo(0.5, 0.5);
        this.volverbtn.scale.setTo(0.9, 0.9);

        tablaTop1A = this.game.add.text(180, 140,
                "1           " + phaserJSON[0].usuario + "\n" +
                "2           " + phaserJSON[1].usuario + "\n" +
                "3           " + phaserJSON[2].usuario + "\n" +
                "4           " + phaserJSON[3].usuario + "\n" +
                "5           " + phaserJSON[4].usuario + "\n" +
                "6           " + phaserJSON[5].usuario + "\n" +
                "7           " + phaserJSON[6].usuario + "\n" +
                "8           " + phaserJSON[8].usuario + "\n" +
                "9           " + phaserJSON[9].usuario + "\n" +
                "10         " + phaserJSON[10].usuario + "\n", {fontSize: "23px", fill: "white"});
        tablaTop1A.stroke = "#000000";
        tablaTop1A.strokeThickness = 6;
        tablaTop1A.setShadow(3, 3, "rgba(0,0,0,0.5)", 3);

        tablaTop1B = this.game.add.text(550, 140,
                phaserJSON[0].puntuacion + "\n" +
                phaserJSON[1].puntuacion + "\n" +
                phaserJSON[2].puntuacion + "\n" +
                phaserJSON[3].puntuacion + "\n" +
                phaserJSON[4].puntuacion + "\n" +
                phaserJSON[5].puntuacion + "\n" +
                phaserJSON[6].puntuacion + "\n" +
                phaserJSON[8].puntuacion + "\n" +
                phaserJSON[9].puntuacion + "\n" +
                phaserJSON[10].puntuacion + "\n", {fontSize: "23px", fill: "white"});
        tablaTop1B.stroke = "#000000";
        tablaTop1B.strokeThickness = 6;
        tablaTop1B.setShadow(3, 3, "rgba(0,0,0,0.5)", 3);

    },
    create: function () {

    },
    volver: function () {
        vuelvoDeJuego = false;
        this.game.state.start("menu");
    }
};



