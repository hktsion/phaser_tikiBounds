var jbGood;

var intro2State = {
    preload: function () {
        this.game.load.image("introFondo", "assets/img/intro/introFondo.jpg");
        this.game.load.spritesheet('beta', 'assets/beta.png', 32, 48);
        this.game.load.audio('introSong', 'assets/audio/introSong.mp3');
        setTimeout(function () {
            gaviotas2.stop();/*paro el sonido para que comience JhonnyBGood*/
        }, 1500);
    },
    create: function () {
        this.game.add.image(0, 0, "introFondo");
        setTimeout(function () {
            jbGood = this.game.add.audio("introSong");
            jbGood.play();
        }, 2000);
        this.vuelta = this.game.add.sprite(-300, 500, "beta", 4);
        this.vuelta.anchor.setTo(0.5, 0.5);
        this.vuelta.scale.setTo(2, 2);
        this.game.physics.enable(this.vuelta, Phaser.Physics.ARCADE);
        setTimeout(function () {
            this.text = this.game.add.text(500, 140, 'Malditos!!!!... \nme han robado mi tabla\n SURFEA o MUERE!!!', {font: "40px Courier", fill: "#ffffff", stroke: "#000000", strokeThickness: 6});
            this.text.anchor.setTo(0.5, 0.5);
        }, 1500);

        this.vuelta.animations.add('right', [5, 6, 7, 8], 10, true);
        setTimeout(function () {
            this.game.state.start("load");
        }, 10000);
    },
    update: function () {
        this.vuelta.animations.play("right");
        this.vuelta.x += 2.3;
    }
};

