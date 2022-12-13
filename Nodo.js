class Nodo{
	constructor(data){
		this.data = data;
		this.sig = null;
		this.ant = null;
	}
}

class Nodo_ortogonal{
	constructor(data){
		this.data = data;
		this.sig = null;
		this.ant = null;
		this.arriba = null;
		this.abajo = null;
	}
}

class Nodo_binario{
	constructor(data){
		this.data = data;
		this.izq = null;
		this.der = null;
	}
}