function createWorld() {
    /*En esta función añádo todo lo referente a las cosas estáticas del juego,
     * fondo de pantalla, 
     * las 2 plataformas que hacen de suelo,
     * las palmeras,
     * el sprite que va con la tabla de surf,
     * la tabla de surf que hay que recoger al final,
     * la sombrilla.... 
     * y les doy las propiedades para que no les afecte la gravedad*/

    /*La cámara sigue al jugador en todo momento, de forma que el fondo
     * de pantalla del juego debe ir pegado también a la cámara*/
    game.add.sprite(0, 0, 'fondo');
    fondo = game.add.tileSprite(0, 0, 2048, 600, 'fondo');
    fondo.fixedToCamera = true;

    /*resto del mundo*/
    suelo1 = game.add.tileSprite(0, game.world.height - 45, 300, 45, 'suelo');
    suelo2 = game.add.tileSprite(780, game.world.height - 45, 800, 45, 'suelo');
    palm = game.add.image(40, 398, "palm");
    game.add.image(20, 398, "palm");
    game.add.image(-30, 398, "palm");
    game.add.image(950, 398, "palm");
    game.add.image(1000, 398, "palm");
    game.add.image(1020, 398, "palm");
    game.add.image(1500, 398, "palm");
    game.add.image(1530, 398, "palm");
    game.add.image(1007, 500, "rip");
    game.add.image(1265, 85, "umbrella");


    tiki1 = game.add.sprite(1225, 455, 'griton');
    game.add.image(1200, 468, "tsrf2");
    cofre = game.add.sprite(1840, 0, "cofre");
    cofre.scale.setTo(0.4, 0.4);
    cofre.angle += 10;

    game.physics.enable([suelo1, suelo2, this.tiki1, this.cofre], Phaser.Physics.ARCADE);

    /*suelos*/
    suelo1.enableBody = true;
    suelo1.body.immovable = true;
    suelo1.body.allowGravity = false;
    suelo2.enableBody = true;
    suelo2.body.immovable = true;
    suelo2.body.allowGravity = false;

    /*tiki*/
    this.tiki1.enableBody = true;
    this.tiki1.body.immovable = true;
    this.tiki1.body.allowGravity = false;

    /*tabla de surf OVERLAP*/
    this.cofre.enableBody = true;
    this.cofre.body.immovable = true;
    this.cofre.body.allowGravity = false;
}

function createPlayer() {
    /*Creo al jugador:
     *  seguido por la cámara en todo momento (linea 74)
     *  y añado las animaciones al sprite, dando posiciones
     *  para el movimiento lateral (izqda y dcha)*/

    this.player = this.game.add.sprite(90, 300, 'beta');
    this.player.scale.setTo(1.2, 1.2);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.allowGravity = 2000;
    this.player.body.collideWorldBounds = true;
    this.player.body.drag.setTo(this.DRAG, 0);

    this.game.camera.follow(this.player);

    this.player.body.setSize(20, 32, 5, 16);
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('turn', [4], 20, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
}
function createPlayerMovement() {
    /*añado esta función en el update del estado play
     * la velocidad del jugador es siempre nula, a menos 
     * que pulsemosl los cursores en una dirección, cuando 
     * el jugador queda quieto, queda con el frame 4, mirando
     * hacia nosotros*/
    this.player.body.velocity.x = 0;
    if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -135;
        if (this.facing != 'left') {
            this.player.animations.play('left');
            this.facing = 'left';
        }
    } else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = 135;
        if (this.facing != 'right') {
            this.player.animations.play('right');
            this.facing = 'right';
        }
    } else {
        this.player.frame = 4;
    }
    /*espacio para saltar*/
    if (this.salto.isDown && player.body.touching.down) {
        this.player.body.velocity.y = -217;
    }

    /*Combinación de teclas para llegar casi al final: 
     * Control + cursor arriba*/
    if ((this.control.isDown && this.cursors.up.isDown)) {
        setTimeout(function () {
            this.player.x = 1600;
            this.player.y = 20;
        }, 1500);
    }
}


