/*
* @Nombre: NodoConst
* @Descripción: Nodo que contiene una constante (terminal)
* @Variable de instancia 1:
*	@Nombre: this.valor
*	@Tipo: Numeric
*	@Descripción: Valor del número representado con el nodo
*/
class NodoConst
{
	/*
	* @Descripción: Constructor del nodo
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre: p_valor
	*	@Tipo: Numeric
	*	@Descripción: Valor numérico de la constante
	*/
	constructor( p_valor )
	{
		this.valor = p_valor ;
	}

	/*
	* @Descripción: Crea una copia idéntica independiente
	* @Valor devuelto: NodoConst copia
	*/
	clonar()
	{
		return new NodoConst( this.valor );
	}

	/*
	* @Descripción: Calcula la derivada del nodo
	* @Valor devuelto: Devuelve árbol correspondiente a la derivada respecto del identificador 'id'
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la que derivamos
	*/
	derivada( id )
	{
		return new NodoConst( 0.0 );
	}

	/*
	* @Descripción: Indica la dependencia respecto a una variable
	* @Valor devuelto: Devuelve si el nodo depende de la variable 'id' como valor Boolean
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la se comprueba la dependencia
	*/
	dependeDe( id = undefined )
	{
		return false //Las constantes son independientes
	}
	
	
	/*
	* @Descripción: Evalúa la expresión usando un diccionario
	* @Valor devuelto: Resultado numérico de evaluar la experisón
	* @Parámetro 1:
	*	@Nombre: dicc
	*	@Tipo: Object
	*	@Descripción: Objeto en el que las claves son los identificadores de las variables de las que se tiene el valor y los valores, los valores numéricos de éstas
	*/
	evaluar( dic )
	{
		return this.valor ;
	}

	/*
	* @Descripción: Convierte a cadena la expresión
	* @Valor devuelto: String
	*/
	toString()
	{
		return this.valor.toString() ;
	}

	/*
	* @Descripción: Cambia los nodos de identificador por el nodo como parámetro
	* @Valor devuelto: Árbol de nodos con los nodos identificador sustituidos
	* @Parámetro 1:
	*	@Nombre: change
	*	@Tipo: Object
	*	@Descripción: Nodo por el que sustituimos el identificador
	*/
	cambiaVar(change)
	{
		return this.clonar() // Como es un nodo terminal constante devuelve una copia
	}

	/*
	* @Descripción: Simplifica la expresión
	* @Valor devuelto: Árbol de nodos simplificados
	*/
	simplificar()
	{
		return this.clonar() //En este caso se devuelve una copia ya que es una constante
	}
}

/*
* @Nombre:
* @Descripción: Nodo que contiene un identificador (terminal)
* @Variable de instancia 1:
*	@Nombre: this.ident
*	@Tipo: String
*	@Descripción: Cadena del identificador
*/
class NodoIdent
{
	/*
	* @Descripción: Constructor del nodo
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre:
	*	@Tipo:
	*	@Descripción:
	*/
	constructor( p_ident )
	{
		this.ident = p_ident ;
	}
	
	/*
	* @Descripción: Crea una copia idéntica independiente
	* @Valor devuelto: NodoIdent copia
	*/
	clonar()
	{
		return new NodoIdent( this.ident );
	}
	
	/*
	* @Descripción: Calcula la derivada del nodo
	* @Valor devuelto: Devuelve árbol correspondiente a la derivada respecto del identificador 'id'
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la que derivamos
	*/
	derivada( id )
	{
		if ( id == this.ident )
			return new NodoConst( 1.0 );
		else
			return new NodoConst( 0.0 );
	}
	
	/*
	* @Descripción: Indica la dependencia respecto a una variable
	* @Valor devuelto: Devuelve si el nodo depende de la variable 'id' como valor Boolean
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la se comprueba la dependencia
	*/
	dependeDe( id = undefined)
	{
		//Si no pasamos ningun 'id' devolveremos true lo cual indica que hay dependencia de una variable
		if(id!=undefined)
			return this.ident==id
		else
			return true
	}
	
	/*
	* @Descripción: Evalúa la expresión usando un diccionario
	* @Valor devuelto: Resultado numérico de evaluar la expresión
	* @Parámetro 1:
	*	@Nombre: dicc
	*	@Tipo: Object
	*	@Descripción: Objeto en el que las claves son los identificadores de las variables de las que se tiene el valor y los valores, los valores numéricos de éstas
	*/
	evaluar( dicc )
	{
		//Si la variable a evaluar no está en el diccionario devolvemos el valor especial NaN
		if(Object.keys(dicc).includes(this.ident)){
			return dicc[this.ident] ;
		}else
			return NaN
	}
	
	/*
	* @Descripción: Convierte a cadena la expresión
	* @Valor devuelto: String
	*/
	toString()
	{
		return this.ident.toString();
	}
	
