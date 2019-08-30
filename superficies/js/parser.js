
/*
* @Nombre: NodoASA
* @Descripción: Almacena la información de un nodo del árbol sintáctico abstracto
* @Variable de instancia 1:
*	@Nombre: this.nodo
*	@Tipo: String
*	@Descripción: Nombre del nodo
* @Variable de instancia 2:
*	@Nombre: this.hijos
*	@Tipo: Array
*	@Descripción: Vector de los nodos hijos de tipo "NodoASA"
* @Variable de instancia 3:
*	@Nombre: estaSimplificado
*	@Tipo: Boolean
*	@Descripción: Indica si los hijos estás simplificados de nodos que empiezan por "A"
* @Variable de instancia 4:
*	@Nombre: this.atributo
*	@Tipo: Numeric
*	@Descripción: Indica, si procede, el valor del atributo del nodo el cual, depende del tipo de token consumido para generarlo
*/
class NodoASA{
	
	/*
	* @Descripción: Contructor de la clase
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre: nombre
	*	@Tipo: String
	*	@Descripción: Nombre del nodo a construir
	* @Parámetro 2: 
	*	@Nombre: ptrHijos
	*	@Tipo: Array
	*	@Descripción: Vector de los nodos hijos de tipo "NodoASA" que cuelgan del nodo construido
	* @Parámetro 3: 
	*	@Nombre: atributo
	*	@Tipo: Numeric 
	*	@Descripción: Indica, si procede, el valor del atributo del nodo, el cual depende del tipo de token consumido para generarlo, por defecto "undefined"
	* @Parámetro 4:
	*	@Nombre: simp
	*	@Tipo: Boolean
	*	@Descripción: Indica si los hijos están simplificados de nodos que empiezan por "A"
	*/
	constructor(nombre,ptrHijos=[],atributo=undefined,simp=false){
		
		//Estas varibales no pueden ser accedidas 
		this.nodo=nombre
		//Es un array luego hay que asignarle una copia con clonar del array hijos
		this.hijos=[]
		this.estaSimplificado=simp
		
		if(ptrHijos.length>0)
			this.hijos=ptrHijos.map(x=>x.clonar())
			
			
		
		this.atributo=atributo
		
											   
	}
	
	/*
	* @Descripción: Elimina los nodos que empiezan por A para simplificar el arbol
	* @Valor devuelto: "NodoASA" con los hijos simplificados
	*/
	simplificaA() //
	{
		if(!this.estaSimplificado){
			var simplificado=[]
			var aux
			
			//Para cada hijo
			for(let i=0; i<this.hijos.length;i++){
				//Eliminamos el nodo A y ponemos los hijos de este en su lugar 
				if(this.hijos[i].nodo!=undefined && this.hijos[i].nodo[0]=="A"){
					if(this.hijos[i].hijos.length>0)
						for(let j=0; j<this.hijos[i].hijos.length ; j++){
							if(this.hijos[i].hijos[j].nodo[0]!="A")
								simplificado.push(this.hijos[i].hijos[j].simplificaA())
							else{
								aux=this.hijos[i].hijos[j].simplificaA().hijos
								simplificado.push(...this.hijos[i].hijos[j].simplificaA().hijos)
							}
						}
		
				}else
					simplificado.push(this.hijos[i].simplificaA())
			}
			
			return new NodoASA(this.nodo,simplificado,this.atributo,true)
		}else
			return this.clonar()
	}
	
