//Tolerancia que admitimos para considerar una superficie con curvatura constante
var tolerancia=0.002


/*
* @Descripción: Método de Runge-Kutta de orden 4 para un sistema de 3 EDOs
* @Valor devuelto: Vector de 3 componentes con la integración numérica de cada ecuación
* @Parámetro 1:
*	@Nombre: f
*	@Tipo: Function
*	@Descripción: Función que calcula numéricamente la primera ecuación
*		@Valor devuelto: Valor numérico de la primera ecuación en un punto
*		@Parámetro 1:
*			@Tipo: Number
*			@Descripción: Valor numérico de la primera función en el instante donde se evalúa la ecuación
*		@Parámetro 2:
*			@Tipo: Number
*			@Descripción: Valor numérico de la segunda función en el instante donde se evalúa la ecuación
*		@Parámetro 3:
*			@Tipo: Number
*			@Descripción: Valor numérico de la tercera función en el instante donde se evalúa la ecuación
*		@Parámetro 4:
*			@Tipo: Number
*			@Descripción: Instante donde evaluamos la ecuación
* @Parámetro 2:
*	@Nombre: g
*	@Tipo: Function
*	@Descripción: Función que calcula numéricamente la segunda ecuación
*		@Valor devuelto: Valor numérico de la segunda ecuación en un punto
*		@Parámetro 1:
*			@Tipo: Number
*			@Descripción: Valor numérico de la primera función en el instante donde se evalúa la ecuación
*		@Parámetro 2:
*			@Tipo: Number
*			@Descripción: Valor numérico de la segunda función en el instante donde se evalúa la ecuación
*		@Parámetro 3:
*			@Tipo: Number
*			@Descripción: Valor numérico de la tercera función en el instante donde se evalúa la ecuación
*		@Parámetro 4:
*			@Tipo: Number
*			@Descripción: Instante donde evaluamos la ecuación
* @Parámetro 3:
*	@Nombre: a
*	@Tipo: Function
*	@Descripción: Función que calcula numéricamente la tercera ecuación
*		@Valor devuelto: Valor numérico de la tercera ecuación en un punto
*		@Parámetro 1:
*			@Tipo: Number
*			@Descripción: Valor numérico de la primera función en el instante donde se evalúa la ecuación
*		@Parámetro 2:
*			@Tipo: Number
*			@Descripción: Valor numérico de la segunda función en el instante donde se evalúa la ecuación
*		@Parámetro 3:
*			@Tipo: Number
*			@Descripción: Valor numérico de la tercera función en el instante donde se evalúa la ecuación
*		@Parámetro 4:
*			@Tipo: Number
*			@Descripción: Instante donde evaluamos la ecuación
* @Parámetro 4:
*	@Nombre: tf
*	@Tipo: Number
*	@Descripción: Instante final, en el dominio del sistema, donde queremos calcular el valor de la sución de la EDO
* @Parámetro 5:
*	@Nombre: t0
*	@Tipo: Number
*	@Descripción: Instante inicial de la ecuación
* @Parámetro 6:
*	@Nombre: x
*	@Tipo: Number
*	@Descripción: Valor inicial de la primera función del sistema
* @Parámetro 7:
*	@Nombre: z
*	@Tipo: Number
*	@Descripción: Valor inicial de la segunda función del sistema
* @Parámetro 8:
*	@Nombre: a
*	@Tipo: Number
*	@Descripción: Valor inicial de la tercera función del sistema
* @Parámetro 9:
*	@Nombre: h
*	@Tipo: Number
*	@Descripción: Longitud de paso para realizar la integración numérica
*/
function RungeKutta4Sis(f,g,a,tf,t0,x,z,s,h)
{
		if(tf<t0)
			h=-h
			
        var k1, k2, k3, k4, l1 , l2, l3, l4, m1, m2, m3, m4
        for(let t=t0; Math.abs(t-tf)>Math.abs(h); t+=h){
            k1=h*f(x,z,s,t);
			l1=h*g(x,z,s,t);
			m1=h*a(x,z,s,t);
            k2=h*f(x+k1/2,z+l1/2,s+m1/2, t+h/2);
			l2=h*g(x+k1/2,z+l1/2,s+m1/2, t+h/2);
			m2=h*a(x+k1/2,z+l1/2,s+m1/2, t+h/2);
            k3=h*f(x+k2/2,z+l2/2,s+m2/2, t+h/2);
			l3=h*g(x+k2/2,z+l2/2,s+m2/2, t+h/2);
			m3=h*a(x+k2/2,z+l2/2,s+m2/2, t+h/2);
            k4=h*f(x+k3,z+l3,s+m3, t+h);
			l4=h*g(x+k3,z+l3,s+m3, t+h);
			m4=h*a(x+k3,z+l3,s+m3, t+h);
            x+=(k1+2*k2+2*k3+k4)/6;
			z+=(l1+2*l2+2*l3+l4)/6;
			s+=(m1+2*m2+2*m3+m4)/6;
        }
		
		
		return new THREE.Vector3(x,z,s)
}


/*
* @Descripción: Dado un numero entre cero y uno interpola un color entre rojo y azul donde el rojo es el uno y el azul el 0
* @Valor devuelto: Una cadena String de la forma "rgb(r,g,b)" donde r, g, y b son valores del 0 a al 255 que indican la cantidad de rojo verde y azul respectivamente
* @Parámetro 1: 
*	@Nombre: x
*	@Tipo: Number
*	@Descripción: Número entre 0 y 1 que indica la cantidad la posición entre los colores azul y rojo
*/
function gradiente(x){
	return "rgb("+Math.floor(x*255).toString()+",0,"+Math.floor((1-x)*255).toString()+ ")"	
}

/*
* @Descripción: Devuelve el mínimo y el máximo de un vector
* @Valor devuelto: Un objeto con dos números, el máximo de nombre "max" y el mínimo de nombre "min" ({max,min})
* @Parámetro 1:
*	@Nombre: x
*	@Tipo: Array
*	@Descripción: Array de números.
*/
function extremos(x){
	
	var max=x[0]
	var min=x[0]
	
	for(let i=1; i< x.length ;i++){
		if(x[i]>max)
			max=x[i]
		if(x[i]<min)
			min=x[i]
	}
	
	return {min,max}
	
}

/*
* @Nombre: Rectangulo
* @Descripción: Representa un abierto producto cartesiano de dos intervalos abiertos de R
* @Variable de instancia 1:
*	@Nombre: this.intervaloX
*	@Tipo: Intervalo
*	@Descripción: Par de números reales que representan el primer intervalo abierto
* @Variable de instancia 2:
*	@Nombre: this.intervaloY
*	@Tipo: Intervalo
*	@Descripción: Par de números reales que representan el segundo intervalo abierto
*/
class Rectangulo{
	
	/*
	* @Descripción: Construye las variables de instancia como copia de los parámetros pasados
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre: X
	*	@Tipo: Intervalo
	*	@Descripción: Par de números reales que representan el primer intervalo abierto
	* @Parámetro 2:
	*	@Nombre: Y
	*	@Tipo: Intervalo
	*	@Descripción: Par de números reales que representan el segundo intervalo abierto
	*/
	constructor(X,Y)
	{
		
		this.intervaloX=X.clone()
		this.intervaloY=Y.clone()
	}
	
	/*
	* @Descripción: Indica si un punto de dos dimensiones está en el abierto
	* @Valor devuelto: Boolean
	* @Parámetro 1:
	*	@Nombre: punto2D
	*	@Tipo: THREE.Vector2
	*	@Descripción: Devuelve true si el punto está en el abierto y false si no lo está
	*/
	contenido(punto2d){
		return this.intervaloX.contenido(punto2d.x) && this.intervaloY.contenido(punto2d.y)
	}
	
	
	/*
	* @Descripción: Clona el objeto
	* @Valor devuelto: Una copia del objeto de clase Rectanculo
	*/
	clone(){
		return new Rectangulo(this.intervaloX,this.intervaloY)
	}
	
}

/*
* @Nombre: Intervalo
* @Descripción: Representa un intervalo abierto de R
* @Variable de instancia 1:
*	@Nombre: this.intervalo
*	@Tipo: THREE.Vector2
*	@Descripción: Par de números reales que representan un intervalo abierto, donde el primero es menor o igual que el segundo
*/
class Intervalo{
	
	/*
	* @Descripción: Construye la variables de instancia comprobando cual es mayor y cual menor para hacer una construcción válida
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre: a
	*	@Tipo: Number
	*	@Descripción: Número real
	* @Parámetro: 2:
	*	@Nombre: b
	*	@Tipo: Number
	*	@Descripción: Número real
	*/
	constructor(a,b)
	{
		if(a<b){
			this.intervalo=new THREE.Vector2(a,b)
		}else{
			this.intervalo=new THREE.Vector2(b,a)
		}
	}
	
	/*
	* @Descripción: Indica si un número está en el intervalo
	* @Valor devuelto: Boolean
	* @Parámetro 1:
	*	@Nombre: t
	*	@Tipo: Number
	*	@Descripción: Devuelve true si el número está en el intervalo y false si no lo está
	*/
	contenido(t){
		return t>this.intervalo.x && t<this.intervalo.y 
	}
	
	/*
	* @Descripción: Clona el objeto
	* @Valor devuelto: Una copia del objeto de clase Rectanculo
	*/
	clone(){
		return new Intervalo(this.intervalo.x,this.intervalo.y)
	}
	
	/*
	* @Descripción: Definimos una cantidad pequeña que sirve para evitar errores de evaluación en funciones definidas exclusivamente dentro del intervalo
	* @Valor devuelto: 0.00001
	*/
	get epsilon() 
	{
		return 0.00001
	}
	
	/*
	* @Descripción: Definimos el límite inferior como el extremos izquierdo del intervalo más una cantidad pequeña
	* @Valor devuelto: Devuelve el extremo izquierdo del intervalo más 0.00001
	*/
	get limInf() //Sumamos epsilon
	{
		return this.intervalo.x+this.epsilon
	}
	
	/*
	* @Descripción: Definimos el límite inferior como el extremos derecho del intervalo menos una cantidad pequeña
	* @Valor devuelto: Devuelve el extremo derecho del intervalo menos 0.00001
	*/
	get limSup()
	{
		return this.intervalo.y-this.epsilon
	}
}