	/*
	* @Descripción: Cambia los nodos de identificador por el nodo como parámetro
	* @Valor devuelto: Árbol de nodos con los nodos identificador sustituidos
	* @Parámetro 1:
	*	@Nombre: change
	*	@Tipo: Object
	*	@Descripción: Nodo por el que sustituimos el identificador
	*/
	cambiaVar(change) 
	{		
		//Si la variable a cambiar es la correspondiente al nodo devolvemos el nodo por el que queremos cambiar la variable
		if(Object.keys(change).includes(this.ident))
			return change[this.ident].clonar()
		else
			return this.clonar()
	}
	
	/*
	* @Descripción: Simplifica la expresión
	* @Valor devuelto: Árbol de nodos simplificados
	*/
	simplificar()
	{
		return this.clonar() //En este caso se devuelve una copia ya que es un identificador
	}
}

/*
* @Nombre: NodoFun
* @Descripción: Nodo que contiene una función y sus argumentos
* @Variable de instancia 1:
*	@Nombre: this.ident
*	@Tipo: String
*	@Descripción: Identificador de la función
* @Variable de instancia 2:
*	@Nombre: this.arg
*	@Tipo: Array
*	@Descripción: Vector de nodos, en el que cada componente representa a los argumentos del nodo
*/
class NodoFun
{
	/*
	* @Descripción: Constructor del nodo
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre:
	*	@Tipo:
	*	@Descripción:
	*/
	constructor( p_ident , ...p_arg)
	{
		this.ident = p_ident ;
		this.arg = p_arg.map(x=>x.clonar())
	}
	
	/*
	* @Descripción: Crea una copia idéntica independiente
	* @Valor devuelto: NodoFun copia
	*/
	clonar()
	{
		return new NodoFun( this.ident , ...this.arg );
	}
	
	/*
	* @Descripción: Calcula la derivada del nodo
	* @Valor devuelto: Devuelve árbol correspondiente a la derivada respecto del identificador 'id'
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la que derivamos
	*/
	derivada( id )
	{
	//Para cada funcion contruimos su arbol derivada usando las reglas de derivación y la de la cadena si la derivada del argumento no es uno
		switch(this.ident){
			case "cos":
				return (new NodoMult( new NodoMenos( new NodoFun("sen",this.arg[0]) ) , this.arg[0].derivada(id)	)).simplificar()
			break;
			case "sen":
				return (new NodoMult( new NodoFun("cos",this.arg[0]) , this.arg[0].derivada(id)	)).simplificar()
			break;
			case "tan":
				return (new NodoMult( new NodoSuma(new NodoConst(1), new NodoExp(new NodoFun("tan",this.arg[0]), new NodoConst(2))) , this.arg[0].derivada(id)	)).simplificar()		
			break;
			case "acos":
				return (new NodoDiv( new NodoMenos(this.arg[0].derivada(id)) , new NodoFun("sqrt", new NodoResta(	new NodoConst(1) , new NodoExp( this.arg[0] ,	new NodoConst(2) ) ) ) )).simplificar()		
			break;
			case "asen":
				return (new NodoDiv( this.arg[0].derivada(id) , new NodoFun("sqrt", new NodoResta(	new NodoConst(1) , new NodoExp( this.arg[0] ,	new NodoConst(2) ) ) ))).simplificar()
			break;
			case "atan":
				return (new NodoDiv( this.arg[0].derivada(id) , new NodoSuma(	new NodoConst(1) , new NodoExp( this.arg[0] ,	new NodoConst(2) ) ) )).simplificar()
			break;
			case "cosh":
				return (new NodoMult(	new NodoFun("senh", this.arg[0]) , this.arg[0].derivada(id)	)).simplificar()
			break;
			case "senh":
				return (new NodoMult(	new NodoFun("cosh", this.arg[0]) , this.arg[0].derivada(id)	)).simplificar()
			break;
			case "tanh":
				return (new NodoDiv(	this.arg[0].derivada(id)	,	new NodoExp(	new NodoFun("cosh", this.arg[0] )	,	new NodoConst(2) ))).simplificar()
			break;
			case "acosh":
				return (new NodoDiv( this.arg[0].derivada(id) , new NodoFun("sqrt", new NodoResta( new NodoExp( this.arg[0] ,	new NodoConst(2) )	,	new NodoConst(1)	) ))).simplificar()
			break;
			case "asenh":
				return (new NodoDiv( this.arg[0].derivada(id) , new NodoFun("sqrt", new NodoResta( new NodoExp( this.arg[0] ,	new NodoConst(2) )	,	new NodoConst(1)	) ))).simplificar()
			break;
			case "atanh":
				return (new NodoDiv( this.arg[0].derivada(id) , new NodoResta(	new NodoConst(1) , new NodoExp( this.arg[0] ,	new NodoConst(2) ) ) )).simplificar()
			break;
			case "sqrt":
				return	(new NodoDiv(	this.arg[0].derivada(id) ,	new NodoMult(	new NodoConst(2)	,	new NodoFun( "sqrt" ,	this.arg[0]	)	)	)).simplificar()
			break;
			case "log":
				deriv=this.arg[0].derivada(id)
				return (new NodoDiv(	this.arg[0].derivada(id)	, this.arg[0] )).simplificar()
			
			break;
			case "exp":
				return (new NodoMult(	new NodoFun( "exp" ,	this.arg[0] ) , this.arg[0].derivada(id)	)).simplificar()
			break;
			
			case "int":// Las integrales se derivan con la regla de Barrow estudiando si hay dependencia en los limites de integración 
			//los argumentos de la integral son [funcion a integrar, variable de integración, limite inferior, limite superior]
				var depIzq=this.arg[2].dependeDe(id)
				var depDer=this.arg[3].dependeDe(id)
				var cambio={}
				var aux,deriv
				
				if(depIzq && depDer){
					cambio[this.arg[1]]=this.arg[3]
					aux=this.arg[0].cambiaVar(cambio)
					deriv=this.arg[3].derivada(id)
					if(deriv.evaluar({})!=1)
						aux=new NodoMult(aux,deriv)
					cambio[this.arg[1]]=this.arg[2]
					deriv=this.arg[2].derivada(id)
					if(deriv.evaluar({})==1)
						return new NodoResta(aux,this.arg[0].cambiaVar(cambio))
					else
						return new NodoResta( aux, new NodoMult(this.arg[0].cambiaVar(cambio),deriv) )
				}else if(depIzq){
					cambio[this.arg[1]]=this.arg[2]
					aux=this.arg[0].cambiaVar(cambio)
					deriv=this.arg[2].derivada(id)
					if(deriv.evaluar({})==1)
						return new NodoMenos(aux)
					else
						return new NodoMenos( new NodoMult(aux,deriv) )
					
				}else if(depDer){
					cambio[this.arg[1]]=this.arg[3]
					aux=this.arg[0].cambiaVar(cambio)
					deriv=this.arg[3].derivada(id)
					if(deriv.evaluar({})==1)
						return aux
					else
						return new NodoMult(aux,deriv)
				}else
					return new NodoConst(0.0)			
			break;
		}
	}
	
