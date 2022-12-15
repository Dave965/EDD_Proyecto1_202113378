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
			nodo.izq = this.add(dato,nodo.izq);
		}else{
			nodo.der = this.add(dato,nodo.der);
		}

		return nodo;
	}

	graficar_binario(lienzo,w,h){
		var codigo_dot = "digraph G{\nlabel=\" Arbol de podcasts \";\n";
		var tmp = this.raiz;
		var nodos = "";
		var nulls = 0;
		var nodo = 0;

		if(this.raiz == null){
			d3.select("#"+lienzo).selectAll('*').remove();
			console.log("arbol vacio");
			return 0;
		}
		let res = this.generar_grafo(tmp,0,0,nodos);
		codigo_dot += res.s;
		codigo_dot += "}";

		d3.select("#"+lienzo).graphviz()
			.width(w)
			.height(h)
			.renderDot(codigo_dot);

	}

	generar_grafo(nodo,padre,actual,s){
		actual += 1;
		if(nodo == null){
			s += "N_"+actual+"[shape = point];\n"
			s += "N_"+padre+" -> N_"+actual+";\n";
			return {s, actual};
		}

		s += "N_"+actual+"[label = \"Nombre: "+nodo.data.name+"\"];\n";
		if(padre != 0){
			s += "N_"+padre+" -> N_"+actual+";\n";
		}

		let res = this.generar_grafo(nodo.izq,actual,actual,"");
		s += res.s;
		let max = res.actual;
		
		let res2 = this.generar_grafo(nodo.der,actual,max,"");
		s += res2.s;
		actual = res2.actual;

		return { s, actual };		
	}
	
	generar_html(nodo,actual,s){
		if(actual % 3 == 0){
				s += `</div>
				</div>
				<div class="container-fluid">
				<div class="d-flex flex-row">`;
		}

		if(nodo == null){
			return {s, actual};
		}
		s += `<div class="card mx-2 card-block border-5" style="min-width: 18rem; max-width: 18rem; margin-bottom: 2vh;">
				  <div class="card-header">
				    Podcast: `+nodo.data.name+`
				  </div>
				  <div class="card-body">
				    <p class="card-text">Tema: `+nodo.data.topic+`</p>
				    <p class="card-text">Duracion: `+nodo.data.duration+`</p>
				    <p class="card-text">Invitados: `+nodo.data.guests+`</p>
				  </div>
				</div>`;

		actual ++;

		let res = this.generar_html(nodo.izq,actual,"");
		s += res.s;
		let max = res.actual;

		let res2 = this.generar_html(nodo.der,max,"");
		s += res2.s;
		actual = res2.actual;

		return { s, actual };
	}
}