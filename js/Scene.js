"use strict";
const Scene = function(gl) {
  this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "solid_fs.essl");
  this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);
  
  this.vsTextured = new Shader(gl, gl.VERTEX_SHADER, "textured_vs.essl");
  this.fsTextured = new Shader(gl, gl.FRAGMENT_SHADER, "textured_fs.essl");
  this.texturedProgram = new Program(gl, this.vsTextured, this.fsTextured);

  this.texturedMaterial = new Material(gl, this.texturedProgram);
  this.texturedMaterial.colorTexture.set(new Texture2D(gl, "media/asteroid.png"));

  this.texturedQuad = new TexturedQuadGeometry(gl);
  this.asteroidMesh = new Mesh(this.texturedQuad, this.texturedMaterial);
  this.asteroid = new GameObject(this.asteroidMesh);

  this.vsStriped = new Shader(gl, gl.VERTEX_SHADER, "striped_vs.essl");
  this.fsStriped = new Shader(gl, gl.FRAGMENT_SHADER, "striped_fs.essl");
  this.stripedProgram = new Program(gl, this.vsStriped, this.fsStriped);
  
  this.fsBlink = new Shader(gl, gl.FRAGMENT_SHADER, "blinking_fs.essl");
  this.blinkProgram = new Program(gl, this.vsIdle, this.fsBlink);

  this.triangleGeometry = new TriangleGeometry(gl);
  this.quadGeometry = new QuadGeometry(gl);
  this.circleGeometry = new CircleGeometry(gl);
  this.chairGeometry = new ChairGeometry(gl);
  this.coatRackGeometry = new CoatRackGeometry(gl);
  this.plantGeometry = new PlantGeometry(gl);
  this.lampGeometry = new LampGeometry(gl);
  
  this.timeAtLastFrame = new Date().getTime();

  this.blinkingMaterial = new Material(gl, this.blinkProgram);
  this.blinkingMaterial.solidColor.set(1,0,1);
  this.blinkingMaterial.solidColor2.set(0,1,1);
  this.blinkingMaterial.timeAtLastFrame.set(this.timeAtLastFrame);
  this.blinkingMaterial.dt.set(this.timeAtLastFrame);
  this.blinkingMaterial.blinkSpeed.set(10);
  this.blinkingTriangle = new Mesh(this.triangleGeometry, this.blinkingMaterial);
  
  this.pinkStripedMaterial = new Material(gl, this.stripedProgram);
  this.pinkStripedMaterial.stripeColor1.set(1,0,1,1);
  this.pinkStripedMaterial.stripeColor2.set(0.4,0.8,0.3,1);
  this.pinkStripedMaterial.stripeWidth.set(0.5);
  this.pinkStripedTriangle = new Mesh(this.triangleGeometry, this.pinkStripedMaterial);

  this.yellowStripedMaterial = new Material(gl, this.stripedProgram);
  this.yellowStripedMaterial.stripeColor1.set(1,1,0,1);
  this.yellowStripedMaterial.stripeColor2.set(0.8,0.8,0.3,1);
  this.yellowStripedMaterial.stripeWidth.set(0.8);
  this.yellowStripedCircle = new Mesh(this.circleGeometry, this.yellowStripedMaterial);

  this.yellowMaterial = new Material(gl, this.solidProgram);
  this.yellowMaterial.solidColor.set(0,0.5,0.8);

  this.cyanMaterial = new Material(gl, this.solidProgram);
  this.cyanMaterial.solidColor.set(0,1,1);

  this.yellowTriangle = new Mesh(this.triangleGeometry, this.yellowMaterial);
  this.cyanTriangle = new Mesh(this.triangleGeometry, this.cyanMaterial);
  this.yellowQuad = new Mesh(this.quadGeometry, this.yellowMaterial);
  this.cyanCircle = new Mesh(this.circleGeometry, this.cyanMaterial);
  this.yellowChair = new Mesh(this.chairGeometry, this.yellowMaterial);
  this.cyanCoatRack= new Mesh(this.coatRackGeometry, this.cyanMaterial);
  this.cyanPlant = new Mesh(this.plantGeometry, this.cyanMaterial);
  this.yellowLamp = new Mesh(this.lampGeometry, this.yellowMaterial);

  this.gameObjects = [];

  this.asteroid.position.set({x:0.3, y:0, z:0});
  this.gameObjects.push(this.asteroid);

  
  this.obj1 = new GameObject(this.yellowTriangle);
  this.obj1.position.set({x:-0.3, y:0, z:0});

  this.obj2 = new GameObject(this.cyanTriangle);
  this.obj2.position.set({x:0.3, y:0, z:0});

  this.obj3 = new GameObject(this.yellowQuad);
  this.obj3.position.set({x:0.3, y:0.3, z:0});

  this.obj4 = new GameObject(this.cyanCircle);
  this.obj4.position.set({x:0.3, y:-0.3, z:0});

  this.chair = new GameObject(this.yellowChair);
  this.chair.position.set({x:-0.3, y:-0.3, z:0});

  this.stripes = new GameObject(this.pinkStripedTriangle);
  this.stripes.position.set({x:0, y:0, z:0});

  this.stripes2 = new GameObject(this.yellowStripedCircle);
  this.stripes2.position.set({x:0, y:0, z:0});

  this.coatRack = new GameObject(this.cyanCoatRack);
  this.coatRack.position.set({x:0, y:0, z:0});

  this.blink = new GameObject(this.blinkingTriangle);
  this.blink.position.set({x:0, y:0, z:0});

  this.plant = new GameObject(this.cyanPlant);
  this.plant.position.set({x:0, y:0, z:0});

  this.lamp = new GameObject(this.yellowLamp);
  this.lamp.position.set({x:0, y:0, z:0});
  //this.gameObjects.push(this.obj1);
  //this.gameObjects.push(this.obj2);
  // this.gameObjects.push(this.obj3);
  // this.gameObjects.push(this.obj4);
  // this.gameObjects.push(this.chair);
  // this.gameObjects.push(this.coatRack);
  // this.gameObjects.push(this.stripes);
  // this.gameObjects.push(this.stripes2);
  // this.gameObjects.push(this.blink);
  // this.gameObjects.push(this.lamp);

  this.camera = new OrthoCamera();

};

