class Arbol_binario{
	constructor(){
		this.raiz = null;
	}

	poner(dato){
		this.raiz = this.add(dato,this.raiz)
	}

	add(dato,nodo){
		if(nodo == null){
			return new Nodo_binario(dato);
		}
		if(dato.name < nodo.data.name){
			nodo.izq = this.edad(dato,nodo.izq);
		}else{
			nodo.der = this.add(dato,nodo.der);
		}

		return nodo;
	}

	
}