	/*
	* @Descripción: Indica la dependencia respecto a una variable
	* @Valor devuelto: Devuelve si el nodo depende de la variable 'id' como valor Boolean
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la se comprueba la dependencia
	*/
	dependeDe( id = undefined)
	{
		return this.arg.map(x=>x.dependeDe(id)).includes(true)
	}
	
	/*
	* @Descripción: Evalúa la expresión usando un diccionario
	* @Valor devuelto: Resultado numérico de evaluar la expresión
	* @Parámetro 1:
	*	@Nombre: dicc
	*	@Tipo: Object
	*	@Descripción: Objeto en el que las claves son los identificadores de las variables de las que se tiene el valor y los valores, los valores numéricos de éstas
	*/
	evaluar( dicc )
	{
		switch(this.ident){
			case "cos":
				return Math.cos(this.arg[0].evaluar(dicc))
			break;
			case "sen":
				return Math.sin(this.arg[0].evaluar(dicc))
			break;
			case "tan":
				return Math.tan(this.arg[0].evaluar(dicc))
			break;
			case "acos":
				return Math.acos(this.arg[0].evaluar(dicc))
			break;
			case "asen":
				return Math.asin(this.arg[0].evaluar(dicc))
			break;
			case "atan":
				return Math.atan(this.arg[0].evaluar(dicc))
			break;
			case "cosh":
				return Math.cosh(this.arg[0].evaluar(dicc))
			break;
			case "senh":
				return Math.sinh(this.arg[0].evaluar(dicc))
			break;
			case "tanh":
				return Math.tanh(this.arg[0].evaluar(dicc))
			break;
			case "acosh":
				return Math.acosh(this.arg[0].evaluar(dicc))
			break;
			case "asenh":
				return Math.asinh(this.arg[0].evaluar(dicc))
			break;
			case "atanh":
				return Math.atanh(this.arg[0].evaluar(dicc))
			break;
			case "sqrt":
				return Math.sqrt(this.arg[0].evaluar(dicc))
			break;
			case "log":
				return Math.log(this.arg[0].evaluar(dicc))
			
			break;
			case "exp":
				return Math.exp(this.arg[0].evaluar(dicc))					
			break;
			
			case "int": //Usamos un método numérico para integrar: Runge Kutta de orden 4
				var f,tf,t0,varInt,argInt
				argInt=this.arg[0]
				varInt=this.arg[1].toString()
				tf=this.arg[3].evaluar(dicc)
				if(isNaN(tf) || !isFinite(tf))
					return NaN
				
				t0=this.arg[2].evaluar(dicc)
				if(isNaN(tf) || !isFinite(tf))
					return NaN
				
				f=function(x,t){ 
					let valorAux={}
					valorAux[varInt]=t
					return argInt.evaluar(valorAux)
				}
				
				if(Math.abs(t0-tf)<0.01)
					return 0
				else if(t0<tf)
					return RungeKutta4(f,tf,t0,0,0.01)
				else
					return -RungeKutta4(f,t0,tf,0,0.01)
								
			break;
		}
	}
	