function createAlien() {
    /*ESTA FUNCION NO VALE, ES PARA UNA MOVIDA QUE IBA A HACER
     * PERO NO HE TENIDO TIEMPO PARA NADA*/
    this.alien = this.game.add.sprite(1050, 146, 'alien');
    this.game.physics.enable(this.alien, Phaser.Physics.ARCADE);
    this.alien.anchor.setTo(0.5, 0.5);
    this.alien.scale.setTo(0.4, 0.4);
    this.alien.anchor.setTo(0.5, 0.5);
    this.alien.enableBody = true;
    this.alien.body.immovable = true;
    this.alien.body.allowGravity = false;
}


function createBlocks() {
    /*La función crea los bloques(plataformas flotantes), tanto los fijos, como los que tienen
     * movimiento.
     * En el script "arrays" se encuentra el array MBX, el array tiene 5 posiciones:
     * pos1: valor para la posición en X
     * pos2: valor para la posición en Y.
     * pos1 y pos2 determinan la posición inicial del bloque.
     * pos3: determina el desplazamiento en el ejeX si el bloque va a tener movimiento. (Si el bloque es fijo, su valor es null).
     * pos4: desplazamiento en el ejeY (si el bloque va a ser fijo, el valor es null)
     * pos5: tiempo de desplazamiento del bloque que tiene movimiento.
     */
    var worldX, worldY, posX, posY, time, i;

    /*En el bucle, añado los bloques en el juego como un grupo,
     *  su posición original será posX = pos1 y posY = pos2*/
    /*A todos los bloques les añado el "tween", en los bloques
     * fijos, voy a sustituir los valores null, por las posiciones
     * de los bloques al inicio, de forma que el "tween" no tendrá
     * resultado alguno, es decir, el bloque no se moverá.
     * En los bloques con movimiento, utilizo todas las posiciones del 
     * array, esta vez no hay valores nulos, con lo que el "tween" se llevará
     * a cabo.*/
    for (i = 0; i < mbx.length; i++) {
        posX = mbx[i][2];
        posY = mbx[i][3];
        time = mbx[i][4];
        worldX = mbx[i][0];
        worldY = mbx[i][1];
        block = this.game.add.sprite(worldX, worldY, 'bloque');
        this.game.physics.enable(block, Phaser.Physics.ARCADE);
        block.body.allowGravity = false;
        block.body.immovable = true;
        grupoBloques.add(block);
        (posX === null) ? posX = worldX : posX;
        posY = (posY === null) ? posY = worldY : posY;
        tween = this.game.add.tween(block).to({x: posX, y: posY}, time, Phaser.Easing.Quadratic.InOut, true, 2, 1000, true);
    }
}

function createTiki() {
    /*sólamente hace quye el tiki se mueva al cruzarse con el "cebolino"*/
    this.tiki1.animations.add('scream', [0, 1, 2], 7, true);
}
function animeTiki() {
    /*la animación del tiki cuando entra en "overlap" con el jugador*/
    if (checkOverlap(player, this.tiki1)) {
        this.tiki1.animations.play("scream");
    } else {
        this.tiki1.frame = 0;
    }
}
function checkOverlap(spriteA, spriteB) {
    /*esta función chequea el overlap sin utilizar funciones de phaser*/
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function createMonsters() {
    /*NO VALE PARA NADA, ERAN MOVIDAS QUE NO ME DAN TIEMPO*/
    this.monster = this.game.add.sprite(89, 90, "monster");
    this.monster.scale.setTo(0.7, 0.7);
    this.game.physics.enable(this.monster, Phaser.Physics.ARCADE);
    this.monster.body.allowGravity = false;
    this.monster.animations.add('volar', [0, 1, 2], 10, true);
}
function animeMonster() {
    /*NO VALE PARA NADA, ERAN MOVIDAS QUE NO ME DAN TIEMPO*/
    this.monster.animations.play("volar");
    this.monster.x += 0.5;

}

function createCoins() {
    /*La función utiliza el array del script "arrays>>mnds"
     * añade el sprite y la animación para que las monedas giren*/
    var wx, wy, i;
    for (i = 0; i < mnds.length; i++) {
        wx = mnds[i][0];
        wy = mnds[i][1]
        coin = this.game.add.sprite(wx, wy, 'coin', 0);
        this.game.physics.enable(coin, Phaser.Physics.ARCADE);
        coin.body.allowGravity = false;
        coin.body.immovable = true;
        grupoCoins.add(coin);
        grupoCoins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 9, true);
        grupoCoins.callAll('animations.play', 'animations', 'spin');
    }
}
function collectCoins(player, coin) {
    /*Cada vez que el "cebollino" regoge una moneda:
     * 1-. se activa el sonido "clinck" de recogerlas
     * 2-. la moneda desaparece
     * 3- el marcador se incrementa en 10 puntos
     * 4- mostramos el marcador con esos 10 puntos más;*/
    recogeMonedas.play();
    coin.kill();
    score += 10;
    scoreText.text = 'Puntos: ' + score;
}

