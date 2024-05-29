import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import textureImage0 from "/assets/lust_real.png";

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xff0000); // Black color

// Create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

// Create renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("three"),
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Load textures

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Set font properties
ctx.font = "30px Arial";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

// Text to display
var text = "ANGELINA HOFFMAN";

// Measure text width and height
var textWidth = ctx.measureText(text).width;
var textHeight = parseInt(ctx.font); // Assuming font size is in pixels

// Calculate position to center the text
var x = canvas.width / 2;
var y = canvas.height / 2;

// Draw the text
ctx.fillText(text, x, y);
const texture = new THREE.Texture(canvas);
texture.needsUpdate = true

const light = new THREE.HemisphereLight( 0xffffff, 0x888888, 1 );
scene.add( light );
const pl = new THREE.PointLight( 0xff0000, 1, 100 );
pl.position.set( 5, 2, 0 );
scene.add( pl );

//bump map
const bumpMap = new THREE.TextureLoader().load('/assets/paper.png');
const material = new THREE.MeshPhongMaterial({ color: 'white', map: texture, side: THREE.DoubleSide, bumpMap: bumpMap, bumpScale: 0.002 });
const geometry = new THREE.PlaneGeometry(3, 2);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