	/*
	* @Descripción: Convierte a cadena la expresión
	* @Valor devuelto: String
	*/
	toString()
	{
		 return this.ident + "( " + this.arg.join(" , ") + " )";
	}
	
	/*
	* @Descripción: Cambia los nodos de identificador por el nodo como parámetro
	* @Valor devuelto: Árbol de nodos con los nodos identificador sustituidos
	* @Parámetro 1:
	*	@Nombre: change
	*	@Tipo: Object
	*	@Descripción: Nodo por el que sustituimos el identificador
	*/
	cambiaVar(change)
	{
		return new NodoFun(this.ident, ...this.arg.map(x=>x.cambiaVar(change)))
	}
	
	/*
	* @Descripción: Simplifica la expresión
	* @Valor devuelto: Árbol de nodos simplificados
	*/
	simplificar()
	{
		return new NodoFun(this.ident,...this.arg.map(x=>x.simplificar())) //Solo podemos simplificar los argumentos de la función
	}
	
}

/*
* @Nombre: NodoMenos
* @Descripción: nodo unario (no terminal): el opuesto de una sub-expresión
* @Variable de instancia 1:
*	@Nombre: this.p
*	@Tipo: Nodo (variable)
*	@Descripción: Representa la subexpresión a oponer, puede ser una constante, un identificador, etc
*/
class NodoMenos
{
	/*
	* @Descripción: Constructor del nodo
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre:
	*	@Tipo:
	*	@Descripción:
	*/
	constructor ( p ) // p es un objeto de tipo 'Nodo'
	{
		this.p = p.clonar() ;
	}
	
	/*
	* @Descripción: Crea una copia idéntica independiente
	* @Valor devuelto: NodoMenos copia
	*/
	clonar()
	{
		return new NodoMenos( this.p );
	}
	
	/*
	* @Descripción: Calcula la derivada del nodo
	* @Valor devuelto: Devuelve árbol correspondiente a la derivada respecto del identificador 'id'
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la que derivamos
	*/
	derivada( id )
	{
		return new NodoMenos( (this.p).derivada(id) );
	}

	/*
	* @Descripción: Indica la dependencia respecto a una variable
	* @Valor devuelto: Devuelve si el nodo depende de la variable 'id' como valor Boolean
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la se comprueba la dependencia
	*/
	dependeDe( id = undefined )
	{
		return (this.p).dependeDe(id)
	}
	
	/*
	* @Descripción: Evalúa la expresión usando un diccionario
	* @Valor devuelto: Resultado numérico de evaluar la expresión
	* @Parámetro 1:
	*	@Nombre: dicc
	*	@Tipo: Object
	*	@Descripción: Objeto en el que las claves son los identificadores de las variables de las que se tiene el valor y los valores, los valores numéricos de éstas
	*/
	evaluar( dicc )
	{
		return -(this.p).evaluar( dicc ) ;
	}
	
	/*
	* @Descripción: Convierte a cadena la expresión
	* @Valor devuelto: String
	*/
	toString()
	{
		return "-(" + (this.p).toString() + ")" ;
	}
	
	/*
	* @Descripción: Cambia los nodos de identificador por el nodo como parámetro
	* @Valor devuelto: Árbol de nodos con los nodos identificador sustituidos
	* @Parámetro 1:
	*	@Nombre: change
	*	@Tipo: Object
	*	@Descripción: Nodo por el que sustituimos el identificador
	*/
	cambiaVar(change)
	{
		return new NodoMenos(this.p.cambiaVar(change))
	}
	
	/*
	* @Descripción: Simplifica la expresión
	* @Valor devuelto: Árbol de nodos simplificados
	*/
	simplificar()
	{
		var aux=this.p.evaluar({})
		if( ! isNaN(aux) && isFinite(aux)) //Si se puede evaluar la expresión dejamos un nodo con la constante
			return new NodoConst(-aux)
		else
			return (new NodoMenos(this.p.simplificar())) //Simplificamos la expresión interior
	}
}

