//Almacena y gestiona los elementos a visualizar
var scene = new THREE.Scene();
//Objeto usado para almacenar mallas 3D centradas el cual tendrá un desplazamiento
var miEscena3D= new THREE.Group();
//Superficie actual o grafo 2D
//Si es una superficie debe tener variables de intancias llamadas "malla", "visorNormales", "dimMayor" y, solo en el caso de ser de revolución, "lineaGen"
var objetoActual
//Prisma base el cual servira para proyectar las sombras de las mallas
var prisma = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.BackSide} ) );

//Camara de proyección perspectiva (fov, aspect ratio, near y far)
var camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth/window.innerHeight, 
  0.1, 
  1000
);


//La cámara estará orientada con el eje Z horizontalmente y el eje X verticalmente
camera.position.y= 10;
camera.up.y=0;
camera.up.x=1;


//Añadimos el renderer
var renderer = new THREE.WebGLRenderer();

//Hacemos que su tamaño sea del 70% del tamaño de la ventana
renderer.setSize( window.innerWidth*0.7, window.innerHeight*0.7 );
// Añadimos el canvas al documento
document.getElementById("canvas").appendChild( renderer.domElement );

//Color de fondo gris oscuro
renderer.setClearColor( 0x333333 );

/////////////////////////////////////////
// Trackball Controller
/////////////////////////////////////////

//Controlador de la cámara mediante el ratón
controls = new THREE.TrackballControls( camera , renderer.domElement);
controls.rotateSpeed = 2.5;
controls.zoomSpeed = 0.8;
controls.panSpeed = 0.4;
//controls.staticMoving = false; //Si lo ponemos en false el movimiento de la cámara es menos fluido
//controls.dynamicDampingFactor = 0.2; //Grado de fluidez
controls.minDistance=1;

/////////////////////////////////////////
// Luces
/////////////////////////////////////////

//Luz ambiental y direccional
var luces= new THREE.Group()
var light = new THREE.AmbientLight( 0xffffff, 0.5 );
var dlight=new THREE.DirectionalLight(0xFFFFFF,0.8);
//Posición
dlight.position.set(0, 0, 1);
luces.add(light);
luces.add(dlight);
//Lo añdimos a la escena
miEscena3D.add(luces);

/////////////////////////////////////////
// Añadimos los ejes
/////////////////////////////////////////

var axisHelper = new THREE.AxesHelper(50);
scene.add( axisHelper );
scene.add( miEscena3D );

/////////////////////////////////////////
// Bucle de renderización
/////////////////////////////////////////

/*
* @Descripción: Función para renderizar usando la escena y la cámara
* @Valor devuelto: Ninguno
*/
function render() {
  renderer.render( scene, camera );
}

//Si detectamos un cambio por el ratón renderizamos la escena aplicando dicho cambio
controls.addEventListener( 'change', render );



//Generamos las matrices de giro para  la animación
var matricesRotacion=[]
for(let i=0,n=1000; i<n; i++)
	matricesRotacion.push(new THREE.Matrix4().makeRotationX (2*Math.PI*(i%n)/n))



/*
* @Descripción: Actualizamos los controles de la cámara según los cambios captados por el ratón en un bucle infinito de javascript
*               Además animamos con un giro las mallas si activamos la opción
* @Valor devuelto: Ninguno
*/

var posGiro=0 //Posición del vector de matrices de giro
function animationLoop() {
  requestAnimationFrame(animationLoop);
  controls.update()
  
  if(miEscena3D.children[1]!=undefined && miEscena3D.children[1].type=="Mesh" && options.gira){
	objetoActual.malla.matrix.multiplyMatrices(matricesRotacion[posGiro],new THREE.Matrix4().setPosition(miEscena3D.position.clone().negate()))
	posGiro++
	posGiro=posGiro%matricesRotacion.length
	objetoActual.visorNormales.update()
	render();
  }
  
}

animationLoop();


/////////////////////////////////////////
// Cambios a realizar si redimensionamos la ventana
/////////////////////////////////////////

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth*0.7, window.innerHeight*0.7 );
  controls.handleResize();
  render();
}, false );

