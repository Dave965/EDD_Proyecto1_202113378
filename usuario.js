class Usuario {
	constructor(dpi, name, username, password, phone, admin){
		this.dpi = dpi;
		this.name = name;
		this.username = username;
		this.password = password;
		this.phone = phone;
		this.admin = admin;
		this.amigos = new Pila();
		this.bloqueados = new Cola();
		this.playlist = new Enlazada();
	}
}