	/*
	* @Descripción: Convierte un ASA en un arbol de expresiones usando las clases de "arbolExp.js"
	* @Valor devuelto: Nodo de árbol de experiones (de "arbolExp.js")
	*/
	toArbolExp()
	{
		//Usamos una copia simplificada 
		var ASA=this.simplificaA()
		var arbolExp
		
		//Como conocemos la definicion de la gramática podemos hacer la trasformaciones según el nodo padre 
		switch(ASA.nodo){
			case "E":
			
				if(ASA.hijos.length==1)
					arbolExp=ASA.hijos[0].toArbolExp()
				else if(ASA.hijos.length==2){
					if(ASA.hijos[0].nodo=="+")
						arbolExp=ASA.hijos[1].toArbolExp()
					else if(ASA.hijos[0].nodo=="-")
						arbolExp=new NodoMenos(ASA.hijos[1].toArbolExp())
				}else if(ASA.hijos.length>2){
					if(ASA.hijos[0].nodo=="+")
						arbolExp=new NodoSuma(ASA.hijos[1].toArbolExp(),(new NodoASA(ASA.nodo,ASA.hijos.slice(2),ASA.atributo,ASA.estaSimplificado)).toArbolExp())
					else if(ASA.hijos[0].nodo=="-")
						arbolExp=new NodoSuma(new NodoMenos(ASA.hijos[1].toArbolExp()),(new NodoASA(ASA.nodo,ASA.hijos.slice(2),ASA.atributo,ASA.estaSimplificado)).toArbolExp())
					else
						arbolExp=new NodoSuma(ASA.hijos[0].toArbolExp(),(new NodoASA(ASA.nodo,ASA.hijos.slice(1),ASA.atributo,ASA.estaSimplificado)).toArbolExp())
				}
			break;
			
			case "E2":
				if(ASA.hijos.length==1)
					arbolExp=ASA.hijos[0].toArbolExp()
				else if(ASA.hijos.length==2){
					if(ASA.hijos[0].nodo=="*")
						arbolExp=ASA.hijos[1].toArbolExp()
					else if(ASA.hijos[0].nodo=="/")
						arbolExp=new NodoDiv(new NodoConst(1.0),ASA.hijos[1].toArbolExp())			
				}else if(ASA.hijos.length>2){
					if(ASA.hijos[1].nodo=="*" || ASA.hijos[1].nodo=="/")
						arbolExp=new NodoMult(ASA.hijos[0].toArbolExp(),(new NodoASA(ASA.nodo,ASA.hijos.slice(1),ASA.atributo,ASA.estaSimplificado)).toArbolExp())
					else if (ASA.hijos[0].nodo=="*")
						arbolExp=new NodoMult(ASA.hijos[1].toArbolExp(),(new NodoASA(ASA.nodo,ASA.hijos.slice(2),ASA.atributo,ASA.estaSimplificado)).toArbolExp())
					else if (ASA.hijos[0].nodo=="/")
						arbolExp=new NodoMult(new NodoDiv(new NodoConst(1.0),ASA.hijos[1].toArbolExp()),(new NodoASA(ASA.nodo,ASA.hijos.slice(2),ASA.atributo,ASA.estaSimplificado)).toArbolExp())
					
				}
			break;
			
			case "E3":
				if(ASA.hijos.length==1)
					arbolExp=ASA.hijos[0].toArbolExp()
				else if(ASA.hijos.length==2)
					arbolExp=ASA.hijos[1].toArbolExp()
				else if(ASA.hijos.length>2)
					if(ASA.hijos[0].nodo=="^")
						arbolExp=new NodoExp(ASA.hijos[1].toArbolExp(),(new NodoASA(ASA.nodo,ASA.hijos.slice(2),ASA.atributo,ASA.estaSimplificado)).toArbolExp())
					else
						arbolExp=new NodoExp(ASA.hijos[0].toArbolExp(),(new NodoASA(ASA.nodo,ASA.hijos.slice(1),ASA.atributo,ASA.estaSimplificado)).toArbolExp())
				
					
			break;
			
			case "E4":
				if(ASA.hijos.length==1)
					arbolExp=ASA.hijos[0].toArbolExp()
				else
					arbolExp=ASA.hijos[1].toArbolExp()
			break;
			
			case "T":
			
				switch(ASA.atributo){
					case CONSTANTE:
						switch(ASA.hijos[0].nodo){
							case "PI":
								arbolExp=new NodoConst(Math.PI)
							break;
							
							case "E":
								arbolExp=new NodoConst(Math.E)
							break;
							default:
								arbolExp=new NodoConst(parseFloat(ASA.hijos[0].nodo))
						}
					break;
					
					case VARIABLE:
						arbolExp=new NodoIdent(ASA.hijos[0].nodo)
					break;
					
					case FUNCION:
						arbolExp=new NodoFun(ASA.hijos[0].nodo,...ASA.hijos[2].toArbolExp())
					break;
					
				}
			
			
			break;
			
			case "B":
				arbolExp=[ASA.hijos[0].toArbolExp()].concat(...ASA.hijos[1].toArbolExp())
			break;
			
			case "R":
				if(ASA.hijos.length==0)
					arbolExp=[]
				else
					arbolExp=ASA.hijos[1].toArbolExp()
			break;
			
			
			default:
			
			break;
			
		}
		
		return arbolExp
		
	}
	
