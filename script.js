// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Set up the scene, camera, and renderer as global variables.
    var scene, camera, renderer, model;
  
    init();
    animate();
  
    function init() {
      // Set up the scene
      scene = new THREE.Scene();
  
      // Set up the camera
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
  
      // Set up the renderer
      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
  
      // Load the GLTF model
      var loader = new THREE.GLTFLoader();
      loader.load('./models/Taxi.gltf', function (gltf) {
        model = gltf.scene;
        model.scale.set(0.4, 0.4, 0.4); // Adjust scale if necessary
        scene.add(model);
      }, undefined, function (error) {
        console.error(error);
      });
  
      // Add ambient light
      var ambientLight = new THREE.AmbientLight(0xffffff, 3);
      scene.add(ambientLight);
  
      // Handle window resize
      window.addEventListener('resize', onWindowResize, false);
  
      // Scroll event listener
      window.addEventListener('scroll', onScroll, false);
    }
  
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  
    function onScroll() {
      var scrollY = window.scrollY;
      var rotationSpeed = 0.001;
      if (model) {
        model.rotation.x = scrollY * rotationSpeed;
        model.rotation.y = scrollY * rotationSpeed;
      }
    }
  
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
  });
  