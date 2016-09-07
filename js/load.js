var cursors, control, salto;
var tiki1, palm, coin, cofre;
var grupoBloques, grupoChilis, grupoCoins;
/*marcador*/
var scoreText;
var score = 0;
/*tiempo*/
var timer, cuentaAtras;
var vuelvoDeJuego = true;
var musica;
var mute;
/*Variables para el ranking*/
var miJson;
var usuario;


var estilo = {fontSize: '32px Arial Black', fill: '#ffffff', stroke: '#42424e', strokeThickness: 7, align: "center"};
var recogeMonedas;

var loadState = {
    init: function () {
        if (jbGood) {
            jbGood.stop();
        }
    },
    preload: function () {
        /*musica*/
        this.game.load.audio('menuMusic', 'assets/audio/menuSong.mp3');
        this.game.load.audio('pixies', 'assets/audio/pixies.mp3');
        this.game.load.audio('recogeMonedas', 'assets/audio/coinSound.mp3'); /*recoger monedas*/

        /*menu*/
        this.game.load.image('nbGame', 'assets/img/menu/gameName.png'); /*nombre del juego*/
        this.game.load.image('instrucciones', 'assets/img/menu/instrucciones_logo.png');
        this.game.load.image('fondoMenu', 'assets/img/menu/menuMap2.jpg');
        this.game.load.spritesheet('botonJuega', 'assets/img/menu/sprite_boton_juega.png', 241, 62);
        this.game.load.spritesheet('botonInstrucc', 'assets/img/menu/sprite_boton_instr.png', 241, 62);
        this.game.load.spritesheet('botonRank', 'assets/img/menu/sprite_boton_rank.png', 241, 62);
        this.game.load.spritesheet('mute', 'assets/img/menu/mute.png', 70, 70);
        this.game.load.spritesheet('flechaVolver', 'assets/img/menu/volver.png', 137, 112);
        this.game.load.image("arrowLeft", "assets/img/menu/arrowLeft.png");
        this.game.load.image("arrowRight", "assets/img/menu/arrowRight.png");
        this.game.load.image("spacebar", "assets/img/menu/spacebar.png");

        /*ranking*/
        this.game.load.image("top20", "assets/img/ranking/top20.png");
        this.game.load.spritesheet("enviar", "assets/img/ranking/sprite_enviar.png", 20, 30);
        this.game.load.json("top", "puntuaciones.json");
        this.game.load.audio("pixies", "assets/audio/pixies.mp3");

        /*world*/
        this.game.load.image('fondo', 'assets/img/world/fondo.png');
        this.game.load.image('cofre', 'assets/img/world/s-318604.png');
        this.game.load.image('tsrf2', 'assets/img/world/surf-tabla02.png');

        /*monster*/
        this.game.load.spritesheet("monster", "assets/img/monster.png", 104, 90);

        /*créditos*/
        this.game.load.image("alien", "assets/img/creditos/phaser-alien.png");
        this.game.load.image("creditos", "assets/img/creditos/creditos.png");

        /*antiguo*/
        game.load.image('fireball', 'assets/fireball.png', 40, 30);
        game.load.image('estrella', 'assets/estrella.png');
        game.load.image('bloque', 'assets/bloque.png');
        game.load.spritesheet('suelo', 'assets/2048x48-suelo.png', 1920, 45);
        game.load.spritesheet('beta', 'assets/beta.png', 32, 48);
        game.world.setBounds(0, 0, 1920, 600);
        game.load.image('palm', 'assets/palmera.png');
        game.load.image('rip', 'assets/rip.png');
        game.load.image('umbrella', 'assets/umbrella2.png');
        game.load.spritesheet('griton', 'assets/screamingPillar.png', 44, 100);
        game.load.spritesheet('coin', 'assets/coin.png', 32, 32);

        cargaJSON();
    },
    create: function () {
        cursors = game.input.keyboard.createCursorKeys();
        control = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
        salto = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },
    update: function () {
        if (miJson) {
            //game.state.start("play");
            game.state.start("menu");
        }
    }
};