	/*
	* @Descripción: Clona el nodo 
	* @Valor devuelto: NodoASA clonado
	*/
	clonar() //Puedo clonar nodos
	{
		return new NodoASA(this.nodo,this.hijos,this.atributo,this.estaSimplificado)
	}
		
	
	
}


//***************
//*
//*	Funciones que dada una lista de tokens generan el arbol de sintáctico correspondiente
//* Se basa en el análisis descendente predictivo ya que la gramática cumple no recursividad a la izquierda y está factorizada.
//*
//***************


/*
* @Descripción: Resuelve la producción "E" de nuestra gramática
* @Valor devuelto: Objeto con los siguientes valores:
*	@Atributo 1:
*		@Nombre: hijos
*		@Tipo: Array
*		@Descripción: Vector de "NodoASA" que contiene la producción realizada
*	@Atributo 2:
*		@Nombre: tokens
*		@Tipo: Array
*		@Descripción: Resto de tokens no usados para completar la producción
*	@Atributo 3:
*		@Nombre: err
*		@Tipo: Boolean
*		@Descripción: Indica si se ha producido un error
*	@Atributo 4:
*		@Nombre: mensajeErr
*		@Tipo: String
*		@Descripción: Atributo opcional que se da cuando hay un error describiendo éste
* @Parámetro 1:
*	@Nombre: tokens
*	@Tipo: Array
*	@Descripción: Array de tokens por resolver con la producción actual
*/
function resuelveE(tokens){
	 var aux
	 var resul={hijos:[],tokens: tokens, err: false }
	 
	 if(resul.tokens.length<1){
		 resul.err=true
		 resul.mensajeErr="Error sintáctico: Falta una expresión"
	 }		
	 
	 var primer_token=resul.tokens[0].token
	 if(!resul.err){
		 if(primer_token==MAS || primer_token==MENOS)
			 resul.hijos.push(new NodoASA(resul.tokens.shift().valor))
		 
		 aux=resuelveE2(tokens)
		 if(aux.err){
			 resul.err=true
			 resul.mensajeErr=aux.mensajeErr
		 }else{
			 resul.hijos.push(new NodoASA("E2",aux.hijos))
			 aux=resuelveA2(tokens)
			 if(aux.err){
				 resul.err=true
				 resul.mensajeErr=aux.mensajeErr
			 }else
				 resul.hijos.push(new NodoASA("A2",aux.hijos))
			 
		 }
	 }
	
	 return resul
 }

/*
* @Descripción: Resuelve la producción "A2" de nuestra gramática
* @Valor devuelto: Objeto con los siguientes valores:
*	@Atributo 1:
*		@Nombre: hijos
*		@Tipo: Array
*		@Descripción: Vector de "NodoASA" que contiene la producción realizada
*	@Atributo 2:
*		@Nombre: tokens
*		@Tipo: Array
*		@Descripción: Resto de tokens no usados para completar la producción
*	@Atributo 3:
*		@Nombre: err
*		@Tipo: Boolean
*		@Descripción: Indica si se ha producido un error
*	@Atributo 4:
*		@Nombre: mensajeErr
*		@Tipo: String
*		@Descripción: Atributo opcional que se da cuando hay un error describiendo éste
* @Parámetro 1:
*	@Nombre: tokens
*	@Tipo: Array
*	@Descripción: Array de tokens por resolver con la producción actual
*/
function resuelveA2(tokens){
	 var aux
	 var nodosHijo
	 var resul={hijos:[],tokens: tokens, err: false }
	 
 
	 if(resul.tokens.length==0)
		return resul
	
	 var primer_token=resul.tokens[0].token
	 switch(primer_token){
		 case PARENTESIS_IZQ:
		 case PARENTESIS_DER:
		 case OP_MULT:
		 case OP_DIV:
		 case CONSTANTE:
		 case VARIABLE:
		 case FUNCION:
		 case OPERADOR_EXP:
		 case COMA:
		 break;
		 case MAS:
		 case MENOS:
			 resul.hijos.push(new NodoASA(resul.tokens.shift().valor))
			 aux=resuelveE2(tokens)
			 if(aux.err){
				 resul.err=true
				 resul.mensajeErr=aux.mensajeErr
				 break;
			 }
			 resul.hijos.push(new NodoASA("E2",aux.hijos))
			 aux=resuelveA2(tokens)
			 if(aux.err){
				 resul.err=true
				 resul.mensajeErr=aux.mensajeErr
			 }else
				 resul.hijos.push(new NodoASA("A2",aux.hijos))
			 
		 break;
		 default:
			resul.err=true
			resul.mensajeErr="Error sintáctico: Token no esperado" 
	 } 
	 
	
	 return resul
}

