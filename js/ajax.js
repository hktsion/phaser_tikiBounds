function crearObjetoAjax(){
	var peticionAjax;
	try {
		peticionAjax = new XMLHttpRequest();			
	} catch (e){
		try {
			peticionAjax = new ActiveXObject('MSXML2.XMLHTTP.3.0');
		} catch (e) {
			try {
				peticionAjax = new ActiveXObject('Microsoft.XMLHTTP');
			} catch(e) {
				return false;
			}				
		}		
	}
	return peticionAjax;
}

var peticionAjax = crearObjetoAjax();

function subeScore(){
	usuario = prompt("Escribe tu usuario (3 caracteres):");
	while (usuario.length != 3){
		usuario = prompt("Escribe tu usuario (3 caracteres):");
	}
	usuario = usuario.toUpperCase();
	
		if (peticionAjax != false){
			peticionAjax.onreadystatechange = function(){
					if (peticionAjax.readyState == 4){
						if (peticionAjax.status == 200){
							alert(peticionAjax.responseText);	
						}
					}
				}
			
			peticionAjax.open("GET", "nuevoScore.php?usuario=" + usuario +"&score=" + score +'&'+Math.random() , true);
			peticionAjax.send();
			
		} else {
			alert("Error en el servidor");
		}
}

