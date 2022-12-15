Lista_usuarios = new Lista_simple();
Lista_artistas = new Lista_simple();
Musica_programada = new Matriz_dispersa();
Arbol_podcast = new Arbol_binario();

primer_usuario = new Usuario("3023673810101","david","dave965",sha256("12345"),"55646028",true);
Lista_usuarios.poner(primer_usuario);

let current = 'paginaEntrar';
let current_admin = 'Admin_graphs';
let current_us = 'us_musica';
var en_sesion = primer_usuario;

// funcion de botones

function acceso(){
	var username = document.getElementById('login-nombre');
	var pass = document.getElementById('login-pass');
	var admin = document.getElementById('login-admin');
	encontrado = Lista_usuarios.buscar_usuario(username.value,sha256(pass.value));

	username.value = "";
	pass.value = "";

	if(encontrado == 0){
		alert("usuario no encontrado");
		return 0;
	}

	en_sesion = encontrado;

	if(admin.checked && encontrado.admin == true){
		alert("entrando administrador");
		cambiar_pagina("mainAdmin");
	}
	else{
		alert("entrando usuario normal");
		cambiar_pagina("mainUsuarios");
	}
}

function registro(){
	var dpi = document.getElementById("registro_dpi");
	var name = document.getElementById("registro_name");
	var username = document.getElementById("registro_username");
	var password = document.getElementById("registro_password");
	var phone = document.getElementById("registro_phone");

	encript = sha256(password.value);

	let nuevo_us = new Usuario(dpi.value,name.value,username.value,encript,phone.value,false);
	Lista_usuarios.poner(nuevo_us)

	dpi.value = "";
	name.value = "";
	username.value = "";
	password.value = "";
	phone.value = "";

	alert("usuario creado")
	cambiar_pagina("paginaEntrar");
}

function carga_masivo_us(){
	var txt_area = document.getElementById("txt_mass_us");
	var all_users = JSON.parse(txt_area.value);
	
	for (var i=0;i<all_users.length;i++){
		dpi = all_users[i].dpi;
		name = all_users[i].name;
		username = all_users[i].username;
		password = sha256(all_users[i].password);
		phone = all_users[i].phone;
		admin = all_users[i].admin;
		nuevo_us = new Usuario(dpi,name,username,password,phone,admin);
		Lista_usuarios.poner(nuevo_us);
	}

	txt_area.value = "";
}

function carga_masivo_podcast(){
	var txt_area = document.getElementById("txt_mass_pod");
	var all_pod = JSON.parse(txt_area.value);
	
	for (var i=0;i<all_pod.length;i++){
		topic = all_pod[i].topic;
		name = all_pod[i].name;
		guests = all_pod[i].guests;
		duration = all_pod[i].duration;
		nuevo_pod = new podcast(name, topic, guests, duration)
		Arbol_podcast.poner(nuevo_pod);
	}

	txt_area.value = "";
}

function carga_masivo_art(){
	var txt_area = document.getElementById("txt_mass_art");
	var all_art = JSON.parse(txt_area.value);
	
	for (var i=0;i<all_art.length;i++){
		nombre = all_art[i].name;
		edad = all_art[i].age;
		pais = all_art[i].country;
		nuevo_art = new Artista(nombre,edad,pais);
		Lista_artistas.poner(nuevo_art);
	}

	txt_area.value = "";
}

function carga_masivo_can(){
	var txt_area = document.getElementById("txt_mass_can");
	var all_can = JSON.parse(txt_area.value);
	
	for (var i=0;i<all_can.length;i++){
		artista = all_can[i].artist;
		nombre = all_can[i].name;
		duracion = all_can[i].duration;
		genero = all_can[i].gender;

		nueva_can = new Cancion(artista,nombre,duracion,genero);
		art = Lista_artistas.buscar_artista(artista);

		if(art != 0){
			art.canciones.poner(nueva_can);
		}
		
	}

	txt_area.value = "";
}

function carga_masivo_prog(){
	var txt_area = document.getElementById("txt_mass_prog");
	var all_can = JSON.parse(txt_area.value);
	
	for (var i=0;i<all_can.length;i++){
		artista = all_can[i].artist;
		nombre = all_can[i].song;
		duracion = all_can[i].duration;
		genero = all_can[i].gender;
		mes = all_can[i].month;
		dia = all_can[i].day;


		nueva_can = new Cancion(artista,nombre,duracion,genero);
		conseguido = Musica_programada.poner(mes,dia,nueva_can);

		if(conseguido != 0){
			art = Lista_artistas.buscar_artista(conseguido.artista);

			if(art != 0){
				art.canciones.poner(conseguido);
			}
		}
		
	}

	txt_area.value = "";
}

