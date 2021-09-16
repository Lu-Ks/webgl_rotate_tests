import './style.css'
import * as THREE from 'three'

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(.05, 1, 1)
const materialWhite = new THREE.MeshBasicMaterial({ color: 'white' })
const loader = new THREE.TextureLoader();
const logo = new THREE.MeshBasicMaterial({ map: loader.load('https://pbs.twimg.com/profile_images/1041734037054939136/2IkABxs2_400x400.jpg') });
const hugo = new THREE.MeshBasicMaterial({ map: loader.load('https://pbs.twimg.com/profile_images/1397207416702480385/9UJbPoYT_400x400.jpg') });
const mesh = new THREE.Mesh(geometry, [
    logo,
    hugo,
    materialWhite,
    materialWhite,
    materialWhite,
    materialWhite,
])
scene.add(mesh)

const sizes = {
    width: 800,
    height: 600
}

const clock = new THREE.Clock()

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const tick = () => {
    renderer.render(scene, camera)
    renderer.setClearColor('#F5F5F5')
    const elapsedTime = clock.getElapsedTime()
    mesh.rotation.y += +(Math.sin(elapsedTime * Math.PI) + 1) / 3
    window.requestAnimationFrame(tick)
}

tick()