/*
* @Descripción: Resuelve la producción "E2" de nuestra gramática
* @Valor devuelto: Objeto con los siguientes valores:
*	@Atributo 1:
*		@Nombre: hijos
*		@Tipo: Array
*		@Descripción: Vector de "NodoASA" que contiene la producción realizada
*	@Atributo 2:
*		@Nombre: tokens
*		@Tipo: Array
*		@Descripción: Resto de tokens no usados para completar la producción
*	@Atributo 3:
*		@Nombre: err
*		@Tipo: Boolean
*		@Descripción: Indica si se ha producido un error
*	@Atributo 4:
*		@Nombre: mensajeErr
*		@Tipo: String
*		@Descripción: Atributo opcional que se da cuando hay un error describiendo éste
* @Parámetro 1:
*	@Nombre: tokens
*	@Tipo: Array
*	@Descripción: Array de tokens por resolver con la producción actual
*/
function resuelveE2(tokens){
	 var aux
	 var resul={hijos:[],tokens: tokens, err: false }
	 
	 if(resul.tokens.length<1){
		 resul.err=true
		 resul.mensajeErr="Error sintáctico: Falta una expresión"
	 }		
	 
	 if(!resul.err){
		 aux=resuelveE3(tokens)
		 if(aux.err){
			 resul.err=true
			 resul.mensajeErr=aux.mensajeErr
		 }else{
			 resul.hijos.push(new NodoASA("E3",aux.hijos))
			 aux=resuelveA3(tokens)
			 if(aux.err){
				 resul.err=true
				 resul.mensajeErr=aux.mensajeErr
			 }else
				 resul.hijos.push(new NodoASA("A3",aux.hijos))
			 
		 }
	 }
	
	 return resul
}
 

/*
* @Descripción: Resuelve la producción "A3" de nuestra gramática
* @Valor devuelto: Objeto con los siguientes valores:
*	@Atributo 1:
*		@Nombre: hijos
*		@Tipo: Array
*		@Descripción: Vector de "NodoASA" que contiene la producción realizada
*	@Atributo 2:
*		@Nombre: tokens
*		@Tipo: Array
*		@Descripción: Resto de tokens no usados para completar la producción
*	@Atributo 3:
*		@Nombre: err
*		@Tipo: Boolean
*		@Descripción: Indica si se ha producido un error
*	@Atributo 4:
*		@Nombre: mensajeErr
*		@Tipo: String
*		@Descripción: Atributo opcional que se da cuando hay un error describiendo éste
* @Parámetro 1:
*	@Nombre: tokens
*	@Tipo: Array
*	@Descripción: Array de tokens por resolver con la producción actual
*/
function resuelveA3(tokens){
	 var aux
	 var nodosHijo
	 var resul={hijos:[],tokens: tokens, err: false }
	 
	 if(!resul.err){
		 if(resul.tokens.length==0)
			return resul
		
		 var primer_token=resul.tokens[0].token
		 switch(primer_token){
			 case PARENTESIS_IZQ:
			 case PARENTESIS_DER:
			 case MAS:
			 case MENOS:
			 case CONSTANTE:
			 case VARIABLE:
			 case FUNCION:
			 case OPERADOR_EXP:
			 case COMA:
			 break;
			 case OP_MULT:
			 case OP_DIV:
				 resul.hijos.push(new NodoASA(resul.tokens.shift().valor))
				 aux=resuelveE3(tokens)
				 if(aux.err){
					 resul.err=true
					 resul.mensajeErr=aux.mensajeErr
					 break;
				 }
				 resul.hijos.push(new NodoASA("E3",aux.hijos))
				 aux=resuelveA3(tokens)
				 if(aux.err){
					 resul.err=true
					 resul.mensajeErr=aux.mensajeErr
				 }else
					 resul.hijos.push(new NodoASA("A3",aux.hijos))
			 break;
			 default:
				resul.err=true
				resul.mensajeErr="Error sintáctico: Token no esperado" 
		 } 
	 }
	
	 return resul
}