/*
* @Nombre: NodoSuma
* @Descripción: Nodo binario (no terminal): suma de dos sub-expresiones
* @Variable de instancia 1:
*	@Nombre: this.izq
*	@Tipo: Nodo (variable)
*	@Descripción: Expresión que representa el sumando izquierdo
* @Variable de instancia 2:
*	@Nombre: this.der
*	@Tipo: Nodo (variable)
*	@Descripción: Expresión que representa el sumando derecho
*/
class NodoSuma
{
	/*
	* @Descripción: Constructor del nodo
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre:
	*	@Tipo:
	*	@Descripción:
	*/
	constructor ( p_izq, p_der ) // p_izq,p_der son objetos de tipo 'Nodo'
	{
		this.izq = p_izq.clonar() ;
		this.der = p_der.clonar() ;
	}
	
	/*
	* @Descripción: Crea una copia idéntica independiente
	* @Valor devuelto: NodoSuma copia
	*/
	clonar()
	{
		return new NodoSuma( this.izq, this.der );
	}
	
	/*
	* @Descripción: Calcula la derivada del nodo
	* @Valor devuelto: Devuelve árbol correspondiente a la derivada respecto del identificador 'id'
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la que derivamos
	*/
	derivada( id )
	{
		return (new NodoSuma( this.izq.derivada(id), this.der.derivada(id) )).simplificar();			
	}
	
	/*
	* @Descripción: Indica la dependencia respecto a una variable
	* @Valor devuelto: Devuelve si el nodo depende de la variable 'id' como valor Boolean
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la se comprueba la dependencia
	*/
	dependeDe( id = undefined )
	{
		return (this.izq).dependeDe(id) || (this.der).dependeDe(id)
	}
	
	/*
	* @Descripción: Evalúa la expresión usando un diccionario
	* @Valor devuelto: Resultado numérico de evaluar la expresión
	* @Parámetro 1:
	*	@Nombre: dicc
	*	@Tipo: Object
	*	@Descripción: Objeto en el que las claves son los identificadores de las variables de las que se tiene el valor y los valores, los valores numéricos de éstas
	*/
	evaluar( dicc )
	{
		return (this.izq).evaluar( dicc ) + (this.der).evaluar( dicc ) ;
	}
	
	/*
	* @Descripción: Convierte a cadena la expresión
	* @Valor devuelto: String
	*/
	toString()
	{
		return "(" + this.izq.toString() + " + " + this.der.toString() + ")" ;
	}
	
	/*
	* @Descripción: Cambia los nodos de identificador por el nodo como parámetro
	* @Valor devuelto: Árbol de nodos con los nodos identificador sustituidos
	* @Parámetro 1:
	*	@Nombre: change
	*	@Tipo: Object
	*	@Descripción: Nodo por el que sustituimos el identificador
	*/
	cambiaVar(change)
	{
		return new NodoSuma( this.izq.cambiaVar(change), this.der.cambiaVar(change) );
	}
	
	/*
	* @Descripción: Simplifica la expresión
	* @Valor devuelto: Árbol de nodos simplificados
	*/
	simplificar()
	{
		//Hacemos un estudio para evaluar los nodos posibles y eliminar las sumas de cero
		var auxI=this.izq.evaluar({})
		var auxD=this.der.evaluar({})
		if( ! isNaN(auxI) && isFinite(auxI) ){
			if(auxI==0.0)
				return this.der.simplificar()
			else if( ! isNaN(auxD) && isFinite(auxD) ){
				if(auxD==0.0)
					return this.izq.simplificar()
				else
					return new NodoConst(auxI+auxD)
			}else
				return new NodoSuma(this.der.simplificar(),new NodoConst(auxI))
		}else if(! isNaN(auxD) && isFinite(auxD)){
			if(auxD==0.0)
				return this.izq.simplificar()
			else
				return new NodoSuma(this.izq.simplificar(),new NodoConst(auxD))
		}else
			return new NodoSuma(this.izq.simplificar(),this.der.simplificar())
	}
	
}

/*
* @Nombre: NodoResta
* @Nombre de la clase base: NodoSuma
* @Descripción: Nodo binario (no terminal): resta de dos sub-expresiones
* @Variable de instancia 1:
*	@Nombre: this.izq
*	@Tipo: Nodo (variable)
*	@Descripción: Expresión que representa el minuendo
* @Variable de instancia 2:
*	@Nombre: this.der
*	@Tipo: Nodo (variable)
*	@Descripción: Expresión que representa sustraendo
*/
class NodoResta extends NodoSuma // nodo binario (no terminal): resta de dos sub-expresiones
{
	/*
	* @Descripción: Constructor del nodo
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre:
	*	@Tipo:
	*	@Descripción:
	*/
	constructor ( p_izq, p_der ) // p_izq,p_der son objetos de tipo 'Nodo'
	{
		super(p_izq,new NodoMenos(p_der)) ;
	}
}

