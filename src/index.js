import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Model from "./model"



/*------------------------------
Renderer
------------------------------*/
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,

});
renderer.setClearColor(0x000031, .5);
renderer.setSize(window.innerWidth * 2, window.innerHeight * 2);
document.body.appendChild(renderer.domElement);


/*------------------------------
Scene & Camera
------------------------------*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  4000
);
let initialPos = 4
camera.position.z = 30;
camera.position.y = initialPos;
camera.position.x = 40;
camera.rotation.set(0, 1, 0);

// camera.position.z = 0;
// camera.position.y = 1;
// camera.position.x = 10;

// camera.position.set(0, 10, 200);


camera.fov = 50
camera.lookAt(0, -window.scrollY / window.innerHeight * 15, 0)







/*------------------------------
Mesh
------------------------------*/
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true
});
const cube = new THREE.Mesh(geometry, material);

cube.position.x = -20
cube.position.y = 1
cube.position.z = 15
cube.rotation.y = 1

// gridPlane.rotation.x = - Math.PI / 2.4;
// gridPlane.rotation.z = -Math.PI / 1.12;
// scene.add(cube);

const block = new THREE.BoxGeometry(2, 4, 2);
const edges = new THREE.EdgesGeometry(block);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
line.position.x = 15
line.position.y = 4 / 2
line.position.z = 13
// scene.add(line);

// var planeGeom = new THREE.PlaneBufferGeometry(10, 5, 10, 5).toGrid();
Object.assign(THREE.PlaneBufferGeometry.prototype, {
  toGrid: function () {
    let segmentsX = this.parameters.widthSegments || 1;
    let segmentsY = this.parameters.heightSegments || 1;
    let indices = [];
    for (let i = 0; i < segmentsY + 1; i++) {
      let index11 = 0;
      let index12 = 0;
      for (let j = 0; j < segmentsX; j++) {
        index11 = (segmentsX + 1) * i + j;
        index12 = index11 + 1;
        let index21 = index11;
        let index22 = index11 + (segmentsX + 1);
        indices.push(index11, index12);
        if (index22 < ((segmentsX + 1) * (segmentsY + 1) - 1)) {
          indices.push(index21, index22);
        }
      }
      if ((index12 + segmentsX + 1) <= ((segmentsX + 1) * (segmentsY + 1) - 1)) {
        indices.push(index12, index12 + segmentsX + 1);
      }
    }
    this.setIndex(indices);
    return this;
  }
});


const planesGeo = new THREE.PlaneBufferGeometry(350, 350, 80, 80).toGrid()

const materials = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
  transparent: true
});
const gridPlane = new THREE.LineSegments(planesGeo, new THREE.LineBasicMaterial({ color: "#ffff", transparent: true, opacity: 0.08, linewidth: 0.2 }));

// const planes = new THREE.Mesh(planesGeo, gridPlane);
// planes.position.y = - 250;
gridPlane.rotation.x = - Math.PI / 2;
// gridPlane.rotation.y = .1
console.log(gridPlane.position.y);
//gridPlane.rotation.z = -Math.PI / 1.12;


scene.add(gridPlane);


document.querySelector('.btn').addEventListener('click', () => {
  camera.lookAt(-40, -window.scrollY / window.innerHeight * 15, 10)
  // camera.fov = 15
  camera.updateProjectionMatrix()
})

window.addEventListener('scroll', () => {
  // gridPlane.position.y  -window.scrollY / window.innerHeight * .1
  // Math.min(Math.abs(this.currentScroll - scrollValue), 30) / 30
  camera.position.y = initialPos + (-window.scrollY / window.innerHeight * 25);

  camera.lookAt(0, -window.scrollY / window.innerHeight * 30 * 4, 0)
  // gridPlane.position.y = 0 + window.scrollY / window.innerHeight * 50
  // camera.fov = 50 * window.scrollY / window.innerHeight
  // camera.fov = 50 + window.scrollY / window.innerHeight * 10

  camera.updateProjectionMatrix()
})


/*------------------------------
OrbitControls
------------------------------*/
//const controls = new OrbitControls(camera, renderer.domElement);


/*------------------------------
Helpers
------------------------------*/
const gridHelper = new THREE.GridHelper(10, 10);
//scene.add(gridHelper);
const axesHelper = new THREE.AxesHelper(5);
//scene.add(axesHelper);

/*------------------------------
Model
------------------------------*/

// const skull = new Model({
//   name: 'skull',
//   file: './materials/skull.glb',
//   scene
// })

// const horse = new Model({
//   name: 'horse',
//   file: './materials/horse.glb',
//   scene
// })

// const building = new Model({
//   name: 'building',
//   file: './materials/building.glb',
//   scene,
//   pos: {
//     x: 15, y: 1.9, z: 13
//   }
// })

const building1 = new Model({
  name: 'building1',
  file: './materials/building1.glb',
  scene,
  pos: {
    x: 34, y: 0, z: 13
  },
  scale: 1.1
})

const building2 = new Model({
  name: 'building2',
  file: './materials/building2.glb',
  scene,
  pos: {
    x: 28, y: 0, z: 13
  },
  scale: 1.1
})

const building3 = new Model({
  name: 'building3',
  file: './materials/building3.glb',
  scene,
  pos: {
    x: -150, y: 0, z: -90
  },
  scale: 1.1,
  opacity: 0.05
})

const building4 = new Model({
  name: 'building4',
  file: './materials/building4.glb',
  scene,
  pos: {
    x: -150, y: 0, z: -90
  },
  scale: 1.1,
  opacity: .05
})

const building5 = new Model({
  name: 'building5',
  file: './materials/building5.glb',
  scene,
  pos: {
    x: -140, y: 0, z: -100
  },
  scale: 1.1,
  opacity: .05
})



// const building3 = new Model({
//   name: 'building2',
//   file: './materials/building.glb',
//   scene,
//   pos: {
//     x: 10, y: 1.9, z: 8
//   }
// })


/*------------------------------
Loop
------------------------------*/
const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();


/*------------------------------
Resize
------------------------------*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);