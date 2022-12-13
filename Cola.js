class Cola{
	constructor(){
		this.inicio = null;
		this.final = null;
	}

	enqueue(dato){
		let bloqueado = new Nodo(dato);

		if(this.final == null){
			this.final = bloqueado;
			this.inicio = bloqueado;
		}
		else{
			this.final.sig = bloqueado;
			this.final = bloqueado;
		}
	}

	dequeue(){
		if(this.inicio == null){
			console.log("Cola vacia");
			return 0;
		}
		let aux = this.inicio;
		if(this.inicio == this.final){
			this.inicio = null;
			this.final = null;
		}
		else{
			this.inicio = aux.sig;
		}
		return aux.dato;
	}

	existe(username){
		let tmp = this.inicio;
		while(tmp != null){
			if(tmp.data.username == username){
				return true;
			}
			tmp = tmp.sig;
		}
		return false
	}

	graficar_cola(lienzo,w,h){
		var codigo_dot = "digraph G{\nlabel=\" Cola de Bloqueados \"; \nnode [shape=box];\ngraph [rankdir =LR];\n";
		var tmp = this.inicio;
		var conexiones = "";
		var nodosV = "{\n";
		var numnodo_a = 0;

		if(tmp == null){
			d3.select("#"+lienzo).selectAll('*').remove();
			console.log("No hay bloqueados");
			return 0;
		}

		while(tmp != null){

			nodosV += "N_"+ numnodo_a +"[label = \"Nombre: "+ tmp.data.name+ "\\n Usuario: "+ tmp.data.username+"\\n DPI: "+ tmp.data.dpi+"\"];\n";

			if(tmp.sig != null){
				var aux_a = numnodo_a + 1;
				conexiones += "N_" + numnodo_a +" -> N_" + aux_a +";\n";
			}

			tmp = tmp.sig;
			numnodo_a += 1;
		}
		numnodo_a--;
		conexiones += "N_0 -> N_0 [label = \"inicio\" color = \"white\"];\n";
		conexiones += "N_"+numnodo_a+"-> N_"+numnodo_a+"[label = \"final\" color = \"white\"];\n";
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