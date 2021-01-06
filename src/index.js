
function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 30;
  const aspect = 2;
  const near = 0.1;
  const far = 2000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 120);

  const scene = new THREE.Scene();
  renderer.setClearColor(0x87ceeb);

  // adding light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(30, 30, 50);
  scene.add(light);

  const loader = new THREE.TextureLoader();

  const groundGeomtry = new THREE.PlaneBufferGeometry(2000, 2000, 42);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00a318
    // map: loader.load("grass.jpg")
  });
  const ground = new THREE.Mesh(groundGeomtry, material);
  ground.rotateX(-Math.PI / 2);
  ground.position.set(0, -10, 0);
  scene.add(ground);

  const sunGeometry = new THREE.SphereBufferGeometry(4, 24, 24);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xebcc34 });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.position.set(50, 20, -20);
  sun.rotation.set(20, 20, 0);
  scene.add(sun);

  const trees = new THREE.Object3D();
  trees.position.set(-10, 0, 0);
  const tree1 = new THREE.Object3D();
  tree1.position.set(-25, 10, 20);
  const tree2 = new THREE.Object3D();
  tree2.position.set(-20, 10, 0);
  const tree3 = new THREE.Object3D();
  tree3.position.set(-50, 10, -10);
  trees.add(tree1);
  trees.add(tree2);
  trees.add(tree3);
  scene.add(trees);
  //trees.push(tree1);

  const treeGeometry = new THREE.ConeBufferGeometry(8, 12);
  const treeMaterial = new THREE.MeshPhongMaterial({ color: 0x097805 });
  const treeMesh1 = new THREE.Mesh(treeGeometry, treeMaterial);
  const treeMesh2 = new THREE.Mesh(treeGeometry, treeMaterial);
  const treeMesh3 = new THREE.Mesh(treeGeometry, treeMaterial);
  tree1.add(treeMesh1);
  tree2.add(treeMesh2);
  tree3.add(treeMesh3);

  const branchGeometry = new THREE.CylinderBufferGeometry(2, 2, 10);
  const branchMaterial = new THREE.MeshPhongMaterial({ color: 0x783d05 });
  const branchMesh1 = new THREE.Mesh(branchGeometry, branchMaterial);
  branchMesh1.position.set(0, -10, 0);
  const branchMesh2 = new THREE.Mesh(branchGeometry, branchMaterial);
  branchMesh2.position.set(0, -10, 0);
  const branchMesh3 = new THREE.Mesh(branchGeometry, branchMaterial);
  branchMesh3.position.set(0, -10, 0);
  tree1.add(branchMesh1);
  tree2.add(branchMesh2);
  tree3.add(branchMesh3);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(50,20,10);
  scene.add(pointLight);

  //road
  const house = new THREE.Object3D();
  const roofGeometry = new THREE.ConeBufferGeometry(10,12,200);
  const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x3262a8 });
  const roofMesh = new THREE.Mesh(roofGeometry, roofMaterial);
  const roomGeomtry = new THREE.CylinderBufferGeometry(8,8,10);
  const roomMaterial = new THREE.MeshPhongMaterial({color: 0xff0000});
  const roomMesh = new THREE.Mesh(roomGeomtry, roomMaterial);
  roomMesh.position.set(0, -10,0);
  house.add(roofMesh);
  house.add(roomMesh);
  house.position.set(30,10,0)
  scene.add(house);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  const controls = new THREE.OrbitControls( camera, renderer.domElement );

  function render(time) {
    //time *= 0.001;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  controls.update();

  renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();