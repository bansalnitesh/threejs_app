
//importing three from three.js
import * as THREE from 'three';

//define a scene
let scene = new THREE.Scene();
scene.fog = new THREE.Fog( scene.background, 1, 5000 );

//define a canmera
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 4000 );

//position the camera
camera.position.set(0, 255, 250 );

//set where the camera is looking
camera.lookAt(new THREE.Vector3(0,0,0));

//make materials for every bird part
let faceMaterial1 = new THREE.MeshPhongMaterial( { color: 0x000000, shininess: 70 } );
let faceMaterial2 = new THREE.MeshPhongMaterial( { color: 0x96203b, shininess: 300 } );
let faceMaterial3 = new THREE.MeshPhongMaterial( { color: 0x58ac4e, shininess: 100 } ); 

//make a renderer;a
let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//the shapes start from here--ANGRY BIRD 

//beak
let beak = new THREE.Mesh(new THREE.ConeGeometry(10, 40, 18), faceMaterial2);
beak.position.set(0, 60, 80);
beak.rotation.x = 70 * Math.PI / 180;
beak.castShadow = true;
scene.add(beak);

//eyes
let eye1 = new THREE.Mesh(new THREE.TorusBufferGeometry(2, 1.6, 3, 30), faceMaterial1);
eye1.position.set(-11, 80, 70);
eye1.rotation.x = -90 * Math.PI / 180;
eye1.castShadow = true;
scene.add(eye1);

let eye2 = new THREE.Mesh(new THREE.TorusBufferGeometry(2, 1.6, 3, 30), faceMaterial1);
eye2.position.set(11, 80, 70);
eye2.rotation.x = -90 * Math.PI / 180;
eye2.castShadow = true;
scene.add(eye2);

//main body 
let body = new THREE.Mesh( new THREE.OctahedronGeometry( 45, 1), faceMaterial3 );
body.position.set(0, 0, 0);
body.castShadow = true;
scene.add( body );

//first wing
let wing1 = new THREE.Mesh(new THREE.ConeGeometry(11, 70, 20), faceMaterial3);
wing1.position.set(70, 0, 0);
wing1.rotation.z = -95 * Math.PI / 180;
wing1.castShadow = true;
scene.add(wing1);

//second wing
let wing2 = new THREE.Mesh(new THREE.ConeGeometry(11, 70, 20), faceMaterial3);
wing2.position.set(-70, 0, 0);
wing2.rotation.z = 95 * Math.PI / 180;
wing2.castShadow = true;
scene.add(wing2);


// Create a ground that receives shadows (but does not cast them) and sky speprated by fog

let groundGeo = new THREE.PlaneBufferGeometry(10000, 10000, 32, 32);
let groundMaterial = new THREE.MeshLambertMaterial({
    color: 0xf2e9ce,
    side: THREE.DoubleSide
    });
groundMaterial.color.setHSL(0.1, 0.3, 0.6);
let ground = new THREE.Mesh(groundGeo, groundMaterial);
ground.receiveShadow = true;
ground.rotation.x = 1;
ground.position.y = -40;
ground.position.x = -250;
scene.add(ground);


//adding a light
//https://threejs.org/docs/#api/en/lights/PointLight
let dirLight = new THREE.DirectionalLight( 0xFFFFFF, 2, 300 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( 0, 255, 255 );
dirLight.position.multiplyScalar( 30 );
scene.add( dirLight );
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
let d = 50;
dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;
dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = - 0.0001;
let	dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 );
scene.add( dirLightHeper );


//function to animate parts of body
function animate() {
	requestAnimationFrame( animate );
    renderer.render( scene, camera );
    wing1.rotation.x +=  Math.PI / 40;
    wing2.rotation.x +=  Math.PI / 40;
    eye1.rotation.x +=  Math.PI / 70;
    eye2.rotation.x +=  Math.PI / 70;
}
animate();