/*
* @Descripción: Resuelve la producción "E3" de nuestra gramática
* @Valor devuelto: Objeto con los siguientes valores:
*	@Atributo 1:
*		@Nombre: hijos
*		@Tipo: Array
*		@Descripción: Vector de "NodoASA" que contiene la producción realizada
*	@Atributo 2:
*		@Nombre: tokens
*		@Tipo: Array
*		@Descripción: Resto de tokens no usados para completar la producción
*	@Atributo 3:
*		@Nombre: err
*		@Tipo: Boolean
*		@Descripción: Indica si se ha producido un error
*	@Atributo 4:
*		@Nombre: mensajeErr
*		@Tipo: String
*		@Descripción: Atributo opcional que se da cuando hay un error describiendo éste
* @Parámetro 1:
*	@Nombre: tokens
*	@Tipo: Array
*	@Descripción: Array de tokens por resolver con la producción actual
*/
function resuelveE3(tokens){
	 var aux
	 var resul={hijos:[],tokens: tokens, err: false }
	 
	 if(resul.tokens.length<1){
		 resul.err=true
		 resul.mensajeErr="Error sintáctico: Falta una expresión"
	 }		
	 
	 if(!resul.err){
		 aux=resuelveE4(tokens)
		 if(aux.err){
			 resul.err=true
			 resul.mensajeErr=aux.mensajeErr
		 }else{
			 resul.hijos.push(new NodoASA("E4",aux.hijos))
			 aux=resuelveA4(tokens)
			 if(aux.err){
				 resul.err=true
				 resul.mensajeErr=aux.mensajeErr
			 }else
				 resul.hijos.push(new NodoASA("A4",aux.hijos))
			 
		 }
		 
	 }
	
	 return resul
}

/*
* @Descripción: Resuelve la producción "A4" de nuestra gramática
* @Valor devuelto: Objeto con los siguientes valores:
*	@Atributo 1:
*		@Nombre: hijos
*		@Tipo: Array
*		@Descripción: Vector de "NodoASA" que contiene la producción realizada
*	@Atributo 2:
*		@Nombre: tokens
*		@Tipo: Array
*		@Descripción: Resto de tokens no usados para completar la producción
*	@Atributo 3:
*		@Nombre: err
*		@Tipo: Boolean
*		@Descripción: Indica si se ha producido un error
*	@Atributo 4:
*		@Nombre: mensajeErr
*		@Tipo: String
*		@Descripción: Atributo opcional que se da cuando hay un error describiendo éste
* @Parámetro 1:
*	@Nombre: tokens
*	@Tipo: Array
*	@Descripción: Array de tokens por resolver con la producción actual
*/
function resuelveA4(tokens){
	 var aux
	 var nodosHijo
	 var resul={hijos:[],tokens: tokens, err: false }
	 
	 if(!resul.err){
		 if(resul.tokens.length==0)
			return resul
		
		 var primer_token=resul.tokens[0].token
		 switch(primer_token){
			 case PARENTESIS_IZQ:
			 case PARENTESIS_DER:
			 case MAS:
			 case MENOS:
			 case OP_MULT:
			 case OP_DIV:
			 case CONSTANTE:
			 case VARIABLE:
			 case FUNCION:
			 case COMA:
			 break;
			 case OPERADOR_EXP:
				 resul.hijos.push(new NodoASA(resul.tokens.shift().valor))
				 aux=resuelveE4(tokens)
				 if(aux.err){
					 resul.err=true
					 resul.mensajeErr=aux.mensajeErr
					 break;
				 }
				 resul.hijos.push(new NodoASA("E4", aux.hijos))
				 aux=resuelveA4(tokens)
				 if(aux.err){
					 resul.err=true
					 resul.mensajeErr=aux.mensajeErr
				 }else
					 resul.hijos.push(new NodoASA("A4",aux.hijos))
			 break;
			 default:
				resul.err=true
				resul.mensajeErr="Error sintáctico: Token no esperado" 
		 } 
	 }
	
	 return resul
}