function g_usuarios(){
	Lista_usuarios.graficar_usuarios();
}

function g_artistas(){
	Lista_artistas.graficar_artistas("admin_lienzo",1100,650);
}

function g_m_programada(){
	Musica_programada.graficar_m_programada();
}

function g_podcast(){
	Arbol_podcast.graficar_binario("admin_lienzo",1100,650);
}

function logout(){
	en_sesion = null;
	ir_a_login();
}

function cargar_us_artistas(){
	var tmp2;
	var tmp = Lista_artistas.cabeza;
	let row_id = "";
	let cards = "";

	if(tmp == null){
		console.log("Lista Vacia");
		return 0;
	}

	var rows = "";
	while(tmp != null){
		row_id = "container_artista_"+tmp.data.nombre;
		rows += `<div class="container-fluid">
				<div class="d-flex flex-row flex-nowrap overflow-auto" id = "`+row_id+`">
				</div>
				</div>
				<hr/>`
		tmp = tmp.sig
	}

	crear_objeto("us_artistas_container",rows);

	tmp = Lista_artistas.cabeza;
	
	while(tmp != null){
		cards = ""
		row_id = "container_artista_"+tmp.data.nombre;
		cards += `<div class="card mx-2 card-block border-5" style="min-width: 20rem; max-width: 20rem; margin-bottom: 2vh;">
					  <div class="card-header">
					    `+tmp.data.nombre+`
					  </div>
					  <div class="card-body">
					    <p class="card-text">Edad: `+tmp.data.edad+`</p>
					    <p class="card-text">Pais: `+tmp.data.pais+`</p>
					  </div>
					</div>`;
		tmp2 = tmp.data.canciones.cabeza;
		while(tmp2 != null){
			cards += `<div class="card mx-2 card-block border-5" style="min-width: 20rem; max-width: 20rem; margin-bottom: 2vh;">
					  <div class="card-header">
					    `+tmp2.data.nombre+`
					  </div>
					  <div class="card-body">
					    <p class="card-text">Duracion: `+tmp2.data.duracion+`</p>
					    <p class="card-text">Genero: `+tmp2.data.genero+`</p>
					  </div>
					</div>`;
			tmp2 = tmp2.sig
		}

		crear_objeto(row_id,cards);
		tmp = tmp.sig;
	}

	Lista_artistas.graficar_artistas("us_artistas_lienzo",1100,600);
}

function cargar_us_amigos(){
	var tmp = Lista_usuarios.cabeza;
	let cards = "";
	

	while(tmp != null){
		if(!en_sesion.amigos.existe(tmp.data.username) && !en_sesion.bloqueados.existe(tmp.data.username) && tmp.data != en_sesion){
			cards += `<div class="card mx-2 card-block border-5" style="min-width: 20rem; max-width: 20rem; margin-bottom: 2vh;">
					  <div class="card-header">
					    `+tmp.data.name+`
					  </div>
					  <div class="card-body">
					  	<p class="card-text">Username: `+tmp.data.username+`</p>
					    <p class="card-text">DPI: `+tmp.data.dpi+`</p>
					    <p class="card-text">Telefono: `+tmp.data.phone+`</p>
					    <div class="d-flex flex-column">
					    	<button type="button" class="btn btn-success" style="margin: 10px;" onclick="agregar_amigo('`+tmp.data.username+`')">   Agregar   </button>
					    	<button type="button" class="btn btn-danger" style="margin: 10px;" onclick="bloquear_usuario('`+tmp.data.username+`')">   Bloquear   </button>
					    </div>
					  </div>

					</div>`;
		}
		tmp = tmp.sig;
	}

	crear_objeto("us_amigos_usuarios_cards",cards);
	
	cards = "";
	tmp = en_sesion.amigos.tope;

	while(tmp != null){
		cards += `<div class="card mx-2 card-block border-5" style="min-width: 20rem; max-width: 20rem; margin-bottom: 2vh;">
				  <div class="card-header">
				    `+tmp.data.name+`
				  </div>
				  <div class="card-body">
				  	<p class="card-text">Username: `+tmp.data.username+`</p>
				    <p class="card-text">DPI: `+tmp.data.dpi+`</p>
				    <p class="card-text">Telefono: `+tmp.data.phone+`</p>
				  </div>
				</div>`;
		tmp = tmp.abajo;
	}

	crear_objeto("us_amigos_cards",cards);
	en_sesion.amigos.graficar_pila("us_amigos_lienzo",1100,600);
}