/*
* @Descripción: Define la posición de la escena 3D en base al centro del objeto a dibujar, además redefine la cámara ortográfica de la luz
*				direccional para que se proyecte la sombra, en caso necesario, de forma correcta. Por último formatea los controles para que
*				la cámara de la escena enfoque al objeto dibujado
* @Valor devuelto: 
*/
function setCenter(){
	objetoActual.malla.geometry.boundingBox.getCenter(miEscena3D.position)
	//
	objetoActual.malla.matrixAutoUpdate=false
	objetoActual.malla.matrix.setPosition( miEscena3D.position.clone().negate() )
	//
	
	dlight.target.position.copy(miEscena3D.position)
	dlight.target.updateMatrixWorld()
	
	dlight.shadow.camera.right=objetoActual.dimMayor
	dlight.shadow.camera.left=-objetoActual.dimMayor
	dlight.shadow.camera.top=objetoActual.dimMayor
	dlight.shadow.camera.bottom=-objetoActual.dimMayor
	dlight.shadow.camera.updateProjectionMatrix()
	
	controls.target0.copy(miEscena3D.position)
	controls.position0.copy(new THREE.Vector3(0,1.5*objetoActual.dimMayor,0))
	controls.position0.add(miEscena3D.position)
	
}

/*
* @Descripción: Borra todos los elementos de la escena salvo el foco de luz y los ejes. Además reinicia los controles de la cámara
* @Valor devuelto: Ninguno
*/
function clearScene(){
	
	while(miEscena3D.children.length > 1)
		miEscena3D.remove(miEscena3D.children[miEscena3D.children.length-1]); 
	
	while(scene.children.length > 2)
		scene.remove(scene.children[scene.children.length-1]); 
	
}

/////////////////////////////////////////
// Definición de la textura
/////////////////////////////////////////