/*
* @Descripción: Resuelve la producción "E4" de nuestra gramática
* @Valor devuelto: Objeto con los siguientes valores:
*	@Atributo 1:
*		@Nombre: hijos
*		@Tipo: Array
*		@Descripción: Vector de "NodoASA" que contiene la producción realizada
*	@Atributo 2:
*		@Nombre: tokens
*		@Tipo: Array
*		@Descripción: Resto de tokens no usados para completar la producción
*	@Atributo 3:
*		@Nombre: err
*		@Tipo: Boolean
*		@Descripción: Indica si se ha producido un error
*	@Atributo 4:
*		@Nombre: mensajeErr
*		@Tipo: String
*		@Descripción: Atributo opcional que se da cuando hay un error describiendo éste
* @Parámetro 1:
*	@Nombre: tokens
*	@Tipo: Array
*	@Descripción: Array de tokens por resolver con la producción actual
*/
function resuelveE4(tokens){
	 var aux
	 var nodosHijo
	 var resul={hijos:[],tokens: tokens, err: false }
	 
	 if(resul.tokens.length<1){
		 resul.err=true
		 resul.mensajeErr="Error sintáctico: Falta una expresión"
	 }		
	 
	 if(!resul.err){
		 var primer_token=resul.tokens[0].token
		 switch(primer_token){
			 case PARENTESIS_IZQ:
				 resul.tokens.shift()
				 resul.hijos.push(new NodoASA("("))
				 aux=resuelveE(resul.tokens)
				 if(aux.err){
					 resul.err=true
					 resul.mensajeErr=aux.mensajeErr
					 break;
				 }
				 resul.tokens=aux.tokens
				 nodosHijo=aux.hijos
				 resul.hijos.push(new NodoASA("E", nodosHijo))
				 if(resul.tokens.length>0 && resul.tokens.shift().token==PARENTESIS_DER)
					 resul.hijos.push(new NodoASA(")"))
				 else{
					 resul.err=true
					 resul.mensajeErr="Error sintáctico: Se esperaba un paréntesis derecho"
				 }			
			 
			 break;
			 
			 case PARENTESIS_DER:
				resul.err=true
				resul.mensajeErr="Error sintáctico: Paréntesis derecho no esperado"
			 break;			 
			 case CONSTANTE:
			 case VARIABLE:
			 case FUNCION:
				 aux=resuelveT(tokens)
				 if(aux.err){
					 resul.err=true
					 resul.mensajeErr=aux.mensajeErr
					 break;
				 }
				 resul.tokens=aux.tokens
				 nodosHijo=aux.hijos
				 resul.hijos.push(new NodoASA("T", nodosHijo,primer_token))
			 break;
			 case OPERADOR_EXP:
			 case MAS:
			 case MENOS:
			 case OP_MULT:
			 case OP_DIV:
				resul.err=true
				resul.mensajeErr="Error sintáctico: No se esperaba el operador "+resul.tokens[0].valor
			 break;			 
			 
			 case COMA:
				resul.err=true
				resul.mensajeErr="Error sintáctico: No se esperaba una coma"
			 break;
			 
			 default:
				resul.err=true
				resul.mensajeErr="Error sintáctico: Token no esperado"			 
		 } 
	 }
	
	 return resul
 }
 