/*
* @Nombre: Superficie
* @Descripción: Clase genérica de superficies con datos y métodos elementales
* @Variable: de instancia 1:
*	@Nombre: this.parametrizacion
*	@Tipo: Function
*	@Descripción: Función que nos da un punto de la superficie dada su preimagen
*		 @Valor devuelto: Un vector de dimensión 3 de tipo THREE.Vector3
*		 @Parámetro 1: 
*			@Tipo: THREE.Vector2
*			@Descripción: Punto preimagen de la función de parametrización
* @Variable de instancia 2:
*	@Nombre: this.abto
*	@Tipo: Rectangulo
*	@Descripción: Rectángulo de definición de la superficie
* @Variable de instancia 3:
*	@Nombre: n
*	@Tipo: Number
*	@Descripción: Resolución en la coordenada X del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
*	@Precondición: Número mayor que cero
* @Variable de instancia 4:
*	@Nombre: k 
*	@Tipo: Number
*	@Descripción: Resolución en la coordenada Y del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
*	@Precondición: Número mayor que cero
*/
class Superficie{
	
	/*
	* @Descripción: Constructor de la clase que copia los parámetros en las variables de instancia
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre: funParam
	*	@Tipo: Function
	*	@Descripción: Función que nos da un punto de la superficie dada su preimagen
	*		 @Valor devuelto: Un vector de dimensión 3 de tipo THREE.Vector3
	*		 @Parámetro 1: 
	*			@Tipo: THREE.Vector2
	*			@Descripción: Punto preimagen de la función de parametrización
	*	@Descripción: Función que nos da un punto de la superficie dada su preimagen
	* @Parámetro 2:
	*	@Nombre: abto
	*	@Tipo: Rectangulo
	*	@Descripción: Rectángulo de definición de la superficie
	* @Parámetro 3:
	*	@Nombre: n
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada X del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
	*	@Precondición: Número mayor que cero
	* @Parámetro 4:
	*	@Nombre: k 
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada Y del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
	*	@Precondición: Número mayor que cero
	*/
	constructor(funParam,abto,n,k)
	{
		this.parametrizacion=funParam
		this.abto=abto.clone()
		this.n=n
		this.k=k
		
	}
	
	/*
	* @Descripción: Devuelve si un punto de R^2 está en el abierto de definición
	* @Valor devuelto: Booleano que es true si está contenido y false si no
	* @Parámetro 1:
	*	@Nombre: punto2d
	*	@Tipo: THREE.Vector2
	*	@Descripción: Punto de R^2
	*/
	enDominio(punto2d){
		return contenido(punto2d)
	}
	
}

/*
* @Nombre: SuperficieRevol
* @Descripción: Clase genérica para superficies de revolución alrededor del eje Z
* @Nombre clase base: Superficie
* @Variable de instancia 1:
*	@Nombre: this.generatriz
*	@Tipo: Function
*	@Descripción: Función que nos da un punto de la generatriz de la superficie de revolución en el plano Y=0
*		 @Valor devuelto: Un vector de dimensión 2 de tipo THREE.Vector2 donde la primera coordenada es la coordenada X
*						y la segunda la coordenada Z
*			@Postcondición: La primera coordenada del valor devuelto es mayor que cero
*		 @Parámetro 1: 
*			@Tipo: Number
*			@Descripción: Punto preimagen de la función generatriz
* @Variable de instancia 2:
*	@Nombre: this.lineaGen
*	@Tipo: THREE.Line
*	@Descripción: Objeto que guarda la estructura de una polilínea abierta y que se genera en el método 
*/
class SuperficieRevol extends Superficie{
	
	
	/*
	* @Descripción: Constructor de la clase define la parametrización con la función generatriz de la superficie y crea el abierto correspondiente para la superficie
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre: funGeneratriz
	*	@Tipo: Function
	*	@Descripción: Función que nos da un punto de la generatriz de la superficie de revolución en el plano Y=0
	*		 	@Valor devuelto: Un vector de dimensión 2 de tipo THREE.Vector2 donde la primera coordenada es la coordenada X
	*						y la segunda la coordenada Z
	*				@Postcondición: La primera coordenada del valor devuelto es mayor que cero
	*		 	@Parámetro 1: 
	*				@Tipo Number
	*				@Descripción Punto preimagen de la función generatriz
	* @Parámetro 2:
	*	@Nombre: intervalo
	*	@Tipo: Intervalo
	*	@Descripción: Intervalo de definición de la función generatriz
	* @Parámetro 3:
	*	@Nombre: n
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada X del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
	*	@Precondición: Número mayor que cero
	* @Parámetro 4:
	*	@Nombre: k 
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada Y del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
	*	@Precondición: Número mayor que cero
	*/
	constructor(funGeneratriz,intervalo,n=20,k=20){
		
		//Definimos la parametrización a partir de la función generatriz
		var funParam = function(punto2d){
			var val=funGeneratriz(punto2d.x)
			return new THREE.Vector3( Math.cos(punto2d.y)*val.x, Math.sin(punto2d.y)*val.x,val.y)
		}
		
		
		super(funParam,new Rectangulo(intervalo,new Intervalo(0,2*Math.PI)),n,k)
		//Guardamos la función generatriz
		this.generatriz=funGeneratriz
		this.lineaGen=this.generarPerfil()
	}
	
	/*
	* @Descripción: Genera los puntos y el el objeto que representa la polilínea del perfil de la función generatriz
	* @Valor devuelto: Objeto de clase THREE.Line con la geometría y material de la polilínea generada 
	*/
	generarPerfil(){
		
		//Usamos la resolución de la clase base para generar tantos puntos por unidad como valor numérico contenga this.n
		var n=Math.max(Math.floor(this.n*(this.abto.intervaloX.limSup-this.abto.intervaloX.limInf)),this.n)
		var material = new THREE.LineBasicMaterial({
			color: 0xffffff,
			linewidth: 10
		});

		//Añadimos los vértices
		var geometry = new THREE.Geometry();
		for(let i=0; i<(n+1) ; i++){
			let a=this.abto.intervaloX.limInf
			let b=this.abto.intervaloX.limSup
			let gen=this.generatriz((b-a)*i/n+a)
			geometry.vertices.push(	new THREE.Vector3(  gen.x , 0 , gen.y ));
		}
		
		//Creamos la linea con los vértices
		 return new THREE.Line( geometry, material );
	}
	
};


/*
* @Descripción: Función que dada una clase genera otra clase hija que implementa la interfaz para tipos de superficies que tenga sentido definir la curvatura y coloreado de la superficie según ésta 
* @Parámetro 1:
* 	@Nombre: claseBase
* 	@Tipo: Function
* 	@Descripción: Calase base a extender por esta clase interfaz
* @Variable de instancia 1:
*	@Nombre: this.dibujaCurv
*	@Tipo: String
*	@Descripción: String que contiene o bien "gauss" o bien "media" y que indica que coloreado contiene la malla de la superficie en este momento
* @Variable de instancia 2:
*	@Nombre: this.normalesInv
*	@Tipo: Boolean
*	@Descripción: Indica si se han invertido los normales respecto a la posición inicial calculada
*/
const SDif = (claseBase) => class extends claseBase {
	
	/*
	* @Descripción: Constructor de la clase
	* @Valor devuelto: Ninguno
	* @Parámetros:
	*	@Nombre: param
	*	@Tipo: Array
	*	@Descripción: Lista de parámetros pasados a la clase hija
	*/
	constructor(...param){
		//Array de parámetros se pasa tal cual y en el mismo orden al constructor de la clase base
		super(...param)
		//Por defecto dibujamos la curvatura de Gauss
		this.dibujaCurv="gauss"
		this.normalesInv=false
	}
	
	/*
	* @Descripción: Cambia el color de la malla alternando según la curvatura de Gauss o media
	* @Valor devuelto: Ninguno
	*/
	cambiaCurvatura(){
		if(this.dibujaCurv=="gauss")
			this.dibujaCurv="media"
		else if(this.dibujaCurv=="media")
			this.dibujaCurv="gauss"
		
		
		var i
		
		for( i in this.malla.geometry.faces){
			this.malla.geometry.faces[i].vertexColors[0]=this.coloreado[this.dibujaCurv][this.caras[i].a].clone()
			this.malla.geometry.faces[i].vertexColors[1]=this.coloreado[this.dibujaCurv][this.caras[i].b].clone()
			this.malla.geometry.faces[i].vertexColors[2]=this.coloreado[this.dibujaCurv][this.caras[i].c].clone()
		}
		
		this.malla.geometry.elementsNeedUpdate=true
	}
	
	/*
	* @Descripción: Cambia el sentido de los normales de la malla
	* @Valor devuelto: Ninguno
	*/
	cambiaNormal(){
		var i
		
		for( i in this.malla.geometry.faces){
			this.malla.geometry.faces[i].vertexNormals[0].negate()
			this.malla.geometry.faces[i].vertexNormals[1].negate()
			this.malla.geometry.faces[i].vertexNormals[2].negate()
		}
		
		this.normalesInv=!this.normalesInv
		this.malla.geometry.elementsNeedUpdate=true
		this.visorNormales.update()
	}

};


