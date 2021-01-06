
function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 30;
  const aspect = 2;
  const near = 0.1;
  const far = 2000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 20, 150);

  const scene = new THREE.Scene();
  renderer.setClearColor(0x87ceeb);

  // adding light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(30, 30, 50);
  scene.add(light);

  const loader = new THREE.TextureLoader();

  const groundGeomtry = new THREE.PlaneBufferGeometry(2000, 2000, 42);
  const material = new THREE.MeshBasicMaterial({
    map: loader.load("src/grass.jpg", function ( texture ) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.repeat.set( 80, 80 );
  })
});
  const ground = new THREE.Mesh(groundGeomtry, material);
  ground.rotateX(-Math.PI / 2);
  ground.position.set(0, -10, 0);
  scene.add(ground);

  const sunGeometry = new THREE.SphereBufferGeometry(4, 24, 24);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xebcc34 });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.position.set(50, 30, -20);
  sun.rotation.set(20, 20, 0);
  scene.add(sun);

  const trees = new THREE.Object3D();
  const treesSet1 = new THREE.Object3D();
  treesSet1.position.set(-20, 0, 0);

  const treesSet2 = new THREE.Object3D();
  treesSet2.position.set(80, 0, -80);
  function makeTree(posx, posy, posz){
    const treeGeometry = new THREE.ConeBufferGeometry(8, 12);
    const treeMaterial = new THREE.MeshPhongMaterial({ color: 0x295939 });
    const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial);
    const branchGeometry = new THREE.CylinderBufferGeometry(2, 2, 10);
    const branchMaterial = new THREE.MeshPhongMaterial({ color: 0x783d05 });
    const branchMesh = new THREE.Mesh(branchGeometry, branchMaterial);
    branchMesh.position.set(0, -10, 0);
    const tree = new THREE.Object3D();
    tree.position.set(posx, posy, posz);
    tree.add(treeMesh);
    tree.add(branchMesh);
    return tree;
  }
  
  const tree1 = makeTree(-25,10,20);
  const tree2 = makeTree(-20,10,0);
  const tree3 = makeTree(-45, 10, -10);
  const tree4 = makeTree(-15, 10, -40);
  const tree5 = makeTree(-25,10,20);
  const tree6 = makeTree(-20,10,0);
  const tree7 = makeTree(-45, 10, -10);
  const tree8 = makeTree(-15, 10, -40);
  treesSet1.add(tree1);
  treesSet1.add(tree2);
  treesSet1.add(tree3);
  treesSet1.add(tree4);
  treesSet2.add(tree5);
  treesSet2.add(tree6);
  treesSet2.add(tree7);
  treesSet2.add(tree8);
  trees.add(treesSet1);
  trees.add(treesSet2);
  scene.add(trees);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(50,20,10);
  scene.add(pointLight);

  //road
  const housesSet1 = new THREE.Object3D();
  housesSet1.position.set(20,0,0);

  const housesSet2 = new THREE.Object3D();
  housesSet2.position.set(-80, -0, -150);

  function makeHouse(posx, posy, posz, roofColor, roomColor){
    const roofGeometry = new THREE.ConeBufferGeometry(10,12,20);
    const roofMaterial = new THREE.MeshPhongMaterial({ color:  roofColor});
    const roofMesh = new THREE.Mesh(roofGeometry, roofMaterial);
    const roomGeomtry = new THREE.CylinderBufferGeometry(8,8,10);
    const roomMaterial = new THREE.MeshPhongMaterial({color: roomColor});
    const roomMesh = new THREE.Mesh(roomGeomtry, roomMaterial);
    const doorGeometry = new THREE.PlaneBufferGeometry(5,8,20);
    const door = new THREE.Mesh(doorGeometry, roofMaterial);
    door.position.set(0,-10,8.5);
    roomMesh.position.set(0, -10,0);
    const house = new THREE.Object3D();
    house.add(roofMesh);
    house.add(roomMesh);
    house.add(door);
    house.position.set(posx,posy,posz);
    return house;
  }
  const house1 = makeHouse(30,10,0, 0x3262a8, 0xff0000);
  const house2 = makeHouse(20, 10, -20, 0xdb6400, 0xf05454);
  const house3 = makeHouse(50, 10, -30, 0xff577f, 0x111d5e);
  const house4 = makeHouse(10,10,0, 0x03C6C7, 0xE8BD0D);
  const house5 = makeHouse(-20,10,0, 0xBF3325, 0x5A20CB);
  const house6 = makeHouse(-10,10,-50, 0x6A1B4D, 0x3DBE29);
  housesSet1.add(house1);
  housesSet1.add(house2);
  housesSet1.add(house3);
  housesSet2.add(house4);
  housesSet2.add(house5);
  housesSet2.add(house6);
  scene.add(housesSet1);
  scene.add(housesSet2);

  // road
  const roadGeometry = new THREE.BoxBufferGeometry(30, 1, 1100);
  const roadMaterial = new THREE.MeshBasicMaterial({
    map: loader.load("src/roads.jpg", function ( texture ) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.repeat.set(100, 100 );
  })
});
  const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
  roadMesh.position.set(0, 400, 0);
  roadMesh.rotateX(-Math.PI / 2);
  ground.add(roadMesh);

  // 

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
    // time *= 0.0001;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  controls.update();
  // houses.position.x += time;
  renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();