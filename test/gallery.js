// Import Three.js and OrbitControls
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.128/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;
const infoOverlay = document.getElementById('infoOverlay');

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('gallery').appendChild(renderer.domElement);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Gallery Walls
    createGalleryWalls();

    // Artwork
    loadArtworks();

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    animate();
}

function createGalleryWalls() {
    const wallGeometry = new THREE.BoxGeometry(10, 5, 0.1);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    
    // Front Wall
    const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
    frontWall.position.z = -5;
    scene.add(frontWall);
}

function loadArtworks() {
    // Example artwork URLs from Unsplash
    const artworkUrls = [
        'https://plus.unsplash.com/premium_photo-1709311452427-fff3030eabbf?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1725656471105-c681d15d5834?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1698345926521-99e283a48f9b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1725647093138-e1ef909ca53c?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1725256772360-cf203e3cf897?q=80&w=3086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1725664300743-e446bfecb1e0?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ];
    
    artworkUrls.forEach((url, index) => {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(url, (texture) => {
            const artworkGeometry = new THREE.PlaneGeometry(2, 3);
            const artworkMaterial = new THREE.MeshBasicMaterial({ map: texture });
            const artworkMesh = new THREE.Mesh(artworkGeometry, artworkMaterial);
            artworkMesh.position.set(index * 3 - 3, 0, -5);
            scene.add(artworkMesh);
            
            artworkMesh.userData = { title: `Artwork ${index + 1}` }; // Adding title for the overlay

            // Adding click detection
            artworkMesh.on('click', () => {
                infoOverlay.innerHTML = artworkMesh.userData.title;
                infoOverlay.style.display = 'block';
            });
        });
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();