/*
* @Nombre: SuperficieDiferenciable
* @Nombre de la clase base: Superficie (ampliada con la interfaz de SDif)
* @Descripción: Clase para superficies diferenciables dada su parametrización y derivadas parciales
* @Variable de instancia 1:
*	@Nombre: this.du
*	@Tipo: Function
*	@Descripción: Derivada parcial de la función parametrización respecto a la primera variable
*		@Valor devuelto: Vector de tres dimensiones de tipo THREE.Vector3
*		@Parámetro 1:
*			@Tipo: THREE.Vector2
*			@Descripción: Punto preimagen de la superficie donde se calcula la derivada parcial
* @Variable de instancia 2:
*	@Nombre: this.dv
*	@Tipo: Function
*	@Descripción: Derivada parcial de la función parametrización respecto a la segunda variable
*		@Valor devuelto: Vector de tres dimensiones de tipo THREE.Vector3
*		@Parámetro 1:
*			@Tipo: THREE.Vector2
*			@Descripción: Punto preimagen de la superficie donde se calcula la derivada parcial
* @Variable de instancia 3:
*	@Nombre: this.duu
*	@Tipo: Function
*	@Descripción: Segunda derivada parcial de la función parametrización respecto a la primera variable dos veces
*		@Valor devuelto: Vector de tres dimensiones de tipo THREE.Vector3
*		@Parámetro 1:
*			@Tipo: THREE.Vector2
*			@Descripción: Punto preimagen de la superficie donde se calcula la derivada parcial
* @Variable de instancia 4:
*	@Nombre: this.dvv
*	@Tipo: Function
*	@Descripción: Segunda derivada parcial de la función parametrización respecto a la segunda variable dos veces
*		@Valor devuelto: Vector de tres dimensiones de tipo THREE.Vector3
*		@Parámetro 1:
*			@Tipo: THREE.Vector2
*			@Descripción: Punto preimagen de la superficie donde se calcula la derivada parcial
* @Variable de instancia 5:
*	@Nombre: this.duv
*	@Tipo: Function
*	@Descripción: Segunda derivada parcial de la función parametrización respecto a la primera y segunda variable (da igual el orden por el teorema de Schwarz)
*		@Valor devuelto: Vector de tres dimensiones de tipo THREE.Vector3
*		@Parámetro 1:
*			@Tipo: THREE.Vector2
*			@Descripción: Punto preimagen de la superficie donde se calcula la derivada parcial
*
* @Variables de instancia definidas en la función this.generarMalla():
*
*	|| @Variable de instancia 6:
*	||	@Nombre: this.curvaturas
*	||	@Tipo: Array
*	||	@Descripción: Array de objetos que contienen las curvaturas de los vértices de forma que cada índice son las curvaturas del vértice de mismo índice en el array de vértices
*	|| @Variable de instancia 7:
*	||	@Nombre: this.normales
*	||	@Tipo: Array
*	||	@Descripción: Array de THREE.Vector3 en el que cada índice es el vector normal del vértice de mismo índice en el array de vértices
*	|| @Variable de instancia 8:
*	||	@Nombre: this.vertices
*	||	@Tipo: Array
*	||	@Descripción: Array de THREE.Vector3 que contiene los vértices de la malla
*	|| @Variable de instancia 9:
*	||	@Nombre: this.caras
*	||	@Tipo: Array
*	||	@Descripción: Array de THREE.Face3 que contiene en cada componente los tres índices de los vértices que forman los triángulos de la malla
*	|| @Variable de instancia 10:
*	||	@Nombre: this.uv
*	||	@Tipo: Array
*	||	@Descripción: Array de THREE.Vector2 del mismo tamaño que los vertices en el que cada índice corresponde con las coordenadas de la textura que se le asocia al vértice de mismo índice
*	|| @Variable de instancia 11:
*	||	@Nombre: this.coloreado
*	||	@Tipo: Array
*	||	@Descripción: Array de objetos donde cada indice corresponde al objeto que almacena el color según qué curvatura se coloree del vértice del mismo indice en el array de indices
*	|| @Variable de instancia 12:
*	||	@Nombre: this.curvaturaConst
*	||	@Tipo: Object
*	||	@Descripción: Objeto que almacena dos variables booleanas que nos indica si la curvatura de Gauss y media es constante dada la tolerancia
*	|| @Variable de instancia 13:
*	||	@Nombre: this.malla
*	||	@Tipo: THREE.Mesh
*	||	@Descripción: Objeto que construimos con los vértices, caras normales y colores que representa nuestra superficie como malla de triángulos
*	|| @Variable de instancia 14:
*	||	@Nombre: this.dimMayor
*	||	@Tipo: Numeric
*	||	@Descripción: Indica la lógitud la mayor dimensión entre la altura, profundidad y anchura del prima que encierra la malla
*
*	 @Variable de instancia 15:
*		@Nombre: this.visorNormales
*		@Tipo: THREE.VertexNormalsHelper
*		@Descripción: Objeto para el visionado de los normales
*/
class SuperficieDiferenciable extends SDif(Superficie){
	
	/*
		* @Descripción: Constructor de la clase que copia los parámetros en las variables de instancia y genera las otras a partir de ellos
		* @Valor devuelto: Ninguno
		* @Parámetro 1:
		*	@Nombre: funParam
		*	@Tipo: Function
		*	@Descripción: Función que nos da un punto de la superficie dada su preimagen
		*		 @Valor devuelto: Un vector de dimensión 3 de tipo THREE.Vector3
		*		 @Parámetro 1: 
		*			@Tipo: THREE.Vector2
		*			@Descripción: Punto preimagen de la función de parametrización
		*	@Descripción: Función que nos da un punto de la superficie dada su preimagen
		* @Parámetro 2:
		*	@Nombre: du
		*	@Tipo: Function
		*	@Descripción: Derivada parcial de la función parametrización respecto a la primera variable
		*		@Valor devuelto: Vector de tres dimensiones de tipo THREE.Vector3
		*		@Parámetro 1:
		*			@Tipo: THREE.Vector2
		*			@Descripción: Punto preimagen de la superficie donde se calcula la derivada parcial
		* @Parámetro 3:
		*	@Nombre: dv
		*	@Tipo: Function
		*	@Descripción: Derivada parcial de la función parametrización respecto a la segunda variable
		*		@Valor devuelto: Vector de tres dimensiones de tipo THREE.Vector3
		*		@Parámetro 1:
		*			@Tipo: THREE.Vector2
		*			@Descripción: Punto preimagen de la superficie donde se calcula la derivada parcial
		* @Parámetro 4:
		*	@Nombre: duu
		*	@Tipo: Function
		*	@Descripción: Segunda derivada parcial de la función parametrización respecto a la primera variable dos veces
		*		@Valor devuelto: Vector de tres dimensiones de tipo THREE.Vector3
		*		@Parámetro 1:
		*			@Tipo: THREE.Vector2
		*			@Descripción: Punto preimagen de la superficie donde se calcula la derivada parcial
		* @Parámetro 5:
		*	@Nombre: dvv
		*	@Tipo: Function
		*	@Descripción: Segunda derivada parcial de la función parametrización respecto a la segunda variable dos veces
		*		@Valor devuelto: Vector de tres dimensiones de tipo THREE.Vector3
		*		@Parámetro 1:
		*			@Tipo: THREE.Vector2
		*			@Descripción: Punto preimagen de la superficie donde se calcula la derivada parcial
		* @Parámetro 6:
		*	@Nombre: duv
		*	@Tipo: Function
		*	@Descripción: Segunda derivada parcial de la función parametrización respecto a la primera y segunda variable (da igual el orden por el teorema de Schwarz)
		*		@Valor devuelto: Vector de tres dimensiones de tipo THREE.Vector3
		*		@Parámetro 1:
		*			@Tipo: THREE.Vector2
		*			@Descripción: Punto preimagen de la superficie donde se calcula la derivada parcial
		* @Parámetro 7:
		*	@Nombre: abto
		*	@Tipo: Rectangulo
		*	@Descripción: Rectángulo de definición de la superficie
		* @Parámetro 8:
		*	@Nombre: n
		*	@Tipo: Number
		*	@Descripción: Resolución en la coordenada X del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
		*	@Precondición: Número mayor que cero
		* @Parámetro 9:
		*	@Nombre: k 
		*	@Tipo: Number
		*	@Descripción: Resolución en la coordenada Y del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
		*	@Precondición: Número mayor que cero
		*/
	constructor(funParam,du,dv,duu,dvv,duv,abto,n=20,k=20){		
		super(funParam,abto,n,k)
		this.du=du
		this.dv=dv
		this.duu=duu
		this.dvv=dvv
		this.duv=duv
		this.generarMalla()
		//Objeto para visualizar normales
		this.visorNormales = new THREE.VertexNormalsHelper( this.malla, 0.2, 0x00ff00, 1 );
		//Invisible por defecto
		this.visorNormales.visible=false
	}
	
	
	/*
	* @Descripción: Obtenemos el normal de un vértice a partir del producto vectorial de los vectores tangentes que generan el plano tangente de la superficie en el punto pasado
	* @Valor devuelto: Vector normal al vértice de tipo THREE.Vector3	
	* @Parámetro 1:
	*	@Nombre: punto2d
	*	@Tipo: THREE.Vector2
	*	@Descripción: Preimagen del punto donde calculamos el normal
	*/
	normal(punto2d){
		var tan1=this.du(punto2d)
		var tan2=this.dv(punto2d)
		return tan2.cross(tan1).normalize()
		
	}
		
	/*
	* @Descripción: Obtiene las curvaturas en el vértice cuya preimagen es el punto pasado
	* @Valor devuelto: Objeto que contiene la curvatura de GauSS, la media, y las curvaturas principales
	* @Parámetro 1:
	*	@Nombre: punto2d
	*	@Tipo: THREE.Vector2
	*	@Descripción: Preimagen del punto donde calculamos las curvaturas
	*/
	curvatura(punto2d){
		var Xu=this.du(punto2d)
		var Xv=this.dv(punto2d)
		var Xuu=this.duu(punto2d)
		var Xuv=this.duv(punto2d)
		var Xvv=this.dvv(punto2d)
		var N=this.normal(punto2d)
		
		var E=Xu.dot(Xu)
		var F=Xu.dot(Xv)
		var G=Xv.dot(Xv)
		var EGmF2=E*G-F*F
		
		var e=Xuu.dot(N)
		var f=Xuv.dot(N)
		var g=Xvv.dot(N)
		
		var curvatura={}
		
		curvatura.gauss=(e*g-f*f)/EGmF2
		curvatura.media=(E*g-2*f*F+e*G)/(2*EGmF2)
		curvatura.k1=curvatura.media+Math.sqrt(curvatura.media*curvatura.media-curvatura.gauss)
		curvatura.k2=curvatura.media-Math.sqrt(curvatura.media*curvatura.media-curvatura.gauss)
		return curvatura
	}
	
