var camera, scene, renderer, mesh, material, stats;
init();
animate();

function init() {
    // Renderer.
    renderer = new THREE.WebGLRenderer( { alpha: true } );
    //renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(500, 500);
    // Add renderer to page
    document.getElementById("b3").appendChild(renderer.domElement);

    // Create camera.
    camera = new THREE.PerspectiveCamera(70, 1, 1, 1000);
    camera.position.z = 400;

    // Create scene.
    scene = new THREE.Scene();

    // Create material
    material = new THREE.MeshPhongMaterial();

    // Create cube and add to scene.
    var geometry = new THREE.BoxGeometry(200, 200, 200);
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Create ambient light and add to scene.
    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    // Create directional light and add to scene.
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Add listener for window resize.
 //   window.addEventListener('resize', onWindowResize, false);


}

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}
