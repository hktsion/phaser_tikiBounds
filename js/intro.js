

var introState = {
    preload: function () {
        this.game.load.image("introFondo", "assets/img/intro/introFondo.jpg");
        this.game.load.image('tabla', 'assets/img/world/s-318604.png');
        this.game.load.spritesheet('beta', 'assets/beta.png', 32, 48);
        this.game.load.audio('gaviotas', 'assets/audio/gaviotas.mp3');
    },
    create: function () {
        this.gaviotas = this.game.add.audio("gaviotas");
        this.gaviotas.play();
        this.game.add.image(0, 0, "introFondo");
        this.tx = this.game.add.text(400, 80, 'En algún lugar \nde Hawaii...', {font: "40px Courier", fill: "#ffffff", stroke: "#000000", strokeThickness: 6});
        this.tx.anchor.setTo(0.5, 0.5);
        this.tabla = this.game.add.image(400, 480, "tabla");
        this.tabla.anchor.setTo(0.5, 0.5);
        this.tabla.angle = +20;

        this.tikiBounds = this.game.add.sprite(320, 500, "beta", 4);
        this.tikiBounds.anchor.setTo(0.5, 0.5);
        this.tikiBounds.scale.setTo(2, 2);
        this.game.physics.enable(this.tikiBounds, Phaser.Physics.ARCADE);
        this.tikiBounds.animations.add('left', [0, 1, 2, 3], 10, true);
        this.tikiBounds.animations.add('turn', [4], 20, true);
        this.tikiBounds.animations.add('right', [5, 6, 7, 8], 10, true);

    },
    update: function () {
        this.tikiBounds.animations.play("left");
        this.tikiBounds.x += -1;
        if (this.tikiBounds.x < -100) {
            this.game.state.start("entreTanto");

        }

    }
};


