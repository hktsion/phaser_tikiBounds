var playState = {
    preload: function () {
        /*sonido cada vez que se recoge una moneda*/
        recogeMonedas = this.game.add.audio("recogeMonedas");
    },
    create: function () {
        this.game.physics.arcade.gravity.y = 420;

        /*todas las funciones están en el script funciones*/

        createWorld();

        /* TIEMPO  para completar el juego*/
        timer = this.game.time.create();
        /*Al acabar el tiempo, se ejecuta la función endTImer --> EXPLICADO AL FINAL DE ÉSTE SCRIPT*/
        timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.endTimer, this);
        timer.start();/*Comienza el tiempo*/
        cuentaAtras = this.game.add.text(0, 0, this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), {fontSize: '55px', fill: '#fff'});

        /*tiki con la tabla, al pasar activa el sprite*/
        createTiki();
        /*creación de todos los bloques del juego, con/sin movimiento*/
        grupoBloques = game.add.group();
        createBlocks();
        /*creación de monedas*/
        grupoCoins = game.add.group();
        createCoins();
        /*marcador*/
		score =0;
        createScore();
        /*jugador*/
        createPlayer();
    },
    update: function () {
        this.game.physics.arcade.collide(player, [suelo1, suelo2, grupoBloques]);
        /*COLLIDE --> hace que el jugador pueda tener contacto físico con los elementos
         * los suelos son las plataformas de abajo y el grupo de bloque son todas las cajas,
         * también debe recoger las monedas, con lo que el jugador tiene que tener
         * contacto con ellas*/
        
        /*OVERLAP --> Es otro tipo de contacto "no visible" pero que conlleva alguna 
         * acción. El overlap entre el player y las monedas, conlleva que se ejecute la
         * función collectcoins, donde aumenta el marcador, se oye sonido de recoger
         * monedas... --> EXPLICADO EN FUNCIONES.JS*/
        this.game.physics.arcade.overlap(player, grupoCoins, collectCoins, null, this);
        /*Llamo cofre a la tabla de surf que hay al final de la pantalla, que es el fin del 
         * juego, el overlap entre el jugador y este "cofre" (xq en ppio recogía un cofre..
         * conlleva que se ejecute la función NEXTLEVEL --> EXPLICADO AL FINAL DE ESTE SCRIPT)*/
        this.game.physics.arcade.overlap(player, cofre, this.nextLevel, null, this);

        /*Hace que cuando el jugador entre en ovelap con el tiki, se active el sprite del TIki
         * EXPLICADO EN FUNCIONES.JS */
        animeTiki();


        /*creo el movimiento del jugador --> EXPLICADO EN FUNCIONES.JS*/
        createPlayerMovement();

        /*cuando el "repollo" cae al agua muere, elimino el tiempo y salen las letras de gameOver*/
        if (player.body.onFloor()) {
            player.kill();
            cuentaAtras.destroy();
            setTimeout(function () {
                gameOver();
            }, 500);

            /*comienzo del juego sin la intro*/
            setTimeout(function () {
                this.game.state.start("load");
            }, 2000);
        }
    },
    render: function () {
        if (timer.running) {
            cuentaAtras.destroy();
            cuentaAtras = this.game.add.text(5, 28, this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), estilo);
            cuentaAtras.fixedToCamera = true;
        } else {
            /*Al ababar el tiempo --> la cuenta atrás se sustituye por tiempo agotado*/
            player.animations.stop(null, true);
            setTimeout(function () {
                cuentaAtras.text = 'Tiempo agotado';
            }, 100);
            /*letras de game over y me salto la intro para empezar otra vez*/
            /*la función GAMEOVER() está explicada en FUNCIONES.JS*/
            gameOver();
            vuelvoDeJuego = true; /*esto ya te sonará*/
            setTimeout(function () {
                /*Al acabar el tiempo, me vuelvo al state load*/
                this.game.state.start("load");
            }, 1400);
        }
    },
    endTimer: function () {
        timer.stop();
        setTimeout(function () {
            player.kill();
        }, 100);
    },
    formatTime: function (s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return "Tiempo: " + minutes.substr(-2) + ":" + seconds.substr(-2);
    },
    nextLevel: function () {
        /*si el "repollo" alcanza la tabla, FELICDADES CHAVAL, PALMADITA EN LA ESPALDA Y  VUELTA AL MENÚ*/
            this.game.state.start("win");

    }

};


