/**
 * Analizador léxico
 */

//Token
const OPERANDO					=1
const OP_MASMENOS				=2
const OP_MULTDIV				=3
const OPERADOR_EXP				=4
const PARENTESIS_IZQ			=5
const PARENTESIS_DER			=6
const FUNCION					=7
const COMA						=8

//Expresiones regulares de javascript
const reNumeros =/[0-9]+\.[0-9]+|[0-9]+/
const reVariable=/[a-zA-Z]([a-zA-Z]*[0-9]*)*/
const reFunciones=/(a{0,1}(cos|sen|tan)h{0,1})|log|exp|sqrt|int/


/*
* @Nombre: Token
* @Descripción: representa un token y su valor
* @Variable de instancia 1:
*	@Nombre: this.token
*	@Tipo: Number
*	@Descripción: Valor entero que representa el token
* @Variable de instancia 2:
*	@Nombre: this.valor
*	@Tipo: String
*	@Descripción: Cadena trasformada a token
* @Variable de instancia 3:
*	@Nombre: this.atributo
*	@Tipo: Number
*	@Descripción: Atributo del token, opcional
*/
class Token{
	
	/*
	* @Descripción: Construye un token dados unos parámetros de entrada
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre: p_token
	*	@Tipo: Number
	*	@Descripción: Valor entero que representa el token
	* @Parámetro 2:
	*	@Nombre: p_valor
	*	@Tipo: String
	*	@Descripción: Cadena trasformada a token
	* @Parámetro 3:
	*	@Nombre: p_atributo
	*	@Tipo: Number
	*	@Descripción: Atributo del token, opcional
	*/
	constructor(p_token,p_valor,p_atributo=undefined){
		
		this.token=p_token
		this.valor=p_valor
		this.atributo=p_atributo
	}
	
}

/*
* @Descripción: Función que analiza una cadena y devuelve los token correspondientes
* @Valor devuelto: Array de objetos "Token" en el orden analizado o una cadena "String" con un mensaje de error
* @Parámetro 1:
*	@Nombre: expr
*	@Tipo: String
*	@Descripción: Cadena de expresiones a analizar
*/
function lexer(expr){
	 var sumbolo_actual
	 var indice_actual
	 var aux
	 var noErr=true
	 var token=[]
	 
	 //Analizamos la cadena buscando token
	 while(expr.length>0 && noErr){
		 indice_actual=0
		 simbolo_actual=expr[indice_actual]
		 if(/\+/.test(simbolo_actual))
			 token.push(new Token(OP_MASMENOS,simbolo_actual,0))
		 else if(/-/.test(simbolo_actual))
			 token.push(new Token(OP_MASMENOS,simbolo_actual,1))
		 else if(/[\*]/.test(simbolo_actual))
			 token.push(new Token(OP_MULTDIV,simbolo_actual,0))
		 else if(/\//.test(simbolo_actual))
			 token.push(new Token(OP_MULTDIV,simbolo_actual,1))
		 else if(/\(/.test(simbolo_actual))
			 token.push(new Token(PARENTESIS_IZQ,simbolo_actual))
		 else if(/\)/.test(simbolo_actual))
			 token.push(new Token(PARENTESIS_DER,simbolo_actual))
		 else if(/\^/.test(simbolo_actual))
			 token.push(new Token(OPERADOR_EXP,simbolo_actual))
		 else if(/,/.test(simbolo_actual))
			 token.push(new Token(COMA,simbolo_actual))
		 else if(expr.search(reFunciones)==0){
			 aux=expr.match(reFunciones)[0]
			 token.push(new Token(FUNCION,aux))
			 indice_actual+=aux.length-1
		 }else if(expr.search(reNumeros)==0){
			 aux=expr.match(reNumeros)[0]
			 token.push(new Token(OPERANDO,aux,0))
			 indice_actual+=aux.length-1
		 }else if(expr.search(reVariable)==0){
			 aux=expr.match(reVariable)[0]
			 if(aux!="PI" && aux!="E"){
				 token.push(new Token(OPERANDO,aux,1))
				 indice_actual+=aux.length-1
			}else if(aux=="E")
				 token.push(new Token(OPERANDO,"E",0))
			 else if(aux=="PI"){
				 token.push(new Token(OPERANDO,"PI",0))
				 indice_actual++
			 }
		 }else if(!/ \n/.test(simbolo_actual))
			noErr=false
			 
		 if(noErr){
			indice_actual++
			expr=expr.substr(indice_actual)
		 }
	 }
	 
	 if(!noErr)
		 token=simbolo_actual
	 
	 return token
 }