	/*
	* @Descripción: Genera la superficie mediante la definición de las variables de instancia antes descritas coloreando los puntos con un gradiente que nos señala como cambia la curvatura con una resolución fija
	* @Valor devuelto: Ninguno
	*/
	generarMalla(){
		
		this.curvaturas=[]
		this.normales=[]
		this.vertices=[]
		this.caras=[]
		this.uv=[]
		var geometryMesh = new THREE.Geometry();
		
		var pos
		var n=Math.max(Math.floor(this.n*(this.abto.intervaloX.limSup-this.abto.intervaloX.limInf)),this.n)
		var k=Math.max(Math.floor(this.k*(this.abto.intervaloY.limSup-this.abto.intervaloY.limInf)),this.k)
		//Añadimos vertices a la geometria de la malla, y guardamos los normales y curvatura de cada vértice
		for(let i=0; i<(n+1); i++){
			let ax=this.abto.intervaloX.limInf
			let bx=this.abto.intervaloX.limSup
			for(let j=0; j<(k+1); j++){
				let ay=this.abto.intervaloY.limInf
				let by=this.abto.intervaloY.limSup
				this.normales.push(this.normal(new THREE.Vector2((bx-ax)*i/n+ax,(by-ay)*j/k+ay)))
				this.curvaturas.push(this.curvatura(new THREE.Vector2((bx-ax)*i/n+ax,(by-ay)*j/k+ay)))
				this.uv.push(new THREE.Vector2(i/n,j/k))
				pos=this.vertices.push(this.parametrizacion(new THREE.Vector2((bx-ax)*i/n+ax,(by-ay)*j/k+ay)))-1
				geometryMesh.vertices.push(this.vertices[pos].clone())
			}
		}
		
		this.coloreado={gauss:[],media:[]}
		this.curvaturaConst={}
		
		var misExtremos=extremos(this.curvaturas.map(x=>x.gauss))
		
		this.curvaturaConst.gauss=(misExtremos.max-misExtremos.min)<tolerancia
		
		for(let i=0; i<this.vertices.length; i++)
			this.coloreado.gauss.push( new THREE.Color( (this.curvaturaConst.gauss)?0x7f007f:gradiente((this.curvaturas[i]["gauss"]-misExtremos.min)/(misExtremos.max-misExtremos.min) ) )) 

		misExtremos=extremos(this.curvaturas.map(x=>x.media))
		
		this.curvaturaConst.media=(misExtremos.max-misExtremos.min)<tolerancia
		
		for(let i=0; i<this.vertices.length; i++)
			this.coloreado.media.push( new THREE.Color( (this.curvaturaConst.media)?0x7f007f:gradiente((this.curvaturas[i]["media"]-misExtremos.min)/(misExtremos.max-misExtremos.min) ) )) 
		
		//Añadimos los colores a la geometría con el gradiente adecuado
		for(let i=0; i< this.coloreado[this.dibujaCurv].length; i++)
			geometryMesh.colors.push( this.coloreado[this.dibujaCurv][i].clone() ) 

		geometryMesh.faceVertexUvs=[[]]
		//Añadimos caras a la malla con colores y normales asociados
		for(let i=0; i<n; i++)
			for(let j=0; j<k; j++){
				pos=this.caras.push(new THREE.Face3(j+i*(k+1), (j+1)+i*(k+1), j+(k+1)+i*(k+1)))-1
				geometryMesh.faces.push(this.caras[pos].clone())
				geometryMesh.faces[pos].vertexColors=[this.coloreado[this.dibujaCurv][this.caras[pos].a].clone(),this.coloreado[this.dibujaCurv][this.caras[pos].b].clone(),this.coloreado[this.dibujaCurv][this.caras[pos].c].clone()]
				geometryMesh.faces[pos].vertexNormals=[this.normales[this.caras[pos].a].clone(),this.normales[this.caras[pos].b].clone(),this.normales[this.caras[pos].c].clone()]
				geometryMesh.faceVertexUvs[0].push([this.uv[this.caras[pos].a].clone(),this.uv[this.caras[pos].b].clone(),this.uv[this.caras[pos].c].clone()])
				
				pos=this.caras.push(new THREE.Face3(j+(k+1)+i*(k+1), (j+1) +i*(k+1),(j+1)+(k+1)+i*(k+1)))-1
				geometryMesh.faces.push(this.caras[pos].clone())
				geometryMesh.faces[pos].vertexColors=[this.coloreado[this.dibujaCurv][this.caras[pos].a].clone(),this.coloreado[this.dibujaCurv][this.caras[pos].b].clone(),this.coloreado[this.dibujaCurv][this.caras[pos].c].clone()]
				geometryMesh.faces[pos].vertexNormals=[this.normales[this.caras[pos].a].clone(),this.normales[this.caras[pos].b].clone(),this.normales[this.caras[pos].c].clone()]
				geometryMesh.faceVertexUvs[0].push([this.uv[this.caras[pos].a].clone(),this.uv[this.caras[pos].b].clone(),this.uv[this.caras[pos].c].clone()])
			}
			
			
		
		//Añadimos la malla y el visor de normales
		this.malla= new THREE.Mesh( geometryMesh, new THREE.MeshPhongMaterial({side: THREE.DoubleSide, vertexColors: THREE.VertexColors}) )
		this.malla.geometry.computeBoundingBox()
		var size=new THREE.Vector3()
		this.malla.geometry.boundingBox.getSize(size)
		this.dimMayor=Math.max(size.x,size.y,size.z)
	}
	
	/*
	* @Descripción: Genera uns superficie igual a la definida pero usando otra resolucíon distinta a la hora de generar la malla
	* @Valor devuelto: SuperficieDiferenciable con la misma definición salvo por su resolución.
	* @Parámetro 1:
	*	@Nombre: n
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada X del dominio a la que posteriormente se generará la malla
	*	@Precondición: Número mayor que cero
	* @Parámetro 2:
	*	@Nombre: k 
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada Y del dominio a la que posteriormente se generará la malla
	*	@Precondición: Número mayor que cero
	*/
	cambiaResolucion(n,k){
		return new SuperficieDiferenciable(this.parametrizacion,this.du,this.dv,this.duu,this.dvv,this.duv,this.abto,n,k)
	}
}

/*
* @Nombre: SuperficieDiferenciableExplicita
* @Nombre de la clase base: SuperficieDiferenciable
* @Descripción: Clase para una superficie diferenciable de la que conocemos explícitamente las coordenadas de su parametrización dados sus dos parámetros y que además son diferenciables
*/
class SuperficieDiferenciableExplicita extends SuperficieDiferenciable{
	
	/*
	* @Descripción: Crea todos los parámetros necesarios para usar la funcionalidad de la clase base
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre: expX
	*	@Tipo: String
	*	@Descripción: Expresión de la coordenada X de la superficie en función de sus dos parámetros
	* @Parámetro 2:
	*	@Nombre: expY
	*	@Tipo: String
	*	@Descripción: Expresión de la coordenada Y de la superficie en función de sus dos parámetros
	* @Parámetro 3:
	*	@Nombre: expZ
	*	@Tipo:
	*	@Descripción: Expresión de la coordenada Z de la superficie en función de sus dos parámetros
	* @Parámetro 4:
	*	@Nombre: param1
	*	@Tipo: String
	*	@Descripción: Nombre de la variable que corresponde al primer parámetro de la superficie
	* @Parámetro 5:
	*	@Nombre: param2
	*	@Tipo: String
	*	@Descripción: Nombre de la variable que corresponde al segundo parámetro de la superficie
	* @Parámetro 6:
	*	@Nombre: abto
	*	@Tipo: Rectangulo
	*	@Descripción: Rectángulo de definición de la superficie
	* @Parámetro 7:
	*	@Nombre: n
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada X del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
	*	@Precondición: Número mayor que cero
	* @Parámetro 8:
	*	@Nombre: k 
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada Y del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
	*	@Precondición: Número mayor que cero
	*/
	constructor(expX,expY,expZ,param1,param2,abto,n=20,k=20){
		var arbolX=parser(lexer(expX)).toArbolExp()
		var arbolY=parser(lexer(expY)).toArbolExp()
		var arbolZ=parser(lexer(expZ)).toArbolExp()
		
		var x=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolX.evaluar(dicc)}
		var y=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolY.evaluar(dicc)}
		var z=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolZ.evaluar(dicc)}
		
		var funParam=function(punto2d){return new THREE.Vector3(x(punto2d),y(punto2d),z(punto2d))}
		
		var arbolXDu=arbolX.derivada(param1)
		var arbolYDu=arbolY.derivada(param1)
		var arbolZDu=arbolZ.derivada(param1)
		
		var xDu=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolXDu.evaluar(dicc)}
		var yDu=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolYDu.evaluar(dicc)}
		var zDu=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolZDu.evaluar(dicc)}
		
		var arbolXDv=arbolX.derivada(param2)
		var arbolYDv=arbolY.derivada(param2)
		var arbolZDv=arbolZ.derivada(param2)
		
		var xDv=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolXDv.evaluar(dicc)}
		var yDv=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolYDv.evaluar(dicc)}
		var zDv=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolZDv.evaluar(dicc)}
		
		var arbolXDuu=arbolXDu.derivada(param1)
		var arbolYDuu=arbolYDu.derivada(param1)
		var arbolZDuu=arbolZDu.derivada(param1)
		
		var xDuu=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolXDuu.evaluar(dicc)}
		var yDuu=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolYDuu.evaluar(dicc)}
		var zDuu=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolZDuu.evaluar(dicc)}
		
		var arbolXDuv=arbolXDu.derivada(param2)
		var arbolYDuv=arbolYDu.derivada(param2)
		var arbolZDuv=arbolZDu.derivada(param2)
		
		var xDuv=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolXDuv.evaluar(dicc)}
		var yDuv=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolYDuv.evaluar(dicc)}
		var zDuv=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolZDuv.evaluar(dicc)}
		
		var arbolXDvv=arbolXDv.derivada(param2)
		var arbolYDvv=arbolYDv.derivada(param2)
		var arbolZDvv=arbolZDv.derivada(param2)
		
		var xDvv=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolXDvv.evaluar(dicc)}
		var yDvv=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolYDvv.evaluar(dicc)}
		var zDvv=function(punto2d){var dicc={}; dicc[param1]=punto2d.x; dicc[param2]=punto2d.y;return arbolZDvv.evaluar(dicc)}
		
		
		var du=function(punto2d){return new THREE.Vector3(xDu(punto2d),yDu(punto2d),zDu(punto2d))}
		var dv=function(punto2d){return new THREE.Vector3(xDv(punto2d),yDv(punto2d),zDv(punto2d))}
		var duu=function(punto2d){return new THREE.Vector3(xDuu(punto2d),yDuu(punto2d),zDuu(punto2d))}
		var duv=function(punto2d){return new THREE.Vector3(xDuv(punto2d),yDuv(punto2d),zDuv(punto2d))}
		var dvv=function(punto2d){return new THREE.Vector3(xDvv(punto2d),yDvv(punto2d),zDvv(punto2d))}
		super(funParam,du,dv,duu,dvv,duv,abto,n,k)		
	}
	
}