/*
* @Descripción: Resuelve la producción "T" de nuestra gramática
* @Valor devuelto: Objeto con los siguientes valores:
*	@Atributo 1:
*		@Nombre: hijos
*		@Tipo: Array
*		@Descripción: Vector de "NodoASA" que contiene la producción realizada
*	@Atributo 2:
*		@Nombre: tokens
*		@Tipo: Array
*		@Descripción: Resto de tokens no usados para completar la producción
*	@Atributo 3:
*		@Nombre: err
*		@Tipo: Boolean
*		@Descripción: Indica si se ha producido un error
*	@Atributo 4:
*		@Nombre: mensajeErr
*		@Tipo: String
*		@Descripción: Atributo opcional que se da cuando hay un error describiendo éste
* @Parámetro 1:
*	@Nombre: tokens
*	@Tipo: Array
*	@Descripción: Array de tokens por resolver con la producción actual
*/
function resuelveT(tokens){
	 var lexema
	 var aux
	 var nodosHijo
	 var resul={hijos:[],tokens: tokens, err: false }
	 
	 if(resul.tokens.length<1){
		 resul.err=true
		 resul.ERR="Falta un terminal"
	 }
		 
	 
	 if(!resul.err){
		 var primer_token=resul.tokens[0].token
		 switch(primer_token){
			 case PARENTESIS_IZQ:
				resul.err=true
				resul.mensajeErr="Error sintáctico: Paréntesis izquierdo no esperado"			
			 
			 break;
			 
			 case PARENTESIS_DER:
				resul.err=true
				resul.mensajeErr="Error sintáctico: Paréntesis derecho no esperado"
			 break;
			 
			 case MAS:
			 case MENOS:
				resul.err=true
				resul.mensajeErr="Error sintáctico: No se esperaba "+resul.tokens[0].valor
			 break;
			 
			 case COMA:
				resul.err=true
				resul.mensajeErr="Error sintáctico: No se esperaba una coma"
			 break;
			 
			 case CONSTANTE:
			 case VARIABLE:
				 resul.hijos.push(new NodoASA(resul.tokens.shift().valor))
			 break;
			 case FUNCION:
				 lexema=resul.tokens.shift().valor
				 resul.hijos.push(new NodoASA(lexema))
				 if(resul.tokens.length>0 && resul.tokens.shift().token==PARENTESIS_IZQ){
					 resul.hijos.push(new NodoASA("("))
					 aux=resuelveB(resul.tokens)
					 if(aux.err){
						 resul.err=true
						 resul.mensajeErr=aux.mensajeErr
						 break;
					 }
					 resul.tokens=aux.tokens
					 nodosHijo=aux.hijos
					 resul.hijos.push(new NodoASA("B",nodosHijo))
					 if(resul.tokens.length>0 && resul.tokens.shift().token==PARENTESIS_DER)
						 resul.hijos.push(new NodoASA(")"))
					 else{
						 resul.err=true
						 resul.mensajeErr="Error sintáctico: Se esperaba un paréntesis derecho"
					 }
				 }else{
					 resul.err=true
					 resul.mensajeErr="Error sintáctico: Se esperaba argumento de la función "+lexema
					 
				 }
			 break;
			 case OP_MULT:
			 case OP_DIV:
				resul.err=true
				resul.mensajeErr="Error sintáctico: No se esperaba el operador "+resul.tokens[0].valor
			 break;
			 
			 case OPERADOR_EXP:
				resul.err=true
				resul.mensajeErr="Error sintáctico: No se esperaba operador ^"
			 break;
			 			 
			 default:
				resul.err=true
				resul.mensajeErr="Error sintáctico: Token no esperado"
		 } 
	 }
	
	 return resul
}

/*
* @Descripción: Resuelve la producción "B" de nuestra gramática
* @Valor devuelto: Objeto con los siguientes valores:
*	@Atributo 1:
*		@Nombre: hijos
*		@Tipo: Array
*		@Descripción: Vector de "NodoASA" que contiene la producción realizada
*	@Atributo 2:
*		@Nombre: tokens
*		@Tipo: Array
*		@Descripción: Resto de tokens no usados para completar la producción
*	@Atributo 3:
*		@Nombre: err
*		@Tipo: Boolean
*		@Descripción: Indica si se ha producido un error
*	@Atributo 4:
*		@Nombre: mensajeErr
*		@Tipo: String
*		@Descripción: Atributo opcional que se da cuando hay un error describiendo éste
* @Parámetro 1:
*	@Nombre: tokens
*	@Tipo: Array
*	@Descripción: Array de tokens por resolver con la producción actual
*/
function resuelveB(tokens){

	 var aux
	 var resul={hijos:[],tokens: tokens, err: false }
	 
	 if(resul.tokens.length<1){
		 resul.err=true
		 resul.mensajeErr="Error sintáctico: Falta una expresión"
	 }		
	 
	 if(!resul.err){
		 aux=resuelveE(tokens)
		 if(aux.err){
			 resul.err=true
			 resul.mensajeErr=aux.mensajeErr
		 }else{
			 resul.hijos.push(new NodoASA("E",aux.hijos))
			 aux=resuelveR(tokens)
			 if(aux.err){
				 resul.err=true
				 resul.mensajeErr=aux.mensajeErr
			 }else
				 resul.hijos.push(new NodoASA("R",aux.hijos))
			 
		 }
	 }
	
	 return resul

 }