/*
* @Nombre: NodoMult
* @Descripción: Nodo binario (no terminal): multiplicación de dos sub-expresiones
* @Variable de instancia 1:
*	@Nombre: this.izq
*	@Tipo: Nodo (variable)
*	@Descripción: Expresión que representa el primer factor
* @Variable de instancia 2:
*	@Nombre: this.der
*	@Tipo: Nodo (variable)
*	@Descripción: Expresión que representa el segundo factor
*/
class NodoMult
{
	/*
	* @Descripción: Constructor del nodo
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre:
	*	@Tipo:
	*	@Descripción:
	*/
	constructor ( p_izq, p_der )
	{
		this.izq = p_izq ;
		this.der = p_der ;
	}
	
	/*
	* @Descripción: Crea una copia idéntica independiente
	* @Valor devuelto: NodoMult copia
	*/
	clonar()
	{
		return new NodoMult( this.izq, this.der );
	}
	
	/*
	* @Descripción: Calcula la derivada del nodo
	* @Valor devuelto: Devuelve árbol correspondiente a la derivada respecto del identificador 'id'
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la que derivamos
	*/
	derivada( id )
	{
		return (new NodoSuma(	(new NodoMult( this.izq.derivada(id), this.der	)).simplificar(),
													(new NodoMult( this.izq, this.der.derivada(id)	) ).simplificar() )		 ).simplificar();		
	}
	
	/*
	* @Descripción: Indica la dependencia respecto a una variable
	* @Valor devuelto: Devuelve si el nodo depende de la variable 'id' como valor Boolean
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la se comprueba la dependencia
	*/
	dependeDe( id = undefined )
	{
		return (this.izq).dependeDe(id) || (this.der).dependeDe(id)
	}
	
	/*
	* @Descripción: Evalúa la expresión usando un diccionario
	* @Valor devuelto: Resultado numérico de evaluar la expresión
	* @Parámetro 1:
	*	@Nombre: dicc
	*	@Tipo: Object
	*	@Descripción: Objeto en el que las claves son los identificadores de las variables de las que se tiene el valor y los valores, los valores numéricos de éstas
	*/
	evaluar( dicc )
	{
		return (this.izq).evaluar( dicc ) * (this.der).evaluar( dicc ) ;
	}

	/*
	* @Descripción: Convierte a cadena la expresión
	* @Valor devuelto: String
	*/
	toString()
	{
		return "(" + this.izq.toString() +	" * " + this.der.toString() + ")" ;
	}
	
	/*
	* @Descripción: Cambia los nodos de identificador por el nodo como parámetro
	* @Valor devuelto: Árbol de nodos con los nodos identificador sustituidos
	* @Parámetro 1:
	*	@Nombre: change
	*	@Tipo: Object
	*	@Descripción: Nodo por el que sustituimos el identificador
	*/
	cambiaVar(change)
	{
		return new NodoMult( this.izq.cambiaVar(change), this.der.cambiaVar(change) );
	}
	
	/*
	* @Descripción: Simplifica la expresión
	* @Valor devuelto: Árbol de nodos simplificados
	*/
	simplificar()
	{
		//Hacemos un estudio para evaluar los nodos posibles y eliminar los productos por uno
		var auxI=this.izq.evaluar({})
		var auxD=this.der.evaluar({})
		if( ! isNaN(auxI) && isFinite(auxI) ){
			if(auxI==1.0)
				return this.der.simplificar()
			else if (auxI==0.0)
				return new NodoConst(0.0)
			else if( ! isNaN(auxD) && isFinite(auxD) ){
				if(auxD==1.0)
					return this.izq.simplificar()
				else
					return new NodoConst(auxI*auxD)
			}else
				return new NodoMult(this.der.simplificar(),new NodoConst(auxI))
		}else if(! isNaN(auxD) && isFinite(auxD)){
			if(auxD==1.0)
				return this.izq.simplificar()
			else if(auxD==0.0)
				return new NodoConst(0.0)
			else
				return new NodoMult(this.izq.simplificar(),new NodoConst(auxD))
		}else
			return new NodoMult(this.izq.simplificar(),this.der.simplificar())
	}
	
}

/*
* @Nombre: NodoDiv
* @Descripción: Nodo binario (no terminal): división de dos sub-expresiones
* @Variable de instancia 1:
*	@Nombre: this.izq
*	@Tipo: Nodo (variable)
*	@Descripción: Expresión que representa el numerador
* @Variable de instancia 2:
*	@Nombre: this.der
*	@Tipo: Nodo (variable)
*	@Descripción: Expresión que representa el denominador
*/
class NodoDiv
{
	/*
	* @Descripción: Constructor del nodo
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre:
	*	@Tipo:
	*	@Descripción:
	*/
	constructor ( p_izq, p_der )
	{
		this.izq = p_izq ;
		this.der = p_der ;
	}
	
	/*
	* @Descripción: Crea una copia idéntica independiente
	* @Valor devuelto: NodoDiv copia
	*/
	clonar()
	{
		return new NodoDiv( this.izq, this.der );
	}
	