/*
* @Nombre: SuperficieRevolDifereciable
* @Nombre de la clase base: SuperficieRevol (ampliada con la interfaz de SDif)
* @Descripción: Clase para superficies diferenciables de revolución
* @Variable de instancia 1:
*	@Nombre: this.x
*	@Tipo: Function
*	@Descripción: Coordenada X de la función generatriz del plano Y=0 que genera la superficie de revolución
*		@Valor devuelto: Coordenada X de la función generatriz (Number)
*		@Parámetro 1:
*			@Tipo: Number
*			@Descripción: Punto preimagen de la función generatriz
* @Variable de instancia 2:
*	@Nombre: this.z
*	@Tipo: Function
*	@Descripción: Coordenada Z de la función generatriz del plano Y=0 que genera la superficie de revolución
*		@Valor devuelto: Coordenada Z de la función generatriz (Number)
*		@Parámetro 1:
*			@Tipo: Number
*			@Descripción: Punto preimagen de la función generatriz
* @Variable de instancia 3:
*	@Nombre: this.xDer
*	@Tipo: Function
*	@Descripción: Derivada de la coordenada X de función generatriz
*		@Valor devuelto: Coordenada X derivada de la función generatriz (Number)
*		@Parámetro 1:
*			@Tipo: Number
*			@Descripción: Punto preimagen de la función generatriz
* @Variable de instancia 4:
*	@Nombre: this.zDer
*	@Tipo: Function
*	@Descripción: Derivada de la coordenada Z de función generatriz
*		@Valor devuelto: Coordenada Z derivada de la función generatriz (Number)
*		@Parámetro 1:
*			@Tipo: Number
*			@Descripción: Punto preimagen de la función generatriz
* @Variable de instancia 5:
*	@Nombre: this.xDer2
*	@Tipo: Function
*	@Descripción: Segunda derivada de la coordenada Z de función generatriz
*		@Valor devuelto: Coordenada X dos veces derivada de la función generatriz (Number)
*		@Parámetro 1:
*			@Tipo: Number
*			@Descripción: Punto preimagen de la función generatriz
* @Variable de instancia 6:
*	@Nombre: this.zDer2
*	@Tipo: Function
*	@Descripción: Segunda derivada de la coordenada Z de función generatriz
*		@Valor devuelto: Coordenada Z dos veces derivada de la función generatriz (Number)
*		@Parámetro 1:
*			@Tipo: Number
*			@Descripción: Punto preimagen de la función generatriz
*
* @Variables de instancia definidas en la función this.generarMalla():
*
*	|| @Variable de instancia 7:
*	||	@Nombre: this.curvaturas
*	||	@Tipo: Array
*	||	@Descripción: Array de objetos que contienen las curvaturas de los vértices de forma que cada índice son las curvaturas del vértice de mismo índice en el array de vértices
*	|| @Variable de instancia 8:
*	||	@Nombre: this.normales
*	||	@Tipo: Array
*	||	@Descripción: Array de THREE.Vector3 en el que cada índice es el vector normal del vértice de mismo índice en el array de vértices
*	|| @Variable de instancia 9:
*	||	@Nombre: this.vertices
*	||	@Tipo: Array
*	||	@Descripción: Array de THREE.Vector3 que contiene los vértices de la malla
*	|| @Variable de instancia 10:
*	||	@Nombre: this.caras
*	||	@Tipo: Array
*	||	@Descripción: Array de THREE.Face3 que contiene en cada componente los tres índices de los vértices que forman los triángulos de la malla
*	|| @Variable de instancia 11:
*	||	@Nombre: this.uv
*	||	@Tipo: Array
*	||	@Descripción: Array de THREE.Vector2 del mismo tamaño que los vertices en el que cada índice corresponde con las coordenadas de la textura que se le asocia al vértice de mismo índice
*	|| @Variable de instancia 12:
*	||	@Nombre: this.coloreado
*	||	@Tipo: Array
*	||	@Descripción: Array de objetos donde cada indice corresponde al objeto que almacena el color según qué curvatura se coloree del vértice del mismo indice en el array de indices
*	|| @Variable de instancia 13:
*	||	@Nombre: this.curvaturaConst
*	||	@Tipo: Object
*	||	@Descripción: Objeto que almacena dos variables booleanas que nos indica si la curvatura de Gauss y media es constante dada la tolerancia
*	|| @Variable de instancia 14:
*	||	@Nombre: this.malla
*	||	@Tipo: THREE.Mesh
*	||	@Descripción: Objeto que construimos con los vértices, caras normales y colores que representa nuestra superficie como malla de triángulos
*	|| @Variable de instancia 15:
*	||	@Nombre: this.dimMayor
*	||	@Tipo: Numeric
*	||	@Descripción: Indica la lógitud la mayor dimensión entre la altura, profundidad y anchura del prima que encierra la malla
* 
* @Variable de instancia 16:
*		@Nombre: this.visorNormales
*		@Tipo: THREE.VertexNormalsHelper
*		@Descripción: Objeto para el visionado de los normales
*/
class SuperficieRevolDifereciable extends SDif(SuperficieRevol){
	
	/*
	* @Descripción: Constructor de la clase al cual pasamos como paráteros las coordenadas y derivadas de laa coordenadas de la función generatriz
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre: x
	*	@Tipo: Function
	*	@Descripción: Coordenada X de la función generatriz del plano Y=0 que genera la superficie de revolución
	*		@Valor devuelto: Coordenada X de la función generatriz (Number)
	*		@Parámetro 1:
	*			@Tipo: Number
	*			@Descripción: Punto preimagen de la función generatriz
	* @Parámetro 2:
	*	@Nombre: z
	*	@Tipo: Function
	*	@Descripción: Coordenada Z de la función generatriz del plano Y=0 que genera la superficie de revolución
	*		@Valor devuelto: Coordenada Z de la función generatriz (Number)
	*		@Parámetro 1:
	*			@Tipo: Number
	*			@Descripción: Punto preimagen de la función generatriz
	* @Parámetro 3:
	*	@Nombre: dx
	*	@Tipo: Function
	*	@Descripción: Derivada de la coordenada X de la función generatriz
	*		@Valor devuelto: Coordenada X derivada de la función generatriz (Number)
	*		@Parámetro 1:
	*			@Tipo: Number
	*			@Descripción: Punto preimagen de la función generatriz
	* @Parámetro 4:
	*	@Nombre: dz
	*	@Tipo: Function
	*	@Descripción: Derivada de la coordenada Z de la función generatriz
	*		@Valor devuelto: Coordenada Z derivada de la función generatriz (Number)
	*		@Parámetro 1:
	*			@Tipo: Number
	*			@Descripción: Punto preimagen de la función generatriz
	* @Parámetro 5:
	*	@Nombre: dxx
	*	@Tipo: Function
	*	@Descripción: Segunda derivada de la coordenada Z de función generatriz
	*		@Valor devuelto: Coordenada X dos veces derivada de la función generatriz (Number)
	*		@Parámetro 1:
	*			@Tipo: Number
	*			@Descripción: Punto preimagen de la función generatriz
	* @Parámetro 6:
	*	@Nombre: dzz
	*	@Tipo: Function
	*	@Descripción: Segunda derivada de la coordenada Z de función generatriz
	*		@Valor devuelto: Coordenada Z dos veces derivada de la función generatriz (Number)
	*		@Parámetro 1:
	*			@Tipo: Number
	*			@Descripción: Punto preimagen de la función generatriz
	* @Parámetro 7:
	*	@Nombre: intervalo
	*	@Tipo: Intervalo
	*	@Descripción: Intervalo de definición de la función generatriz
	* @Parámetro 8:
	*	@Nombre: n
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada X del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
	*	@Precondición: Número mayor que cero
	* @Parámetro 9:
	*	@Nombre: k 
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada Y del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
	*	@Precondición: Número mayor que cero
	* @Parámetro 9:
	*	@Nombre: infoGeneratriz
	*	@Tipo: Object
	*	@Descripción: Objeto que contiene información sobre la generatriz. Como mínimo contiene la función generatriz en el clave "generatriz"
	*/
	constructor(x,z,dx,dz,dxx,dzz,intervalo,n=10,k=50,infoGeneratriz){
		super(infoGeneratriz.generatriz,intervalo,n,k)
		
		this.x=x
		
		this.z=z
		
		this.xDer=dx
		
		this.zDer=dz
		
		this.xDer2=dxx
		
		this.zDer2=dzz
		
		this.infoGeneratriz=infoGeneratriz
		
		//Malla de triángulos (incluye vértices, caras y colores)
		this.generarMalla()
		//Objeto para visualizar normales
		this.visorNormales = new THREE.VertexNormalsHelper( this.malla, 0.2, 0x00ff00, 1 );
		//Invisible por defecto
		this.visorNormales.visible=false
		
	}
	
	
	/*
	* @Descripción: Obtenemos el normal de un vértice a partir del producto vectorial de los vectores tangentes que generan el plano tangente de la superficie en el punto pasado
	* @Valor devuelto: Vector normal al vértice de tipo THREE.Vector3	
	* @Parámetro 1:
	*	@Nombre: punto2d
	*	@Tipo: THREE.Vector2
	*	@Descripción: Preimagen del punto donde calculamos el normal
	*/
	normal(punto2d){
		var t=punto2d.x
		var a=punto2d.y
		var tan1=new THREE.Vector3(this.xDer(t)*Math.cos(a),this.xDer(t)*Math.sin(a),this.zDer(t))
		var tan2=new THREE.Vector3(-this.x(t)*Math.sin(a),this.x(t)*Math.cos(a),0.0)
		return tan2.cross(tan1).normalize()
	}
	
	/*
	* @Descripción: Obtiene las curvaturas en el vértice cuya preimagen es el punto pasado.
	*				Nótese que la curvatura en una superficie de revolución no depende del ángulo de giro de la generatriz
	* @Valor devuelto: Objeto que contiene la curvatura de GauSS, la media, y las curvaturas principales
	* @Parámetro 1:
	*	@Nombre: punto2d
	*	@Tipo: THREE.Vector2
	*	@Descripción: Preimagen del punto donde calculamos las curvaturas
	*/
	curvatura(punto2d){
		var t=punto2d.x
		var x=this.x(t)
		var z=this.z(t)
		var dx=this.xDer(t)
		var dz=this.zDer(t)
		var dx2=this.xDer2(t)
		var dz2=this.zDer2(t)
		var norm=Math.sqrt(dx*dx+dz*dz)
		
		var curvatura={}
		
		curvatura.gauss=(dz*(dx*dz2-dx2*dz))/(x*(dx*dx+dz*dz)*(dx*dx+dz*dz))
		curvatura.media=(norm*norm*dz+x*(dx*dz2-dx2*dz))/(2*x*norm*norm*norm)
		curvatura.k1=curvatura.media+Math.sqrt(curvatura.media*curvatura.media-curvatura.gauss)
		curvatura.k2=curvatura.media-Math.sqrt(curvatura.media*curvatura.media-curvatura.gauss)
		return curvatura
	}
	