function cargar_us_bloqueados(){
	var tmp = en_sesion.bloqueados.inicio;
	let cards = "";

	while(tmp != null){
		cards += `<div class="card mx-2 card-block border-5" style="min-width: 20rem; max-width: 20rem; margin-bottom: 2vh;">
				  <div class="card-header">
				    `+tmp.data.name+`
				  </div>
				  <div class="card-body">
				  	<p class="card-text">Username: `+tmp.data.username+`</p>
				    <p class="card-text">DPI: `+tmp.data.dpi+`</p>
				    <p class="card-text">Telefono: `+tmp.data.phone+`</p>
				  </div>
				</div>`;
		tmp = tmp.sig;
	}
	crear_objeto("us_bloqueados_cards",cards);

	en_sesion.bloqueados.graficar_cola("us_bloqueados_lienzo",1100,600);
}

function cargar_us_musica(){
	var tmp2;
	var tmp = Lista_artistas.cabeza;
	let cards = "";
	let agregadas = 0;

	if(tmp == null){
		console.log("Lista Vacia");
		return 0;
	}

	cards += `<div class="container-fluid">
				<div class="d-flex flex-row">`;
	while(tmp != null){
		tmp2 = tmp.data.canciones.cabeza;
		while(tmp2!=null){
			if(agregadas % 4 == 0){
				cards += `</div>
				</div>
				<div class="container-fluid">
				<div class="d-flex flex-row">`;
			}
			if(!en_sesion.playlist.existe(tmp2.data.nombre)){
				agregadas ++;
				cards+= `<div class="card mx-2 card-block border-5" style="min-width: 20rem; max-width: 20rem; margin-bottom: 2vh;">
				  <div class="card-header">
				    `+tmp2.data.nombre+`
				  </div>
				  <div class="card-body">
				    <p class="card-text">Artista: `+tmp2.data.artista+`</p>
				    <p class="card-text">Duracion: `+tmp2.data.duracion+`</p>
				    <p class="card-text">Genero: `+tmp2.data.genero+`</p>
				    <div class="d-flex flex-column">
				    	<button type="button" class="btn btn-info" style="margin: 10px;" onclick="agregar_playlist('`+tmp2.data.nombre+`','`+tmp2.data.artista+`')">   Agregar   </button>
				    </div>
				  </div>
				</div>`;
				
			}
			tmp2 = tmp2.sig;
		}
		tmp = tmp.sig;
	}
	cards += `</div>
				</div>`;
	crear_objeto("us_musica_container",cards);
}

function cargar_us_playlist(actual){
	cards = "";
	cards+= `<div class="card mx-2 card-block border-5" style="min-width: 20rem; max-width: 20rem; margin-bottom: 2vh; transform: scale(0.5);">
				  <div class="card-header">
				    `+actual.ant.data.nombre+`
				  </div>
				  <div class="card-body">
				    <p class="card-text">Artista: `+actual.ant.data.artista+`</p>
				    <p class="card-text">Duracion: `+actual.ant.data.duracion+`</p>
				    <p class="card-text">Genero: `+actual.ant.data.genero+`</p>
				  </div>
				</div>
				<div class="card mx-2 card-block border-5" style="min-width: 20rem; max-width: 20rem; margin-bottom: 2vh;">
				  <div class="card-header">
				    `+actual.data.nombre+`
				  </div>
				  <div class="card-body">
				    <p class="card-text">Artista: `+actual.data.artista+`</p>
				    <p class="card-text">Duracion: `+actual.data.duracion+`</p>
				    <p class="card-text">Genero: `+actual.data.genero+`</p>
				  </div>
				</div>
				<div class="card mx-2 card-block border-5" style="min-width: 20rem; max-width: 20rem; margin-bottom: 2vh; transform: scale(0.5);">
				  <div class="card-header">
				    `+actual.sig.data.nombre+`
				  </div>
				  <div class="card-body">
				    <p class="card-text">Artista: `+actual.sig.data.artista+`</p>
				    <p class="card-text">Duracion: `+actual.sig.data.duracion+`</p>
				    <p class="card-text">Genero: `+actual.sig.data.genero+`</p>
				  </div>
				</div>`;

	crear_objeto("us_musica_container",cards);

	en_sesion.playlist.graficar_enlazada("us_playlist_lienzo", 1500,400,actual);
}