/*
* @Descripción: Resuelve la producción "R" de nuestra gramática
* @Valor devuelto: Objeto con los siguientes valores:
*	@Atributo 1:
*		@Nombre: hijos
*		@Tipo: Array
*		@Descripción: Vector de "NodoASA" que contiene la producción realizada
*	@Atributo 2:
*		@Nombre: tokens
*		@Tipo: Array
*		@Descripción: Resto de tokens no usados para completar la producción
*	@Atributo 3:
*		@Nombre: err
*		@Tipo: Boolean
*		@Descripción: Indica si se ha producido un error
*	@Atributo 4:
*		@Nombre: mensajeErr
*		@Tipo: String
*		@Descripción: Atributo opcional que se da cuando hay un error describiendo éste
* @Parámetro 1:
*	@Nombre: tokens
*	@Tipo: Array
*	@Descripción: Array de tokens por resolver con la producción actual
*/
function resuelveR(tokens){
	 var aux
	 var nodosHijo
	 var resul={hijos:[],tokens: tokens, err: false }
	 
	 if(!resul.err){
		 if(resul.tokens.length==0)
			return resul
		
		 var primer_token=resul.tokens[0].token
		 switch(primer_token){
			 case PARENTESIS_IZQ:
			 case PARENTESIS_DER:
			 case OP_MULT:
			 case OP_DIV:
			 case CONSTANTE:
			 case VARIABLE:
			 case FUNCION:
			 case OPERADOR_EXP:
			 case MAS:
			 case MENOS:
			 break;
			 case COMA:
				 resul.hijos.push(new NodoASA(resul.tokens.shift().valor))
				 aux=resuelveB(tokens)
				 if(aux.err){
					 resul.err=true
					 resul.mensajeErr=aux.mensajeErr
					 break;
				 }
				 resul.hijos.push(new NodoASA("B", aux.hijos))
			 break;
			 default:
				resul.err=true
				resul.mensajeErr="Error sintáctico: Token no esperado" 
		 } 
	 }
	
	 return resul
}
 
//*/

/*
* @Descripción: Hace el análisis sintáctico de una cadena de tokens dada nuestra gramática
* @Valor devuelto: Un "NodoASA" que representa al árbol sintáctico abstracto
* @Parámetro 1:
*	@Nombre: tokens
*	@Tipo: Array
*	@Descripción: Array de tokens a analizar sintácticamente
* @Parámetro 2:
*	@Nombre: gSimp
*	@Tipo: Boolean
*	@Descripción: Indica si hacemos una simplificación de ASA tras hacer el análisis sintáctico de los tokens
*/
function parser(tokens,gSimp=true){
	 if((typeof tokens)!="string"){
		 var aux=resuelveE(tokens.slice())
		 var ASA	 
		 
		 if(aux.err){
			 alert(aux.mensajeErr)
			 throw new Error(aux.mensajeErr)
		 }else if(aux.tokens.length>0){
			 alert("Error sintáctico: "+aux.tokens[0].valor+" no esperado")
			 throw new Error("Error sintáctico: "+aux.tokens[0].valor+" no esperado")
		 }else if(gSimp){
			ASA=new NodoASA("E",aux.hijos)	
			ASA=ASA.simplificaA()
		 }else
			 ASA=new NodoASA("E",aux.hijos)
	 }else{
		 alert("Error léxico: Cadena de texto no valida \""+ tokens +"\"")
		 throw new Error("Error léxico: Cadena de texto no valida \""+ tokens +"\"")
	 }
	 return ASA
}
 
