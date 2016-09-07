<?php
	//creamos un array recogiendo los datos del formulario que vienen por GET.
	$score = (int) $_GET['score'];
	$nueva_puntuacion = array(
	      'usuario'=> $_GET['usuario'],
	      'puntuacion'=> $score
	  );

	//echo "Usuario: ".$_GET['usuario'].'   Puntuacion: '.$_GET['score'];
	$puntuacionRep = false;

	$archivojson = file_get_contents("puntuaciones.json");//Sacamos la información del fichero JSON y la guardamos en una variable
	$datos = json_decode($archivojson,true);//Decodificamos el JSON, y lo convertimos en un array PHP
	
	foreach ($datos as $usu) {
		if ($usu['usuario'] == $_GET['usuario'] && $usu['puntuacion'] == $score){
			$puntuacionRep = true;
		} else {

		}
	}

	if ($puntuacionRep){

	} else {
			array_push($datos, $nueva_puntuacion);//Y hacemos un push del array creado con los datos que nos vienen del GET, para añadirlo
			//al array PHP del archivo JSON original

			
			
			//var_dump($datos);

			function ordena($a, $b) {
		    	$dA = (int) $a['puntuacion'];
		    	$dB = (int) $b['puntuacion'];

		    return $dB - $dA;
		}

			$arr = $datos;
			usort($arr, 'ordena');
			
			//echo '<br><br>';

			//var_dump($arr);
			
			//Volvemos a codificar el array PHP a JSON.(JSON_PRETTY_PRINT es para mejorar la legibilidad)
			$guardaJSONFile = json_encode($arr, JSON_PRETTY_PRINT);
			   
			   //Escribe los datos JSON en usuarios.json
			   if(file_put_contents("puntuaciones.json", $guardaJSONFile)) {
			        echo 'Puntuacion creada con éxito'; 
			    } else {
			        echo "Error al crear la puntuacion";
				}
	}
?>