	/*
	* @Descripción: Genera la superficie mediante la definición de las variables de instancia antes descritas coloreando los puntos con un gradiente que nos señala como cambia la curvatura con una resolución fija
	* @Valor devuelto: Ninguno
	*/
	generarMalla(){

		var geometryMesh = new THREE.Geometry();
		this.normales=[]
		this.curvaturas=[]
		this.vertices=[]
		this.caras=[]
		this.uv=[]
		var pos
		var n=Math.max(Math.floor(this.n*(this.abto.intervaloX.limSup-this.abto.intervaloX.limInf)),this.n)
		var k=this.k
		//Añadimos vertices a la geometria de la malla, y guardamos los normales y curvatura de cada vértice
		for(let i=0; i<(n+1); i++){
			let ax=this.abto.intervaloX.limInf
			let bx=this.abto.intervaloX.limSup
			//La curvatura en superficies de revolución no depende del ángulo
			let gen=this.generatriz((bx-ax)*i/n+ax)
			for(let j=0; j<(k); j++){
				let ay=this.abto.intervaloY.intervalo.x
				let by=this.abto.intervaloY.intervalo.y
				this.normales.push(this.normal(new THREE.Vector2((bx-ax)*i/n+ax,(by-ay)*j/k+ay)))
				this.curvaturas.push( this.curvatura(new THREE.Vector2((bx-ax)*i/n+ax,(by-ay)*j/k+ay) ))
				this.uv.push(new THREE.Vector2(i/n,j/k))
				pos=this.vertices.push(new THREE.Vector3( Math.cos((by-ay)*j/k+ay)*gen.x, Math.sin((by-ay)*j/k+ay)*gen.x,gen.y))-1
				geometryMesh.vertices.push(this.vertices[pos].clone())
			}
			this.uv.push(new THREE.Vector2(i/n,1))
		}
		
		this.coloreado={gauss:[],media:[]}
		this.curvaturaConst={}
		
		var misExtremos=extremos(this.curvaturas.map(x=>x.gauss))
		
		this.curvaturaConst.gauss=(misExtremos.max-misExtremos.min)<tolerancia
		
		for(let i=0; i<this.vertices.length; i++)
			this.coloreado.gauss.push( new THREE.Color( (this.curvaturaConst.gauss)?0x7f007f:gradiente((this.curvaturas[i]["gauss"]-misExtremos.min)/(misExtremos.max-misExtremos.min) ) )) 

		misExtremos=extremos(this.curvaturas.map(x=>x.media))
		
		this.curvaturaConst.media=(misExtremos.max-misExtremos.min)<tolerancia
		
		for(let i=0; i<this.vertices.length; i++)
			this.coloreado.media.push( new THREE.Color( (this.curvaturaConst.media)?0x7f007f:gradiente((this.curvaturas[i]["media"]-misExtremos.min)/(misExtremos.max-misExtremos.min) ) )) 
		
		//Añadimos los colores a la geometría con el gradiente adecuado
		for(let i=0; i< this.coloreado[this.dibujaCurv].length; i++)
			geometryMesh.colors.push( this.coloreado[this.dibujaCurv][i].clone() ) 

		geometryMesh.faceVertexUvs=[[]]
		//Añadimos caras a la malla con colores y normales asociados
		for(let i=0; i<n; i++)
			for(let j=0; j<k; j++){
				
				pos=this.caras.push(new THREE.Face3(j+i*k, (j+1)%k+i*k, j+k+i*k))-1
				geometryMesh.faces.push(this.caras[pos].clone())
				geometryMesh.faces[pos].vertexColors=[this.coloreado[this.dibujaCurv][this.caras[pos].a].clone(),this.coloreado[this.dibujaCurv][this.caras[pos].b].clone(),this.coloreado[this.dibujaCurv][this.caras[pos].c].clone()]
				geometryMesh.faces[pos].vertexNormals=[this.normales[this.caras[pos].a].clone(),this.normales[this.caras[pos].b].clone(),this.normales[this.caras[pos].c].clone()]
				geometryMesh.faceVertexUvs[0].push([this.uv[j+i*(k+1)].clone(),this.uv[(j+1)+i*(k+1)].clone(),this.uv[j+(k+1)+i*(k+1)].clone()])
				
				pos=this.caras.push(new THREE.Face3(j+k+i*k, (j+1)%k +i*k,(j+1)%k+k+i*k))-1
				geometryMesh.faces.push(this.caras[pos].clone())
				geometryMesh.faces[pos].vertexColors=[this.coloreado[this.dibujaCurv][this.caras[pos].a].clone(),this.coloreado[this.dibujaCurv][this.caras[pos].b].clone(),this.coloreado[this.dibujaCurv][this.caras[pos].c].clone()]
				geometryMesh.faces[pos].vertexNormals=[this.normales[this.caras[pos].a].clone(),this.normales[this.caras[pos].b].clone(),this.normales[this.caras[pos].c].clone()]
				geometryMesh.faceVertexUvs[0].push([this.uv[j+(k+1)+i*(k+1)].clone(),this.uv[(j+1) +i*(k+1)].clone(),this.uv[(j+1)+(k+1)+i*(k+1)].clone()])
				
			}
	
		//Añadimos la malla y el visor de normales
		this.malla= new THREE.Mesh( geometryMesh, new THREE.MeshPhongMaterial({side: THREE.DoubleSide, vertexColors: THREE.VertexColors}) );
		this.malla.geometry.computeBoundingBox()
		var size=new THREE.Vector3()
		this.malla.geometry.boundingBox.getSize(size)
		this.dimMayor=Math.max(size.x,size.y,size.z)
	}
	
	
	/*
	* @Descripción: Genera uns superficie igual a la definida pero usando otra resolucíon distinta a la hora de generar la malla
	* @Valor devuelto: SuperficieRevolDifereciable con la misma definición salvo por su resolución.
	* @Parámetro 1:
	*	@Nombre: n
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada X del dominio a la que posteriormente se generará la malla
	*	@Precondición: Número mayor que cero
	* @Parámetro 2:
	*	@Nombre: k 
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada Y del dominio a la que posteriormente se generará la malla
	*	@Precondición: Número mayor que cero
	*/
	cambiaResolucion(n,k){
		return new SuperficieRevolDifereciable(this.x,this.z,this.xDer,this.zDer,this.xDer2,this.zDer2,this.abto.intervaloX,n,k,this.infoGeneratriz)
	}
	
}


/*
* @Nombre: SuperficieRevolDifereciableImplicita
* @Nombre de la clase base: SuperficieRevolDifereciable
* @Descripción: Clase para superficies diferenciables de revolución de la que conocemos un sistema de EDOs de tres ecuaciones que determinan la función generatriz
* (x(t),0,z(t)) es la generatriz y "s" una función derivable
*	
*	x'(t)=f(x,z,s,t)
*	z'(t)=g(x,z,s,t)
*	s'(t)=a(x,z,s,t)
*
*	(x(t0),z(t0),s(t0))=(x0,z0,s0)
*	Necesitamos x'' y z'' para poder calcular las curvaturas, luego df/dt y dg/dt
*
* @Variable de instancia 1:
*	@Nombre: a
*	@Tipo: Function
*	@Descripción: Función que calcula la tercera ecuación del sistema
*		@Valor devuelto: Valor númerico de la derivada de la tercera función del sistema "s"
*		@Parámetro 1:
*			@Tipo: Number
*			@Descripción: Coordenada X del punto donde calculamos la derivada
*		@Parámetro 2:
*			@Tipo: Number
*			@Descripción: Coordenada Z del punto donde calculamos la derivada
*		@Parámetro 3:
*			@Tipo: Number
*			@Descripción: Valor puntual de la función "s(t)" del sistema
*		@Parámetro 4:
*			@Tipo: Number
*			@Descripción: Valor del dominio del sistema cuya imagen son el resto de valores anteriores por cada función del sistema
* @Variable de instancia 2:
*	@Nombre: t0
*	@Tipo: Number
*	@Descripción: Instante inicial en el dominio del sistema
* @Variable de instancia 3:
*	@Nombre: x0
*	@Tipo: Number
*	@Descripción: Valor inicial de la primera función del sistema (coordenada X: x(t0))
* @Variable de instancia 4:
*	@Nombre: z0
*	@Tipo: Number
*	@Descripción: Valor inicial de la segunda función del sistema (coordenada Z: z(t0))
* @Variable de instancia 5:
*	@Nombre: s0
*	@Tipo: Number
*	@Descripción: Valor inicial de la tercera función del sistema (función "s": s(t0))
*/
class SuperficieRevolDifereciableImplicita extends SuperficieRevolDifereciable{
	
