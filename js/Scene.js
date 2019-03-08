"use strict";
const Scene = function(gl) {
  this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "solid_fs.essl");
  this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);
  
  this.triangleGeometry = new TriangleGeometry(gl);
  this.quadGeometry = new QuadGeometry(gl);
  this.circleGeometry = new CircleGeometry(gl);
  // this.trianglePosition = {x:-0.3, y:0, z:0}
  // this.trianglePosition2 = {x:0.3, y:0, z:0}

  this.timeAtLastFrame = new Date().getTime();

  this.yellowMaterial = new Material(gl, this.solidProgram);
  this.yellowMaterial.solidColor.set(1,1,0);

  this.cyanMaterial = new Material(gl, this.solidProgram);
  this.cyanMaterial.solidColor.set(0,1,1);

  this.yellowTriangle = new Mesh(this.triangleGeometry, this.yellowMaterial);
  this.cyanTriangle = new Mesh(this.triangleGeometry, this.cyanMaterial);
  this.yellowQuad = new Mesh(this.quadGeometry, this.yellowMaterial);
  this.cyanCircle = new Mesh(this.circleGeometry, this.cyanMaterial);

  this.gameObjects = [];
  
  this.obj1 = new GameObject(this.yellowTriangle);
  this.obj1.position.set({x:-0.3, y:0, z:0});

  this.obj2 = new GameObject(this.cyanTriangle);
  this.obj2.position.set({x:0.3, y:0, z:0});

  this.obj3 = new GameObject(this.yellowQuad);
  this.obj3.position.set({x:0.3, y:0.3, z:0})

  this.obj4 = new GameObject(this.cyanCircle);
  this.obj4.position.set({x:0.3, y:-0.3, z:0})

  //this.gameObjects.push(this.obj1);
  //this.gameObjects.push(this.obj2);
  this.gameObjects.push(this.obj3);
  this.gameObjects.push(this.obj4);

  this.camera = new OrthoCamera();
};

Scene.prototype.update = function(gl, keysPressed) {
  //jshint bitwise:false
  //jshint unused:false
  const timeAtThisFrame = new Date().getTime();
  const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;

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