var texture = new THREE.TextureLoader().load( "imagenes/textura.png" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.minFilter=THREE.LinearFilter


/////////////////////////////////////////
// Definición de la interfaz de usuario
/////////////////////////////////////////

//Ponemos los botones en español y colocamos el objeto HTML
dat.GUI.TEXT_CLOSED="Cerrar controles"
dat.GUI.TEXT_OPEN="Abrir controles"
var gui = new dat.GUI( { autoPlace: false } );
gui.domElement.align="left"
document.getElementById("gui").append(gui.domElement)

/*
* @Descripción: Opciones que controla la GUI
*	 @Opción 1: "alpha" Ángulo azimutal de las coordenadas esfericas de la luz direccional
*	 @Opción 2: "beta" Ángulo colatitud de las coordenadas esfericas de la luz direccional
*	 @Opción 3: "verMalla" Indica si vemos la superficie completa o solo las fronteras de los triángulos de la malla
*	 @Opción 4: "dibujaNormales" Indica si visulaizamos el visor de los normales de la malla
*	 @Opción 5: "invierteNormales" Indica si invertimos el sentido de los normales de la malla (afecta a la iluminación de ésta)
*	 @Opción 6: "gira" Indica si actualmente la malla está girando sobre el eje vertical que pasa por el centro de ésta 
*	 @Opción 7: "rejilla" Indica si activamos la textura que dibuja una rejilla sobre la superficie
*	 @Opción 8: "sombras" Indica si activamos el prisma que encierra a la malla sobre el cuals e proyectan la sombra de esta en sus caras interiores
*	 @Opción 9: "shininess" Indica el gradi de brillo que tiene nuestro material
*	 @Opción 10: "specular" Indica el color del brillo que emite nuestro material
*	 @Opción 11: "curv" Indica que colores se estan usando para el dibujado de la malla, si los que indica como cambia la curvatura media o la de Gauss
*	 @Opción 12: "resolucionX" Valor que define la resolución a la que generamos la malla en el eje X del dominio de la superficie
*	 @Opción 13: "resolucionY" Valor que define la resolución a la que generamos la malla en el eje Y del dominio de la superficie
*	 @Opción 14: "perfilSuper" Función que alterna, con superficies de revolución, si se dibuja la superficie eo el perfil de ésta
*	 @Opción 15: "frontLight" Función establece los ángulos necesarios para orientar la luz al frente
*	 @Opción 16: "backLight" Función establece los ángulos necesarios para orientar la luz a la parte trasera
*	 @Opción 17: "topLight" Función establece los ángulos necesarios para orientar la luz arriba
*	 @Opción 18: "bottomtLight" Función establece los ángulos necesarios para orientar la luz abajo
*	 @Opción 19: "rightLight" Función establece los ángulos necesarios para orientar la luz a la derecha
*	 @Opción 20: "leftLight" Función establece los ángulos necesarios para orientar la luz a la izquierda
*/

var options={
	alpha: 0,
	beta: 90,
	verMalla:false,
	dibujaNormales:false,
	invierteNormales:false,
	gira:false,
	rejilla:false,
	sombras:false,
	shininess:30,
	specular:0xaaaaaa,
	curv:"gauss",
	resolucionX: 20,
	resolucionY: 50,
	perfilSuper: function(){
				if( objetoActual instanceof SuperficieRevol){
					var esMalla=miEscena3D.children.length>1
					clearScene()
					
					if(esMalla)
						scene.add(objetoActual.lineaGen)
					else{
						miEscena3D.add( objetoActual.malla )
						scene.add( objetoActual.visorNormales )
						updateControlsGui()
					}
					
					render()
				}				
			},
	frontLight: function(){valorAlpha.setValue(0);valorBeta.setValue(0);},
	backLight: function(){valorAlpha.setValue(0);valorBeta.setValue(180);},
	topLight: function(){valorAlpha.setValue(90);valorBeta.setValue(90);},
	bottomtLight: function(){valorAlpha.setValue(270);valorBeta.setValue(90);},
	rightLight: function(){valorAlpha.setValue(0);valorBeta.setValue(90);},
	leftLight: function(){valorAlpha.setValue(180);valorBeta.setValue(90);},
}

var curvatura={Gauss:"gauss",Media:"media"}

//Activamos los perfiles
gui.remember(options)
//Si no queremos dar opción a ver el botoón de la rueda dentada del menu
//document.getElementsByClassName("button gears")[0].style="display: none"
document.getElementsByClassName("button save")[0].innerHTML="Guardar"
document.getElementsByClassName("button save-as")[0].innerHTML="Nuevo"
document.getElementsByClassName("button revert")[0].innerHTML="Reiniciar"
document.getElementsByClassName("save-row")[0].children[0].style="width: 85px"

//Array para guardar las opciones relativas a la malla (salvo la resolución a la que se genera)
var controles=[]

//Añadimos las opciones
var folder=gui.addFolder("Luz")
folder.addFolder("Luz Ambiental").add(light,"intensity",0,2).onChange(render).name("Intensidad")
folder=folder.addFolder("Luz Direccional")
var valorAlpha=folder.add(options,"alpha",0,359.99).onChange(actualizarPosicionLuz).name("Azimutal")
var valorBeta=folder.add(options,"beta",0.01,179.99).onChange(actualizarPosicionLuz).name("Colatitud")
folder.add(dlight,"intensity",0,2).onChange(render).name("Intensidad")
folder.add(options,"frontLight").name("Luz Frontal")
folder.add(options,"backLight").name("Luz Trasera")
folder.add(options,"topLight").name("Luz Superior")
folder.add(options,"bottomtLight").name("Luz Inferior")
folder.add(options,"rightLight").name("Luz Derecha")
folder.add(options,"leftLight").name("Luz Izquierda")


folder=gui.addFolder("Malla")
var checkVerMalla=folder.add(options,"verMalla").onChange(dibujaMalla).name("Ver malla")
var checkDibujaNormales=folder.add(options,"dibujaNormales").onChange(dibujaNormales).name("Dibujar normales")
var checkDireccionNormales=folder.add(options,"invierteNormales").onChange(cambiaNormales).name("Invertir normales")
var checkGira=folder.add(options,"gira").name("Girar")
var opcionCurv=folder.add(options,"curv",curvatura).onChange(cambiaCurvatura).name("Curvatura")

controles.push(checkVerMalla,checkDibujaNormales,checkDireccionNormales,opcionCurv)

var folder2=folder.addFolder("Textura isocurvas")
controles.push(  folder2.add(options,"rejilla").onChange(activaTextura).name("Activar textura")  								)
controles.push(  folder2.add(texture.repeat,"x",1,20,1).onChange(function(){if( objetoActual instanceof Superficie){actualizaMaterial()}}).name("Repetir en X")  	)
controles.push(  folder2.add(texture.repeat,"y",1,20,1).onChange(function(){if( objetoActual instanceof Superficie){actualizaMaterial()}}).name("Repetir en Y")  	)
controles.push(  folder.add(options,"sombras").onChange(activaSombras).name("Activar sombras")  								)
controles.push(  folder.add(options,"shininess",0,100).onChange(chambiaBrillo).name("Inten. del brillo")  					)
controles.push(  folder.addColor(options,"specular").onChange(cambiaColorBrillo).name("Color del brillo")  					)
folder.add(options,"resolucionX",10,100,2).onFinishChange(cambiaResolucionX).name("Resolución en X")
folder.add(options,"resolucionY",10,100,2).onFinishChange(cambiaResolucionY).name("Resolución en Y")
folder.add(options,"perfilSuper").name("Perfil/Superficie")


/*
* @Descripción: Actualiza las opciones de visualización de la malla
* @Valor devuelto: Ninguno
*/
function updateControlsGui(){
	controles.map(x=>x.__onChange(x.getValue()))
}


/*
* @Descripción: Alterna entre dibujar o no los vectores normales
* @Valor devuelto: Ninguno
* @Parámetro 1:
*	@Nombre: x
*	@Tipo: Boolean
*	@Descripción: Indica si hacemos visibles los normales o no
*/
function dibujaNormales(x){

	if( objetoActual instanceof Superficie){
		objetoActual.visorNormales.visible=x
		
		render()
	}
	
}


/*
* @Descripción: Activamos la opción para que se dibuje solo las lineas de la malla sin el interior de los tirangulos
* @Valor devuelto: Ninguno
* @Parámetro 1:
*	@Nombre: x
*	@Tipo: Boolean
*	@Descripción: Indica si dibujamos la malla o la superficie (true si dibujamos la malla)
*/

function dibujaMalla(x){

	if( objetoActual instanceof Superficie){
		objetoActual.malla.material.wireframe=x
		
		render()
	}
		
}

/*
* @Descripción: Cambiamos la orientación de los normales
* @Valor devuelto: Ninguno
* @Parámetro 1:
*	@Nombre: x
*	@Tipo: Boolean
*	@Descripción: Indica si invertimos o no los normales
*/
function cambiaNormales(x){
	if( objetoActual instanceof Superficie){
		
		if(objetoActual.normalesInv!=x)
			objetoActual.cambiaNormal()
		
		render()				
	}
}


/*
* @Descripción: Cambaimos el coloreado de la superficie según su curvatura media o de Gauss
* @Valor devuelto: Ninguno
* @Parámetro 1:
*	@Nombre: x
*	@Tipo: String
*	@Descripción: Indica que tipo de curvatura estamos coloreando "gauss" o "media"
*/
function cambiaCurvatura(x){

	if( objetoActual instanceof SuperficieDiferenciable || objetoActual instanceof SuperficieRevolDifereciable){
		var estado=objetoActual.dibujaCurv
		
		if(estado!=x)
			objetoActual.cambiaCurvatura()
		
		render()
	}
		
}

/*
* @Descripción: Activa la textura en la malla
* @Valor devuelto: Ninguno
* @Parámetro 1:
*	@Nombre: x
*	@Tipo: Boolean
*	@Descripción: Indica si activamos o no la textura en la malla
*/
function activaTextura(x){
	
	if( objetoActual instanceof Superficie){
		if(x)
			objetoActual.malla.material.map=texture
		else
			objetoActual.malla.material.map=null;
		
		actualizaMaterial()
	}
}

/*
* @Descripción: Activa las sombras y dibuja el prima con solo las caras interiores que lo encierra y sobre el que se dibuja la sombra
* @Valor devuelto: Ninguno
* @Parámetro 1:
*	@Nombre: x
*	@Tipo: Boolean
*	@Descripción: Indica si activamos las sombras y el prisma
*/
function activaSombras(x){
	
	if(  objetoActual instanceof Superficie){
		
		prisma.scale.set(2*objetoActual.dimMayor,2*objetoActual.dimMayor,2*objetoActual.dimMayor)
		
		if(x)
			miEscena3D.add(prisma)
		else
			miEscena3D.remove(prisma)
		
		objetoActual.malla.castShadow=x
		prisma.receiveShadow=x
		dlight.castShadow=x
		renderer.shadowMap.enabled=x
		
		render()
	}
}

/*
* @Descripción: Cambia el valor del brillo de la malla
* @Valor devuelto: Ninguno
* @Parámetro 1:
*	@Nombre: x
*	@Tipo: Number
*	@Descripción: Valor de la intensidad del brillo entre 0 y 100
*/
function chambiaBrillo(x){
	if( objetoActual instanceof Superficie){
		objetoActual.malla.material.shininess=x
		actualizaMaterial()
	}
}

/*
* @Descripción: Cambia el clor del brillo de la malla
* @Valor devuelto: Ninguno
* @Parámetro 1:
*	@Nombre: x
*	@Tipo: Number
*	@Descripción: Color en hexadecimal que emitirá el brillo
*/
function cambiaColorBrillo(x){
	if( objetoActual instanceof Superficie){
		objetoActual.malla.material.specular.set(x)
		actualizaMaterial()
	}
}

/*
* @Descripción: Actualiza el material
* @Valor devuelto: Ninguno
*/
function actualizaMaterial(){
	objetoActual.malla.material.needsUpdate=true
	render()
}


function cambiaResolucionX(n){
	if( objetoActual instanceof Superficie){
		objetoActual=objetoActual.cambiaResolucion(n,objetoActual.k)
		clearScene()
		setCenter()
		miEscena3D.add( objetoActual.malla )
		objetoActual.visorNormales.update()
		scene.add(objetoActual.visorNormales)
		updateControlsGui()
	}
}

function cambiaResolucionY(k){
	if( objetoActual instanceof Superficie){
		objetoActual=objetoActual.cambiaResolucion(objetoActual.n,k)
		clearScene()
		setCenter()
		miEscena3D.add( objetoActual.malla )
		objetoActual.visorNormales.update()
		scene.add(objetoActual.visorNormales)
		updateControlsGui()
	}
}

/*
* @Descripción: Cambia la posición de la luz direccional, separandola del origen para que las sombras se proyecten bien
*				Aunque el origen de la luz es de distancia infinita la posición exacta importa para generar las sombras correctamente
* @Valor devuelto: Ninguno
*/
function actualizarPosicionLuz(){
	dlight.position.set(Math.sin(options.beta*Math.PI/180)*Math.sin(options.alpha*Math.PI/180),Math.cos(options.beta*Math.PI/180),Math.sin(options.beta*Math.PI/180)*Math.cos(options.alpha*Math.PI/180))
	if(objetoActual instanceof Superficie )
		dlight.position.multiplyScalar((1+objetoActual.dimMayor))
	render()
}

/*
* @Descripción: Dibuja el objeto alamacenado en "objetoActual" con variables de instancia "malla" y "visorNormales" desplazando el grupo en el que se añade la malla
* 				mediante el vector del centro de ésta
* @Valor devuelto: Ninguno
*/
function dibuja3D(){
	clearScene()
	posGiro=0
	setCenter()
	controls.reset()
	miEscena3D.add( objetoActual.malla )
	objetoActual.visorNormales.update()
	scene.add(objetoActual.visorNormales)
	actualizarPosicionLuz()
	updateControlsGui()
}

//Renderizamos la luz y los ejes
render();