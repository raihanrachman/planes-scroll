import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import * as THREE from 'three'


export default class model {
    constructor({ name, file, pos, scene, scale = 1.1, opacity = .2 }) {
        this.name = name
        this.file = file
        this.scene = scene
        this.pos = pos
        this.scale = scale
        this.opacity = opacity
        this.loader = new GLTFLoader()
        this.dracoLoader = new DRACOLoader()
        this.dracoLoader.setDecoderPath("./draco/")
        this.loader.setDRACOLoader(this.dracoLoader)


        this.init()
    }

    init() {
        this.loader.load(this.file, res => {

            /**
             * original mesh
             */
            this.mesh = res.scene.children[0].children[0]
            // debugger


            this.material = new THREE.MeshBasicMaterial({
                // wireframe: true,
                transparent: true,
                opacity: this.opacity

            })
            // const edges = new THREE.EdgesGeometry(this.mesh.geometry);

            // this.material = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
            this.mesh.position.y = this.pos.y
            this.mesh.position.x = this.pos.x

            this.mesh.position.z = this.pos.z
            this.mesh.material = this.material
            this.mesh.scale.set(this.scale, this.scale, this.scale)
            this.scene.add(this.mesh)


            /**
             * geometry mesh
             */

            // this.geometry = this.mesh.geometry
            /**
             * particles material
             */

            // this.particlesMaterial = new THREE.PointsMaterial({
            //     color: "red",
            //     size: 0.1
            // })

            /**
             * particles
             */

            // this.particles = new THREE.Points(this.geometry, this.particlesMaterial)
            // this.particles.position.y = this.pos.y
            // this.particles.position.x = this.pos.x

            // this.particles.position.z = this.pos.z
            // this.particles.scale.set(.02, .02, .02)
            // this.scene.add(this.particles)

        })
    }
}