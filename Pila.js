class Pila{
	constructor(){
		this.tope = null;
	}

	push(dato){
		let nuevo_amigo = new Nodo(dato);
		nuevo_amigo.abajo = this.tope;
		this.tope = nuevo_amigo;
	}

	pop(){
		if(this.tope == null){
			console.log("Pila vacia");
			return 0;
		}
		let aux = this.tope;
		this.tope = aux.abajo;
		return aux.data;
	}

	existe(username){
		let tmp = this.tope;
		while(tmp != null){
			if(tmp.data.username == username){
				return true;
			}
			tmp = tmp.abajo
		}
		return false
	}

	graficar_pila(lienzo,w,h){
		var codigo_dot = "digraph G{\nlabel=\" Pila de Amigos \"; \nnode [shape=box];\ngraph [rankdir =LR nodesep=0.5];\n";
		var tmp = this.tope;
		var conexiones = "";
		var nodosV = "{\nrank=same\n";
		var numnodo_a = 0;

		if(tmp == null){
			d3.select("#"+lienzo).selectAll('*').remove();
			console.log("No hay Amigos");
			return 0;
		}

		while(tmp != null){

			nodosV += "N_"+ numnodo_a +"[label = \"Nombre: "+ tmp.data.name+ "\\n Usuario: "+ tmp.data.username+"\\n DPI: "+ tmp.data.dpi+"\"];\n";

			if(tmp.abajo != null){
				var aux_a = numnodo_a + 1;
				conexiones += "N_" + numnodo_a +" -> N_" + aux_a +";\n";
			}

			tmp = tmp.abajo;
			numnodo_a += 1;
		}
		conexiones += "N_0 -> N_0 [label = \"Tope\" color = \"white\"];\n";
		codigo_dot += "//nodos \n";
		codigo_dot += nodosV+"}\n";
		codigo_dot += "//conexiones \n";
		codigo_dot += "{\n"+conexiones+"\n}\n}";

		d3.select("#"+lienzo).graphviz()
			.width(w)
			.height(h)
			.renderDot(codigo_dot);
	}
}