	/*
	* @Descripción: Calcula la derivada del nodo
	* @Valor devuelto: Devuelve árbol correspondiente a la derivada respecto del identificador 'id'
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la que derivamos
	*/
	derivada( id )
	{
	
	
		return (new NodoDiv( (new NodoResta( ( new NodoMult( this.izq.derivada(id), this.der	) ).simplificar() , ( new NodoMult( this.izq, this.der.derivada(id)	) ).simplificar() )	).simplificar(),
						(new NodoExp(this.der,new NodoConst(2)) ).simplificar() )	).simplificar();	
		
	}
	
	/*
	* @Descripción: Indica la dependencia respecto a una variable
	* @Valor devuelto: Devuelve si el nodo depende de la variable 'id' como valor Boolean
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la se comprueba la dependencia
	*/
	dependeDe( id = undefined )
	{
		return (this.izq).dependeDe(id) || (this.der).dependeDe(id)
	}
	
	/*
	* @Descripción: Evalúa la expresión usando un diccionario
	* @Valor devuelto: Resultado numérico de evaluar la expresión
	* @Parámetro 1:
	*	@Nombre: dicc
	*	@Tipo: Object
	*	@Descripción: Objeto en el que las claves son los identificadores de las variables de las que se tiene el valor y los valores, los valores numéricos de éstas
	*/
	evaluar( dicc )
	{
		return (this.izq).evaluar( dicc ) / (this.der).evaluar( dicc ) ;
	}
	
	/*
	* @Descripción: Convierte a cadena la expresión
	* @Valor devuelto: String
	*/
	toString()
	{
		return "(" + this.izq.toString() +	" / " + this.der.toString() + ")" ;
	}
	
	/*
	* @Descripción: Cambia los nodos de identificador por el nodo como parámetro
	* @Valor devuelto: Árbol de nodos con los nodos identificador sustituidos
	* @Parámetro 1:
	*	@Nombre: change
	*	@Tipo: Object
	*	@Descripción: Nodo por el que sustituimos el identificador
	*/
	cambiaVar(change)
	{
		return new NodoDiv( this.izq.cambiaVar(change), this.der.cambiaVar(change) );
	}
	
	/*
	* @Descripción: Simplifica la expresión
	* @Valor devuelto: Árbol de nodos simplificados
	*/
	simplificar()
	{
		//Hacemos un estudio para eliminar las divisiones por uno y evaluar los nodos posibles
		var auxI=this.izq.evaluar({})
		var auxD=this.der.evaluar({})
		if( ! isNaN(auxI) && isFinite(auxI) ){
			if (auxI==0.0)
				return new NodoConst(0.0)
			else if( ! isNaN(auxD) && isFinite(auxD) ){
				if(auxD==1.0)
					return this.izq.simplificar()
				else
					return new NodoConst(auxI/auxD)
			}else
				return new NodoDiv(new NodoConst(auxI),this.der.simplificar())
		}else if(! isNaN(auxD) && isFinite(auxD)){
			if(auxD==1.0)
				return this.izq.simplificar()
			else if(auxD==0.0)
				return new NodoConst(NaN)
			else
				return new NodoDiv(this.izq.simplificar(),new NodoConst(auxD))
		}else
			return new NodoDiv(this.izq.simplificar(),this.der.simplificar())
	}
	
}

/*
* @Nombre: NodoExp
* @Descripción: Nodo binario (no terminal): exponenciación de dos sub-expresiones
* @Variable de instancia 1:
*	@Nombre: this.izq
*	@Tipo: Nodo (variable)
*	@Descripción: Expresión que representa la base
* @Variable de instancia 2:
*	@Nombre: this.der
*	@Tipo: Nodo (variable)
*	@Descripción: Expresión que representa el expoenete
*/
class NodoExp
{
	/*
	* @Descripción: Constructor del nodo
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre:
	*	@Tipo:
	*	@Descripción:
	*/
	constructor ( p_izq, p_der )
	{
		this.izq = p_izq ;
		this.der = p_der ;
	}
	
	/*
	* @Descripción: Crea una copia idéntica independiente
	* @Valor devuelto: NodoExp copia
	*/
	clonar() 
	{
		return new NodoExp( this.izq, this.der );
	}
	
	/*
	* @Descripción: Calcula la derivada del nodo
	* @Valor devuelto: Devuelve árbol correspondiente a la derivada respecto del identificador 'id'
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la que derivamos
	*/
	derivada( id )
	{	
	
		return (new NodoSuma(
					(new NodoMult( (new NodoMult( this.der ,
								(new NodoExp(this.izq, 
								(new NodoResta(this.der,new NodoConst(1)) ).simplificar() ) ).simplificar() ) ).simplificar() , this.izq.derivada(id)
								) ).simplificar()
				,
					(new NodoMult( (new NodoMult( (new NodoFun("log",this.izq) ).simplificar() ,
								(new NodoExp(this.izq, 
								( this.der ) ) ).simplificar() ) ).simplificar() , this.der.derivada(id)
								) ).simplificar()
						) ).simplificar()
	
	}
	