function crear_objeto(div_id,inner){
	document.getElementById(div_id).innerHTML = inner;
}

function agregar_amigo(username){
	var usuario = Lista_usuarios.buscar_username(username);
	en_sesion.amigos.push(usuario);
	cargar_us_amigos();
}

function bloquear_usuario(username){
	var usuario = Lista_usuarios.buscar_username(username);
	en_sesion.bloqueados.enqueue(usuario);
	cargar_us_amigos();
}

function eliminar_amigo(){
	en_sesion.amigos.pop();
	cargar_us_amigos();
}

function bloquear_amigo(){
	amigo = en_sesion.amigos.pop();
	if(amigo != 0){
		en_sesion.bloqueados.enqueue(amigo);
		cargar_us_amigos();
	}
}

function desbloquear_usuario(){
	en_sesion.bloqueados.dequeue();
	cargar_us_bloqueados();
}

function bubble_sort(){
	Lista_artistas.ordenar_asc();
	cargar_us_artistas();
}

function quicksort(){
	Lista_artistas.ordenar_des( 0,  Lista_artistas.tamano() -1);
	cargar_us_artistas();
}

function agregar_playlist(cancion,artista){
	cancion = Lista_artistas.buscar_cancion(artista, cancion);
	en_sesion.playlist.poner(cancion);
	cargar_us_musica();
}

function cancion_ant(cancion, artista){
	let tmp = en_sesion.playlist.buscar(cancion);
	tmp = tmp.ant;
	cargar_us_playlist(tmp);
}

function cancion_sig(cancion, artista){
	let tmp = en_sesion.playlist.buscar(cancion);
	tmp = tmp.sig;
	cargar_us_playlist(tmp);
}

// flujo de aplicacion

function registro_volver(){
	document.getElementById("registro_dpi").value = "";
	document.getElementById("registro_name").value = "";
	document.getElementById("registro_username").value = "";
	document.getElementById("registro_password").value = "";
	document.getElementById("registro_phone").value = "";

	cambiar_pagina("paginaEntrar");
}

function ir_a_login(){
	cambiar_pagina("paginaEntrar");
	cambiar_sub("Admin_graphs");
	cambiar_sub_us("us_musica");
}

function ir_a_registro(){
	cambiar_pagina("paginaRegistro");
}

function ir_admin_graph(){
	cambiar_sub("Admin_graphs");
}

function ir_admin_us(){
	cambiar_sub("Admin_usuarios");
}

function ir_admin_art(){
	cambiar_sub("Admin_artistas");
}

function ir_admin_can(){
	cambiar_sub("Admin_canciones");
}

function ir_admin_pod(){
	cambiar_sub("Admin_podcast");
}

function ir_admin_prog(){
	cambiar_sub("Admin_m_programada");
}

function ir_us_musica(){
	cambiar_sub_us("us_musica");
	cargar_us_musica();
}

function ir_us_playlist(){
	cambiar_sub_us("us_playlist");
	cargar_us_playlist(en_sesion.playlist.cabeza);
}

function ir_us_artistas(){
	cambiar_sub_us("us_artistas");
	cargar_us_artistas();
}

function ir_us_amigos(){
	cambiar_sub_us("us_amigos");
	cargar_us_amigos();
}

function ir_us_bloqueados(){
	cambiar_sub_us('us_bloqueados');
	cargar_us_bloqueados();
}

// cambio de paginas

function cambiar_pagina(nueva_pag){
	document.getElementById(current).hidden = true;
	document.getElementById(nueva_pag).hidden = false;
	current = nueva_pag;
}

function cambiar_sub(nueva_pag){
	document.getElementById(current_admin).hidden = true;
	document.getElementById(nueva_pag).hidden = false;
	current_admin = nueva_pag;
}

function cambiar_sub_us(nueva_pag){
	document.getElementById(current_us).hidden = true;
	document.getElementById(nueva_pag).hidden = false;
	current_us = nueva_pag;
}