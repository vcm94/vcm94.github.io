/**
 * Analizador lexico
 */

//Token
const CONSTANTE					=1
const MAS						=2
const MENOS						=3
const OP_MULT					=4
const OP_DIV					=5
const OPERADOR_EXP				=6
const PARENTESIS_IZQ			=7
const PARENTESIS_DER			=8
const FUNCION					=9
const VARIABLE					=10
const COMA						=11
//Expresiones regulares de javascript
const reNumeros =/[0-9]+\.[0-9]+|[0-9]+/
const reVariable=/[a-zA-Z]([a-zA-Z]*[0-9]*)*/
const reFunciones=/(a{0,1}(cos|sen|tan)h{0,1})|log|exp|sqrt|int/


/*
* @Nombre: Token
* @Descripción: representa un token y su valor
* @Variable de instancia 1:
*	@Nombre: this.token
*	@Tipo: Numeric
*	@Descripción: Valor entero que representa el token
* @Variable de instancia 2:
*	@Nombre: this.valor
*	@Tipo: String
*	@Descripción: Cadena trasformada a token
*/
class Token{
	
	constructor(p_token,p_valor){
		
		this.token=p_token
		this.valor=p_valor
	}
	
}

/*
* @Descripción: Función que analiza una cadena y devuelve los token correspondientes
* @Valor devuelto: Array de objetos "Token" en el orden analizado o una cadena "String" ccn un mensaje de error
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
			 token.push(new Token(MAS,simbolo_actual))
		 else if(/-/.test(simbolo_actual))
			 token.push(new Token(MENOS,simbolo_actual))
		 else if(/[\*]/.test(simbolo_actual))
			 token.push(new Token(OP_MULT,simbolo_actual))
		 else if(/\//.test(simbolo_actual))
			 token.push(new Token(OP_DIV,simbolo_actual))
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
			 token.push(new Token(CONSTANTE,aux))
			 indice_actual+=aux.length-1
		 }else if(expr.search(reVariable)==0){
			 aux=expr.match(reVariable)[0]
			 if(aux!="PI" && aux!="E"){
				 token.push(new Token(VARIABLE,aux))
				 indice_actual+=aux.length-1
			}else if(aux=="E")
				 token.push(new Token(CONSTANTE,"E"))
			 else if(aux=="PI"){
				 token.push(new Token(CONSTANTE,"PI"))
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