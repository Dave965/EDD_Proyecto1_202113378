class Enlazada{
	constructor(){
		this.cabeza = null;
	}

	poner(dato){
		let n_nodo = new Nodo(dato);
		let tmp = this.cabeza;
		if(tmp == null){
			this.cabeza = n_nodo;
			n_nodo.sig = n_nodo;
			n_nodo.ant = n_nodo;
		}
		else{
			while(tmp.sig != this.cabeza){
				tmp = tmp.sig;
			}
			tmp.sig = n_nodo;
			n_nodo.sig = this.cabeza;
			n_nodo.ant = tmp;
			this.cabeza.ant = n_nodo;
		}
	}

	existe(cancion){
		let tmp = this.cabeza;
		if(tmp == null){
			return false;
		}

		do {
			if(tmp.data.nombre == cancion){
				return true;
			}
			tmp = tmp.sig;
		}while(tmp != this.cabeza);

		return false;
	}

	buscar(nombre, artista){
		let tmp = this.cabeza;
		do {
			if(tmp.data.nombre == nombre && tmp.data.artista == artista){
				return tmp;
			}
			tmp = tmp.sig;
		}while(tmp != this.cabeza);

		return 0;
	}

	graficar_enlazada(lienzo,w,h,actual){
		var codigo_dot = "digraph G{\nlabel=\" Lista enlazada de Playlist \"; \nnode [shape=box];\ngraph [rankdir = LR];\n";
		var tmp = this.cabeza;
		var conexiones = "";
		var nodos = "";
		var numnodo = 0;

		if(tmp == null){
			d3.select("#"+lienzo).selectAll('*').remove();
			console.log("No se han agregado canciones");
			return 0;
		}

		while(tmp.sig != this.cabeza){
			nodos += "N_"+ numnodo + "[label = \"Cancion: "+ tmp.data.nombre+ "\"];\n";
			var aux = numnodo + 1;
			conexiones += "N_" + numnodo + " -> N_" + aux +"[dir=\"both\"];\n";
			if(tmp.data.nombre == actual.nombre){
				conexiones += "N_" + numnodo + " -> N_" + numnodo +"[label = \"Actual\" color = \"white\"];\n";
			}
			tmp = tmp.sig;
			numnodo += 1;
		}

		nodos += "N_"+ numnodo + "[label = \"Cancion: "+ tmp.data.nombre+ "\"];\n";
		conexiones += "N_" + numnodo + " -> N_0[dir=\"both\"];\n";
		if(tmp.data.nombre == actual.nombre){
				conexiones += "N_" + numnodo + " -> N_" + numnodo +"[label = \"Actual\" color = \"white\"];\n";
		}

		conexiones += "N_0 -> N_0 [label = \"Cabeza\" color = \"white\"];\n";
		codigo_dot += "//nodos \n";
		codigo_dot += nodos+"\n";
		codigo_dot += "//conexiones \n";
		codigo_dot += "{\n"+conexiones+"\n}\n}";

		d3.select("#"+lienzo).graphviz()
			.width(w)
			.height(h)
			.renderDot(codigo_dot);
	}
}