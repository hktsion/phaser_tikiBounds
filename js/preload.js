var cnt = [
    " ",
    "Cargando PHASER ARCADE PHYSICS...",
    "Cargando STATES...",
    "Cargando WORLD... ",
    " "
];

var index = 0;
var ln = "";
var tx;
var arrancoMotores = false;

var preloadState = {
    preload: function () {
        this.game.stage.backgroundColor = "#42424e";
        this.game.load.audio('preloadFx', 'assets/audio/preloadFx.mp3');
        this.preloadFx = this.game.add.audio("preloadFx");
    },
    create: function () {
        this.tx = this.game.add.text(32, 550, '', {font: "30px Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2});
        this.nextLine();
    },
    updateLine: function () {
        if (ln.length < cnt[index].length) {
            ln = cnt[index].substr(0, ln.length + 1);
            // text.text = line;
            this.tx.setText(ln);
        } else {
            //  Wait 2 seconds then start a new line
            this.game.time.events.add(Phaser.Timer.SECOND * 1.2, this.nextLine, this);
        }
    },
    nextLine: function () {
        index++;
        if (index < cnt.length) {
            ln = '';
            this.game.time.events.repeat(80, cnt[index].length + 1, this.updateLine, this);
        } else {

            this.preloadFx.play();
            setTimeout(function () {
                this.game.state.start("intro");
            }, 2600);
        }
    }
};