class Matriz_dispersa{
	constructor(){
		this.raiz = new Nodo_ortogonal(0);
	}

	arriba_raiz(nodo){
		let aux = nodo;
		while(aux.arriba != null){
			aux = aux.arriba;
		}
		return aux.data;
	}

	izq_raiz(nodo){
		let aux = nodo;
		while(aux.ant != null){
			aux = aux.ant;
		}
		return aux.data;
	}

	colocar_mes(tmp_mes,dia,cancion){
		while(true){
			let dia_act = this.arriba_raiz(tmp_mes);
			if(dia_act < dia && tmp_mes.sig != null){
				tmp_mes = tmp_mes.sig;
			}
			else if(dia_act < dia && tmp_mes.sig == null){
				tmp_mes.sig = cancion;
				cancion.ant = tmp_mes;
				break;
			}
			else if(dia_act > dia){
				let aux = tmp_mes.ant;
				tmp_mes.ant = cancion;
				cancion.ant = aux;
				aux.sig = cancion;
				cancion.sig = tmp_mes;
				break;
			}
			else{
				let aux = tmp_mes.data;
				tmp_mes.data = cancion.data;
				return aux;
			}
		}
		return 0;
	}

	colocar_dia(tmp_dia,pos,cancion,conseguido){
		let meses = [0,"January","February","March","April","May","June","July","August","September","October","November","December"];
		if(conseguido != 0){
			return 0;
		}
		while(true){
			let mes_act = meses.indexOf(this.izq_raiz(tmp_dia));
			if(mes_act < pos && tmp_dia.abajo != null){
				tmp_dia = tmp_dia.abajo;
			}
			else if(mes_act < pos && tmp_dia.abajo == null){
				tmp_dia.abajo = cancion;
				cancion.arriba = tmp_dia;
				break;
			}
			else if(mes_act > pos){
				let aux = tmp_dia.arriba;
				tmp_dia.arriba = cancion;
				cancion.arriba = aux;
				aux.abajo = cancion;
				cancion.abajo = tmp_dia;
				break;
			}else{
				break;
			}
		}
		return 0;
	}

	poner(mes,dia,dato){
		let meses = [0,"January","February","March","April","May","June","July","August","September","October","November","December"];
		const cancion = new Nodo_ortogonal(dato);

		let pos = meses.indexOf(mes);

		let tmp_mes = this.raiz;
		let tmp_dia = this.raiz;
		let conseguido = 0;

		while(true){
			if(meses.indexOf(tmp_mes.data) < pos && tmp_mes.abajo != null){
				tmp_mes = tmp_mes.abajo;
			}
			else if(meses.indexOf(tmp_mes.data) < pos && tmp_mes.abajo == null){
				let nuevo_mes = new Nodo_ortogonal(mes);
				tmp_mes.abajo = nuevo_mes;
				nuevo_mes.arriba = tmp_mes;
				nuevo_mes.sig = cancion;
				cancion.ant = nuevo_mes;
				break;
			}
			else if(meses.indexOf(tmp_mes.data) > pos){
				let nuevo_mes = new Nodo_ortogonal(mes);
				let aux = tmp_mes.arriba;
				tmp_mes.arriba = nuevo_mes;
				nuevo_mes.arriba = aux;
				aux.abajo = nuevo_mes;
				nuevo_mes.abajo = tmp_mes;
				nuevo_mes.sig = cancion;
				cancion.ant = nuevo_mes;
				break;
			}else{
				conseguido = this.colocar_mes(tmp_mes,dia,cancion);
				break;				
			}

		}

		while(true){
			if(tmp_dia.data < dia && tmp_dia.sig != null){
				tmp_dia = tmp_dia.sig;
			}
			else if(tmp_dia.data < dia && tmp_dia.sig == null){
				let nuevo_dia = new Nodo_ortogonal(dia);
				tmp_dia.sig = nuevo_dia;
				nuevo_dia.ant = tmp_dia;
				nuevo_dia.abajo = cancion;
				cancion.arriba = nuevo_dia;
				break;
			}
			else if(tmp_dia.data > dia){
				let nuevo_dia = new Nodo_ortogonal(dia);
				let aux = tmp_dia.ant;
				tmp_dia.ant = nuevo_dia;
				nuevo_dia.ant = aux;
				aux.sig = nuevo_dia;
				nuevo_dia.sig = tmp_dia;
				nuevo_dia.abajo = cancion;
				cancion.arriba = nuevo_dia;
				break;
			}
			else{
				this.colocar_dia(tmp_dia,pos,cancion,conseguido);
				break;
			}
		}
		return conseguido;
	}

	graficar_m_programada(){
		var codigo_dot = "digraph G{\nlabel=\" Musica programada \"; \nnode [shape=box];\ngraph [rankdir = LR, splines=ortho, nodesep=0.5];\n";
		var tmp_mes;
		var tmp_dia = this.raiz;
		var conexiones = "";
		var nodos;

		codigo_dot += "//nodos \n";
		while(tmp_dia != null){
			tmp_mes = tmp_dia;
			nodos = "{\nrank=same\n";
			while(tmp_mes != null){
				nodos +=  "N_"+ this.izq_raiz(tmp_mes) +"_"+ this.arriba_raiz(tmp_dia);
				if( typeof tmp_mes.data == "number" || typeof tmp_mes.data == "string" ){
					nodos+="[label = \""+tmp_mes.data+"\"];\n";
				}else{
					nodos+="[label = \"Cancion: "+tmp_mes.data.nombre+"\\n"+tmp_mes.data.artista+"\"];\n";
				}
				tmp_mes = tmp_mes.abajo;
			}
			nodos += "}\n";
			codigo_dot += nodos;
			tmp_dia = tmp_dia.sig;
		}

		tmp_mes = this.raiz;
		tmp_dia;
		while(tmp_mes != null){
			tmp_dia = tmp_mes;
			while(tmp_dia.sig!=null){
				conexiones += "N_" + this.izq_raiz(tmp_mes) +"_"+ this.arriba_raiz(tmp_dia) +" -> N_" + this.izq_raiz(tmp_mes) +"_"+ this.arriba_raiz(tmp_dia.sig) +" [dir=\"both\"];\n";
				tmp_dia = tmp_dia.sig;
			}
			tmp_mes = tmp_mes.abajo;
		}

		tmp_mes;
		tmp_dia = this.raiz;
		while(tmp_dia!= null){
			tmp_mes = tmp_dia;
			while(tmp_mes.abajo!=null){
				conexiones += "N_" + this.izq_raiz(tmp_mes) +"_"+ this.arriba_raiz(tmp_dia) +" -> N_" + this.izq_raiz(tmp_mes.abajo) +"_"+ this.arriba_raiz(tmp_dia) +" [dir=\"both\"];\n";
				tmp_mes = tmp_mes.abajo;
			}
			tmp_dia = tmp_dia.sig;
		}
		
		codigo_dot += "//conexiones \n";
		codigo_dot += "{\n"+conexiones+"\n}\n}";

		d3.select("#admin_lienzo").graphviz()
			.width(1100)
			.height(650)
			.renderDot(codigo_dot);
	}
}