	/*
	* @Descripción: Constructor de la clase al cual pasamos como parámetros los datos necesarios para aplicar el método de Runge Kutta de orden 4 y así hacer un cálculo numérico de las soluciones
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre: f
	*	@Tipo: Function
	*	@Descripción: Función derivada de la coordenada X de la función generatriz del plano Y=0 que genera la superficie de revolución.
	*		@Valor devuelto: Derivada de la coordenada X de la función generatriz (Number)
	*		@Parámetro 1:
	*			@Tipo: Number
	*			@Descripción: Coordenada X del punto donde calculamos la derivada
	*		@Parámetro 2:
	*			@Tipo: Number
	*			@Descripción: Coordenada Z del punto donde calculamos la derivada
	*		@Parámetro 3:
	*			@Tipo: Number
	*			@Descripción: Valor puntual de la función "s(t)" del sistema
	*		@Parámetro 4:
	*			@Tipo: Number
	*			@Descripción: Valor del dominio del sistema cuya imagen son el resto de valores anteriores por cada función del sistema
	* @Parámetro 2:
	*	@Nombre: g
	*	@Tipo: Function
	*	@Descripción: Función derivada de la coordenada Z de la función generatriz del plano Y=0 que genera la superficie de revolución.
	*		@Valor devuelto: Derivada de la coordenada Z de la función generatriz (Number)
	*		@Parámetro 1:
	*			@Tipo: Number
	*			@Descripción: Coordenada X del punto donde calculamos la derivada
	*		@Parámetro 2:
	*			@Tipo: Number
	*			@Descripción: Coordenada Z del punto donde calculamos la derivada
	*		@Parámetro 3:
	*			@Tipo: Number
	*			@Descripción: Valor puntual de la funcion "s(t)" del sistema
	*		@Parámetro 4:
	*			@Tipo: Number
	*			@Descripción: Valor del dominio del sistema cuya imagen son el resto de valores anteriores por cada función del sistema
	* @Parámetro 3:
	*	@Nombre: a
	*	@Tipo: Function
	*	@Descripción: Función que calcula la tercera ecuación del sistema
	*		@Valor devuelto: Valor númerico de la derivada de la tercera función del sistema "s"
	*		@Parámetro 1:
	*			@Tipo: Number
	*			@Descripción: Coordenada X del punto donde calculamos la derivada
	*		@Parámetro 2:
	*			@Tipo: Number
	*			@Descripción: Coordenada Z del punto donde calculamos la derivada
	*		@Parámetro 3:
	*			@Tipo: Number
	*			@Descripción: Valor puntual de la función "s(t)" del sistema
	*		@Parámetro 4:
	*			@Tipo: Number
	*			@Descripción: Valor del dominio del sistema cuya imagen son el resto de valores anteriores por cada función del sistema
	* @Parámetro 4:
	*	@Nombre: Df
	*	@Tipo: Function
	*	@Descripción: Segunda derivada de la coordenada X de la función generatriz obtenida de derivar la primera ecuación del sistema 
	*		@Valor devuelto: Segunda derivada de la coordenada X de la función generatriz (Number)
	*		@Parámetro 1:
	*			@Tipo: Number
	*			@Descripción: Coordenada X del punto donde calculamos la derivada
	*		@Parámetro 2:
	*			@Tipo: Number
	*			@Descripción: Coordenada Z del punto donde calculamos la derivada
	*		@Parámetro 3:
	*			@Tipo: Number
	*			@Descripción: Valor puntual de la función "s(t)" del sistema
	*		@Parámetro 4:
	*			@Tipo: Number
	*			@Descripción: Valor del dominio del sistema cuya imagen son el resto de valores anteriores por cada función del sistema
	* @Parámetro 5:
	*	@Nombre: Dg
	*	@Tipo: Function
	*	@Descripción: Segunda derivada de la coordenada Z de la función generatriz obtenida de derivar la primera ecuación del sistema 
	*		@Valor devuelto: Segunda derivada de la coordenada Z de la función generatriz (Number)
	*		@Parámetro 1:
	*			@Tipo: Number
	*			@Descripción: Coordenada X del punto donde calculamos la derivada
	*		@Parámetro 2:
	*			@Tipo: Number
	*			@Descripción: Coordenada Z del punto donde calculamos la derivada
	*		@Parámetro 3:
	*			@Tipo: Number
	*			@Descripción: Valor puntual de la función "s(t)" del sistema
	*		@Parámetro 4:
	*			@Tipo: Number
	*			@Descripción: Valor del dominio del sistema cuya imagen son el resto de valores anteriores por cada función del sistema
	* @Parámetro 6:
	*	@Nombre: t0
	*	@Tipo: Number
	*	@Descripción: Instante inicial en el dominio del sistema
	* @Parámetro 7:
	*	@Nombre: x0
	*	@Tipo: Number
	*	@Descripción: Valor inicial de la primera función del sistema (coordenada X: x(t0))
	* @Parámetro 8:
	*	@Nombre: z0
	*	@Tipo: Number
	*	@Descripción: Valor inicial de la segunda función del sistema (coordenada Z: z(t0))
	* @Parámetro 9:
	*	@Nombre: s0
	*	@Tipo: Number
	*	@Descripción: Valor inicial de la tercera función del sistema (función "s": s(t0))
	* @Parámetro 10:
	*	@Nombre: intervalo
	*	@Tipo: Intervalo
	*	@Descripción: Intervalo de definición del sistema y por tanto de la función generatriz
	* @Parámetro 11:
	*	@Nombre: n
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada X del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
	*	@Precondición: Número mayor que cero
	* @Parámetro 12:
	*	@Nombre: k 
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada Y del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
	*	@Precondición: Número mayor que cero
	*/
	constructor(f,g,a,Df,Dg,t0,x0,z0,s0,intervalo,n=10,k=50){
		var gen=function(t){
			var aux=RungeKutta4Sis(f,g,a,t,t0,x0,z0,s0,0.01)
			
			return new THREE.Vector2(aux.x,aux.y)
		}
		
		var x= function(t){
			var aux=RungeKutta4Sis(f,g,a,t,t0,x0,z0,s0,0.01)
			
			return aux.x
		}
		
		var z= function(t){
			var aux=RungeKutta4Sis(f,g,a,t,t0,x0,z0,s0,0.01)
			
			return aux.y
		}
		
		var EDO= function(t){
			return RungeKutta4Sis(f,g,a,t,t0,x0,z0,s0,0.01)
		}
		
		super(x,z,f,g,Df,Dg,intervalo,n,k,{generatriz:gen,EDO:EDO})
		
		this.a=a
		
		this.t0=t0
		
		this.x0=x0
		this.z0=z0
		this.s0=s0
	}
	
	/*
	* @Descripción: Obtenemos el normal de un vértice a partir del producto vectorial de los vectores tangentes que generan el plano tangente de la superficie en el punto pasado
	* @Valor devuelto: Vector normal al vértice de tipo THREE.Vector3	
	* @Parámetro 1:
	*	@Nombre: x
	*	@Tipo: Number
	*	@Descripción: Coordenada X del vértice al que calculamos el normal
	* @Parámetro 2:
	*	@Nombre: z
	*	@Tipo: Number
	*	@Descripción: Coordenada Z del vértice al que calculamos el normal
	* @Parámetro 3:
	*	@Nombre: s
	*	@Tipo: Number
	*	@Descripción: Valor de la función "s" del vértice al que calculamos el normal
	* @Parámetro 4:
	*	@Nombre: t
	*	@Tipo: Number
	*	@Descripción: Valor del dominio de la función generatriz cuya imagen tiene las coordenadas anteriores
	* @Parámetro 5:
	*	@Nombre: a
	*	@Tipo: Number
	*	@Descripción: Ángulo de giro de la función generatriz
	*/
	normal(x,z,s,t,a){
		var tan1=new THREE.Vector3(this.xDer(x,z,s,t)*Math.cos(a),this.xDer(x,z,s,t)*Math.sin(a),this.zDer(x,z,s,t))
		var tan2=new THREE.Vector3(-x*Math.sin(a),x*Math.cos(a),0.0)
		return tan2.cross(tan1).normalize()
	}
	
	/*
	* @Descripción: Obtiene las curvaturas en el vértice cuya imagen y preimagen son las pasadas
	*				Nótese que la curvatura en una superficie de revolución no depende del ángulo de giro de la generatriz
	* @Valor devuelto: Objeto que contiene la curvatura de GauSS, la media, y las curvaturas principales
	* @Parámetro 1:
	*	@Nombre: x
	*	@Tipo: Number
	*	@Descripción: Coordenada X del vértice al que calculamos la curvatura
	* @Parámetro 2:
	*	@Nombre: z
	*	@Tipo: Number
	*	@Descripción: Coordenada Z del vértice al que calculamos la curvatura
	* @Parámetro 3:
	*	@Nombre: s
	*	@Tipo: Number
	*	@Descripción: Valor de la función "s" del vértice al que calculamos la curvatura
	* @Parámetro 4:
	*	@Nombre: t
	*	@Tipo: Number
	*	@Descripción: Valor del dominio de la función generatriz cuya imagen tiene las coordenadas anteriores
	*/
	curvatura(x,z,s,t){
		var dx=this.xDer(x,z,s,t)
		var dz=this.zDer(x,z,s,t)
		var dx2=this.xDer2(x,z,s,t)
		var dz2=this.zDer2(x,z,s,t)
		var norm=Math.sqrt(dx*dx+dz*dz)
		
		var curvatura={}
		
		curvatura.gauss=(dz*(dx*dz2-dx2*dz))/(x*(dx*dx+dz*dz)*(dx*dx+dz*dz))
		curvatura.media=(norm*norm*dz+x*(dx*dz2-dx2*dz))/(2*x*norm*norm*norm)
		curvatura.k1=curvatura.media+Math.sqrt(curvatura.media*curvatura.media-curvatura.gauss)
		curvatura.k2=curvatura.media-Math.sqrt(curvatura.media*curvatura.media-curvatura.gauss)
		return curvatura
		
	}
	
