var gaviotas2;

var entreTantoState = {
    preload: function () {
        this.game.stage.backgroundColor = "#42424e";
        this.game.load.audio('gaviotas', 'assets/audio/gaviotas.mp3');
        gaviotas2 = this.game.add.audio("gaviotas");
        gaviotas2.play();
        setTimeout(function(){this.game.state.start("intro2");}, 1200);
    }

};