Scene.prototype.update = function(gl, keysPressed) {
  //jshint bitwise:false
  //jshint unused:false
  const timeAtThisFrame = new Date().getTime();
  const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;
  const dtLocation = gl.getUniformLocation(this.blinkProgram.glProgram, "dt");
  if (dtLocation == null) {
    console.log("Could not find uniform dt.");
  } else {
    gl.uniform1f(dtLocation, timeAtThisFrame);
  }
  
  if (((timeAtThisFrame - this.blinkingMaterial.timeAtLastFrame) / 1000.0) < this.blinkingMaterial.blinkSpeed){
    const timeAtLastFrameLocation = gl.getUniformLocation(this.blinkProgram.glProgram, "timeAtLastFrame");
    if (timeAtLastFrameLocation == null) {
      console.log("Could not find uniform timeAtLastFrame.");
    } else {
      gl.uniform1f(timeAtLastFrameLocation, timeAtThisFrame);
    }
  }

  // TODO: if we want movement, make a move method inside gameobjects and pass in keyspressed into gameobject
  // TODO: if we want unique movement
  // how to move the triangles from frame to frame
  // if(keysPressed.W){
  //   this.gameObjects[0].position.y += 0.01;
  //   this.trianglePosition2.y -= 0.01;
  // }
  // if(keysPressed.A){
  //   this.trianglePosition.x -= 0.01;
  //   this.trianglePosition2.x += 0.01;
  // }
  // if(keysPressed.S){
  //   this.trianglePosition.y -= 0.01;
  //   this.trianglePosition2.y += 0.01;
  // }
  // if(keysPressed.D){
  //   this.trianglePosition.x += 0.01;
  //   this.trianglePosition2.x -= 0.01;
  // }

  // clear the screen
  gl.clearColor(0.2, 0.3, 0.9, 1);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  // const modelMatrixUniformLocation = gl.getUniformLocation(
  //   this.solidProgram.glProram, "modelMatrix");
  // if (modelMatrixUniformLocation == null) {
  //   console.log("Could not find uniform modelMatrix.");
  // } else {
  //   const modelMatrix = new Mat4().translate(this.trianglePosition);
  //   modelMatrix.commit(gl, modelMatrixUniformLocation);
  // }

  const materialMatrix = new Mat4().translate(this.trianglePosition);
  const materialMatrix2 = new Mat4().translate(this.trianglePosition2);

  // To set up a Material object and draw them
  // this.cyanMaterial.modelMatrix.set(materialMatrix);
  // this.cyanMaterial.commit();
  // this.triangleGeometry.draw()

  // this.yellowMaterial.modelMatrix.set(materialMatrix2);
  // this.yellowMaterial.commit();
  // this.triangleGeometry.draw();

  // To set up a Mesh object and draw them
  // this.yellowTriangle.material.modelMatrix.set(materialMatrix);
  // this.yellowTriangle.draw();

  // this.cyanTriangle.material.modelMatrix.set(materialMatrix2);
  // this.cyanTriangle.draw();
  
  // this.camera.position.set(this.gameObjects[0].position);
  // this.camera.updateViewProjMatrix();




  for (var i=0; i<this.gameObjects.length; i++){
    this.gameObjects[i].draw(this.camera);
  }

};