	/*
	* @Descripción: Indica la dependencia respecto a una variable
	* @Valor devuelto: Devuelve si el nodo depende de la variable 'id' como valor Boolean
	* @Parámetro 1:
	*	@Nombre: id
	*	@Tipo: String
	*	@Descripción: Identificador de la variable respecto a la se comprueba la dependencia
	*/
	dependeDe( id = undefined )
	{
		return (this.izq).dependeDe(id) || (this.der).dependeDe(id)
	}
	
	/*
	* @Descripción: Evalúa la expresión usando un diccionario
	* @Valor devuelto: Resultado numérico de evaluar la expresión
	* @Parámetro 1:
	*	@Nombre: dicc
	*	@Tipo: Object
	*	@Descripción: Objeto en el que las claves son los identificadores de las variables de las que se tiene el valor y los valores, los valores numéricos de éstas
	*/
	evaluar( dicc )
	{
		return Math.pow((this.izq).evaluar( dicc ), (this.der).evaluar( dicc ) );
	}
	
	/*
	* @Descripción: Convierte a cadena la expresión
	* @Valor devuelto: String
	*/
	toString() 
	{
		return "(" + this.izq.toString() +	" ^ " + this.der.toString() + ")" ;
	}
	
	/*
	* @Descripción: Cambia los nodos de identificador por el nodo como parámetro
	* @Valor devuelto: Árbol de nodos con los nodos identificador sustituidos
	* @Parámetro 1:
	*	@Nombre: change
	*	@Tipo: Object
	*	@Descripción: Nodo por el que sustituimos el identificador
	*/
	cambiaVar(change)
	{
		return new NodoExp( this.izq.cambiaVar(change), this.der.cambiaVar(change) );
	}
	
	/*
	* @Descripción: Simplifica la expresión
	* @Valor devuelto: Árbol de nodos simplificados
	*/
	simplificar()
	{
		 //Hacemos un estudio para evaluar los nodos posibles y eliminar las potencias de exponente o base cero y uno
		var auxI=this.izq.evaluar({})
		var auxD=this.der.evaluar({})
		if( ! isNaN(auxI) && isFinite(auxI) ){
			
			if(auxI==1.0)
				return new NodoConst(1.0)
			else if (auxI==0)
				return new NodoConst(0.0)
			else if( ! isNaN(auxD) && isFinite(auxD) ){				
				if(auxD==0)
					return new NodoConst(1.0)
				else
					return new NodoConst(Math.pow(auxI,auxD))
					
			}else
				return new NodoExp(new NodoConst(auxI),this.der.simplificar())
		}else if(! isNaN(auxD) && isFinite(auxD)){
			if(auxD==1.0)
				return this.izq.simplificar()
			else if(auxD==0.0)
				return new NodoConst(1.0)
			else
				return new NodoExp(this.izq.simplificar(),new NodoConst(auxD))
		}else
			return new NodoExp(this.izq.simplificar(),this.der.simplificar())
	}
}

/*
* @Descripción: Método de Runge-Kutta de orden 4 que resuelve, dado el PVI {x'(t)=f(t,x) ; x(t0)=x}, el valor de x(tf) con un paso de h
* @Valor devuelto: x(tf)
* @Parámetro 1:
*	@Nombre: f
*	@Tipo: Function
*	@Descripción: Función que calcula numéricamente la ecuación diferencial
*		@Valor devuelto: Valor numérico de la ecuación en un punto
*		@Parámetro 1:
*			@Tipo: Number
*			@Descripción: Valor numérico de la función "x" en el instante donde se evalúa la ecuación
*		@Parámetro 2:
*			@Tipo: Number
*			@Descripción: Instante donde evaluamos la ecuación
* @Parámetro 2:
*	@Nombre: tf
*	@Tipo: Number
*	@Descripción: Instante donde queremos calcular la solución de la EDO
* @Parámetro 3:
*	@Nombre: t0
*	@Tipo: Number
*	@Descripción: Instante inicial de la ecuación
* @Parámetro 4:
*	@Nombre: x
*	@Tipo: Number
* @Parámetro 5:
*	@Nombre: h
*	@Tipo: Number
*	@Descripción: Longitud de paso para realizar la integración numérica
*/
function RungeKutta4(f,tf,t0,x,h)
{
        var k1, k2, k3, k4
        for(let t=t0; (tf-t)>h; t+=h){
            k1=h*f(x, t);
            k2=h*f(x+k1/2, t+h/2);
            k3=h*f(x+k2/2, t+h/2);
            k4=h*f(x+k3, t+h);
            x+=(k1+2*k2+2*k3+k4)/6;
        }
		return x
}