function createScore() {
    /*La función crea el marcador, 
     * 1- string del marcador
     * 2-el marcador simepre fijo en la pantalla*/
    scoreText = game.add.text(5, 0, 'Puntos: ' + score, {fontSize: '32px Arial Black', fill: '#fff'});
    scoreText.fixedToCamera = true;
    scoreText.stroke = '#42424e';
    scoreText.strokeThickness = 7;
    scoreText.fill = 'floralwhite';
}

function formatoTiempo(s) {
    /*Tiempo (string) formateado en minutos y segundos*/
    var minutes = "0" + Math.floor(s / 60);
    var seconds = "0" + (s - minutes * 60);
    return "Tiempo: " + minutes.substr(-2) + ":" + seconds.substr(-2);
}

function gameOver() {
    /*cuando el jugador cae al agua, o se acaba el tiempo, se activa esta función
     * aparece el texto en grande de GAME OVER
     * junto con el tanteo de monedas que se han recogido,
     * en el juego desaparecen también el resto de monedas --> chorrada*/
    var gameOver = this.game.add.text(400, 150, "GAME OVER", {font: '80px Arial Black', fill: '#ff99c2', stroke: '#42424e', strokeThickness: 7});
    gameOver.anchor.x = 0.5;
    gameOver.fixedToCamera = true;
    var monedasRecogidas = this.game.add.text(430, 300, " x 10 = " + score + " monedas", {font: '30px Arial Black', fill: '#fff', stroke: '#42424e', strokeThickness: 5});
    monedasRecogidas.anchor.setTo(0.5, 0.5);
    monedasRecogidas.fixedToCamera = true;
    var coinImg = this.game.add.sprite(225, 300, "coin", 0);
    coinImg.scale.setTo(2, 2);
    coinImg.anchor.setTo(.5, .5);
    coinImg.fixedToCamera = true;
    grupoCoins.destroy();
    vuelvoDeJuego = true;

}
function creditosFin() {
    /*NO VALE PARA NADA, ERAN MOVIDAS QUE NO ME DAN TIEMPO*/
    this.game.state.start("creditos");

}

function cargaJSON() {
    if (peticionAjax != false) {
        peticionAjax.onreadystatechange = function () {
            if (peticionAjax.readyState == 4) {
                if (peticionAjax.status == 200) {
                    miJson = JSON.parse(peticionAjax.responseText);
                    /*alert(miJson[0].nombre);*/
                    /*El Json si que lo carga*/
                }
            }
        }
        peticionAjax.open("GET", "puntuaciones.json?nocache=" + Math.random(), true);
        peticionAjax.send(null);
    } else {
        alert("Error en el servidor");
    }
}


function subeScore() {
    do {
        usuario = prompt("Introduce tu nombre de usuario\ máximo 3 caracteres");
    } while (usuario.length !== 3);
    usuario = usuario.toUpperCase();
    miJSon.push({nombre: usuario, puntuacion: score});

}