	/*
	* @Descripción: Genera la superficie mediante la definición de las variables de instancia antes descritas coloreando los puntos con un gradiente que nos señala como cambia la curvatura con una resolución fija
	* @Valor devuelto: Ninguno
	*/
	generarMalla(){

		var geometryMesh = new THREE.Geometry();
		this.normales=[]
		this.curvaturas=[]
		this.vertices=[]
		this.caras=[]
		this.uv=[]
		var pos
		var n=Math.max(Math.floor(this.n*(this.abto.intervaloX.limSup-this.abto.intervaloX.limInf)),this.n)
		var k=this.k
		//Añadimos vertices a la geometria de la malla, y guardamos los normales y curvatura de cada vértice
		for(let i=0; i<(n+1); i++){
			let ax=this.abto.intervaloX.limInf
			let bx=this.abto.intervaloX.limSup
			let sistema=this.infoGeneratriz.EDO((bx-ax)*i/n+ax)
			//La curvatura en superficies de revolución no depende del ángulo
			for(let j=0; j<(k); j++){
				let ay=this.abto.intervaloY.intervalo.x
				let by=this.abto.intervaloY.intervalo.y
				this.normales.push(this.normal(   sistema.x,sistema.y,sistema.z , (bx-ax)*i/n+ax ,(by-ay)*j/k+ay))
				this.curvaturas.push( this.curvatura(sistema.x,sistema.y,sistema.z,(bx-ax)*i/n+ax) )
				this.uv.push(new THREE.Vector2(i/n,j/k))
				pos=this.vertices.push(new THREE.Vector3( Math.cos((by-ay)*j/k+ay)*sistema.x, Math.sin((by-ay)*j/k+ay)*sistema.x,sistema.y))-1
				geometryMesh.vertices.push(this.vertices[pos].clone())
			}
			this.uv.push(new THREE.Vector2(i/n,1))
		}
		
		this.coloreado={gauss:[],media:[]}
		this.curvaturaConst={}
		
		var misExtremos=extremos(this.curvaturas.map(x=>x.gauss))
		
		this.curvaturaConst.gauss=(misExtremos.max-misExtremos.min)<tolerancia
		
		for(let i=0; i<this.vertices.length; i++)
			this.coloreado.gauss.push( new THREE.Color( (this.curvaturaConst.gauss)?0x7f007f:gradiente((this.curvaturas[i]["gauss"]-misExtremos.min)/(misExtremos.max-misExtremos.min) ) )) 

		misExtremos=extremos(this.curvaturas.map(x=>x.media))
		
		this.curvaturaConst.media=(misExtremos.max-misExtremos.min)<tolerancia
		
		for(let i=0; i<this.vertices.length; i++)
			this.coloreado.media.push( new THREE.Color( (this.curvaturaConst.media)?0x7f007f:gradiente((this.curvaturas[i]["media"]-misExtremos.min)/(misExtremos.max-misExtremos.min) ) )) 
		
		//Añadimos los colores a la geometría con el gradiente adecuado
		for(let i=0; i< this.coloreado[this.dibujaCurv].length; i++)
			geometryMesh.colors.push( this.coloreado[this.dibujaCurv][i].clone() ) 
		

		geometryMesh.faceVertexUvs=[[]]
		//Añadimos caras a la malla con colores y normales asociados
		for(let i=0; i<n; i++)
			for(let j=0; j<k; j++){
				pos=this.caras.push(new THREE.Face3(j+i*k, (j+1)%k+i*k, j+k+i*k))-1
				geometryMesh.faces.push(this.caras[pos].clone())
				geometryMesh.faces[pos].vertexColors=[this.coloreado[this.dibujaCurv][this.caras[pos].a].clone(),this.coloreado[this.dibujaCurv][this.caras[pos].b].clone(),this.coloreado[this.dibujaCurv][this.caras[pos].c].clone()]
				geometryMesh.faces[pos].vertexNormals=[this.normales[this.caras[pos].a].clone(),this.normales[this.caras[pos].b].clone(),this.normales[this.caras[pos].c].clone()]
				geometryMesh.faceVertexUvs[0].push([this.uv[j+i*(k+1)].clone(),this.uv[(j+1)+i*(k+1)].clone(),this.uv[j+(k+1)+i*(k+1)].clone()])

				pos=this.caras.push(new THREE.Face3(j+k+i*k, (j+1)%k +i*k,(j+1)%k+k+i*k))-1
				geometryMesh.faces.push(this.caras[pos].clone())
				geometryMesh.faces[pos].vertexColors=[this.coloreado[this.dibujaCurv][this.caras[pos].a].clone(),this.coloreado[this.dibujaCurv][this.caras[pos].b].clone(),this.coloreado[this.dibujaCurv][this.caras[pos].c].clone()]
				geometryMesh.faces[pos].vertexNormals=[this.normales[this.caras[pos].a].clone(),this.normales[this.caras[pos].b].clone(),this.normales[this.caras[pos].c].clone()]
				geometryMesh.faceVertexUvs[0].push([this.uv[j+(k+1)+i*(k+1)].clone(),this.uv[(j+1) +i*(k+1)].clone(),this.uv[(j+1)+(k+1)+i*(k+1)].clone()])
			}
	
		//Añadimos la malla y el visor de normales
		this.malla= new THREE.Mesh( geometryMesh, new THREE.MeshPhongMaterial({side: THREE.DoubleSide, vertexColors: THREE.VertexColors}) );
		this.malla.geometry.computeBoundingBox()
		var size=new THREE.Vector3()
		this.malla.geometry.boundingBox.getSize(size)
		this.dimMayor=Math.max(size.x,size.y,size.z)
		
	}
	
	/*
	* @Descripción: Genera uns superficie igual a la definida pero usando otra resolucíon distinta a la hora de generar la malla
	* @Valor devuelto: SuperficieRevolDifereciableImplicita con la misma definición salvo por su resolución.
	* @Parámetro 1:
	*	@Nombre: n
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada X del dominio a la que posteriormente se generará la malla
	*	@Precondición: Número mayor que cero
	* @Parámetro 2:
	*	@Nombre: k 
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada Y del dominio a la que posteriormente se generará la malla
	*	@Precondición: Número mayor que cero
	*/
	cambiaResolucion(n,k){
		return new SuperficieRevolDifereciableImplicita(this.xDer,this.zDer,this.a,this.xDer2,this.zDer2,this.t0,this.x0,this.z0,this.s0,this.abto.intervaloX,n,k)
	}
}

/*
* @Nombre: SuperficieRevolDifereciableExplicita
* @Nombre de la clase base: SuperficieRevolDifereciable
* @Descripción: Clase para superficies de revolución de las que sabemos explícitamente las coordenadas de la función generatriz
*/
class SuperficieRevolDifereciableExplicita extends SuperficieRevolDifereciable{
	
	
	/*
	* @Descripción: Crea todos los parámetros necesarios para usar la funcionalidad de la clase base
	* @Valor devuelto: Ninguno
	* @Parámetro 1:
	*	@Nombre: expX
	*	@Tipo: String
	*	@Descripción: Expresión de la coordenada X de la generatriz de la superficie de revolución en función de su parámetro
	* @Parámetro 2:
	*	@Nombre: expZ
	*	@Tipo:
	*	@Descripción: Expresión de la coordenada Z de la generatriz de la superficie de revolución en función de su parámetro
	* @Parámetro 3:
	*	@Nombre: parametro
	*	@Tipo: String
	*	@Descripción: Nombre de la variable que corresponde al parámetro de la expresión de la función generatriz
	* @Parámetro 4:
	*	@Nombre: intervalo
	*	@Tipo: Intervalo
	*	@Descripción: Intervalo de definición de la función generatriz
	* @Parámetro 5:
	*	@Nombre: n
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada X del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
	*	@Precondición: Número mayor que cero
	* @Parámetro 6:
	*	@Nombre: k 
	*	@Tipo: Number
	*	@Descripción: Resolución en la coordenada Y del dominio a la que posteriormente se generará la malla de las superficies en las clases que implementen su generación
	*	@Precondición: Número mayor que cero
	*/
	constructor(expX,expZ,parametro,intervalo,n=20,k=50){
		var arbolX=parser(lexer(expX)).toArbolExp()
		var arbolZ=parser(lexer(expZ)).toArbolExp()
		var x=function(t){var dicc={}; dicc[parametro]=t;return arbolX.evaluar(dicc)}
		var z=function(t){var dicc={}; dicc[parametro]=t;return arbolZ.evaluar(dicc)}
		
		var arbolXD1=arbolX.derivada(parametro)
		var arbolZD1=arbolZ.derivada(parametro)
		
		var arbolXD2=arbolXD1.derivada(parametro)
	
		var arbolZD2=arbolZD1.derivada(parametro)
		
		var xDer=function(t){var dicc={}; dicc[parametro]=t;return arbolXD1.evaluar(dicc)}
		
		var zDer=function(t){var dicc={}; dicc[parametro]=t;return arbolZD1.evaluar(dicc)}
		
		var xDer2=function(t){var dicc={}; dicc[parametro]=t;return arbolXD2.evaluar(dicc)}
		
		var zDer2=function(t){var dicc={}; dicc[parametro]=t;return arbolZD2.evaluar(dicc)}
		
		super(x,z,xDer,zDer,xDer2,zDer2,intervalo,n,k,{generatriz:function(t){return new THREE.Vector2(x(t),z(t))}})
		
	}
	
}

/*
* @Nombre: Grafo2D
* @Descripción: Clase para dibujar un grafo sobre el plano y=0, (x(t),0,z(t))
* @Variable de instancia 1:
*	@Nombre: this.funGrafo2D
*	@Tipo:	Function
*	@Descripción: Función que define los valores numéricos del grafo dada una preimagen
*		@Valor devuelto: Imagen del grafo en la preimagen evaluada (Number)
*		@Parámetro 1:
*			@Tipo: Number
*			@Descripción: Preimagen
* @Variable de instancia 2:
*	@Nombre: this.abto
*	@Tipo:	Intervalo
*	@Descripción: Intervalo de definición del grafo
* @Variable de instancia 3:
*	@Nombre: this.n
*	@Tipo: Number
*	@Descripción: Resolución a la que dibujamos la línea del grafo 
* @Variable de instancia 4:
*	@Nombre: this.line
*	@Tipo: THREE.Line
*	@Descripción: Objeto que representa una polilínea abierta
*/
class Grafo2D{
	
	/*
	* @Descripción: Constructor de la clase que inicializa las variables de instancia necesarias para completar su funcionalidad
	* @Parámetro 1:
	*	@Nombre: funGrafo
	*	@Tipo:	Function
	*	@Descripción: Función que define los valores numéricos del grafo dada una preimagen
	*		@Valor devuelto: Imagen del grafo en la preimagen evaluada (Number)
	*		@Parámetro 1:
	*			@Tipo: Number
	*			@Descripción: Preimagen
	* @Parámetro 2:
	*	@Nombre: abto
	*	@Tipo:	Intervalo
	*	@Descripción: Intervalo de definición del grafo
	* @Parámetro 3:
	*	@Nombre: n
	*	@Tipo: Number
	*	@Descripción: Resolución a la que dibujamos la línea del grafo 
	*/
	constructor(funGrafo,abto,n=100){
		this.funGrafo2D=funGrafo
		this.abto=abto.clone()
		this.n=n
		this.line=this.generarGrafo()
		this.line.geometry.computeBoundingBox()
	}
	
	/*
	* @Descripción: Función que genera el grafo a una resolución dada
	* @Valor devuelto: Objeto que almacena la geometría de la polilínea
	*/
	generarGrafo(){
		
		var n=Math.floor(this.n*(this.abto.limSup-this.abto.limInf))
		var material = new THREE.LineBasicMaterial({
			color: 0xffffff,
			linewidth: 10
		});

		var geometry = new THREE.Geometry();
		for(let i=0; i<(n+1) ; i++){
			let a=this.abto.limInf
			let b=this.abto.limSup
			let val=this.funGrafo2D((b-a)*i/n+a)
			geometry.vertices.push(	new THREE.Vector3( val.y , 0, val.x ));
		}
		return new THREE.Line( geometry, material );
	}
	
}
