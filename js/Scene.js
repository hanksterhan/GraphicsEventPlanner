"use strict";
const Scene = function(gl) {
  this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "solid_fs.essl");
  this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);
  
  this.vsTextured = new Shader(gl, gl.VERTEX_SHADER, "textured_vs.essl");
  this.fsTextured = new Shader(gl, gl.FRAGMENT_SHADER, "textured_fs.essl");
  this.texturedProgram = new Program(gl, this.vsTextured, this.fsTextured);

  this.texturedMaterial = new Material(gl, this.texturedProgram);
  // this.texturedMaterial.colorTexture.set(new Texture2D(gl, "media/asteroid.png"));

  this.texturedQuad = new TexturedQuadGeometry(gl);
  this.asteroidMesh = new Mesh(this.texturedQuad, this.texturedMaterial);
  this.asteroid = new GameObject(this.asteroidMesh);

  this.vsStriped = new Shader(gl, gl.VERTEX_SHADER, "striped_vs.essl");
  this.fsStriped = new Shader(gl, gl.FRAGMENT_SHADER, "striped_fs.essl");
  this.stripedProgram = new Program(gl, this.vsStriped, this.fsStriped);

  this.vsCheckered = new Shader(gl, gl.VERTEX_SHADER, "checkered_vs.essl");
  this.fsCheckered = new Shader(gl, gl.FRAGMENT_SHADER, "checkered_fs.essl");
  this.checkeredProgram = new Program(gl, this.vsCheckered, this.fsCheckered);

  this.vsBullseye = new Shader(gl, gl.VERTEX_SHADER, "bullseye_vs.essl");
  this.fsBullseye = new Shader(gl, gl.FRAGMENT_SHADER, "bullseye_fs.essl");
  this.bullseyeProgram = new Program(gl, this.vsBullseye, this.fsBullseye);
  
  this.fsBlink = new Shader(gl, gl.FRAGMENT_SHADER, "blinking_fs.essl");
  this.blinkProgram = new Program(gl, this.vsIdle, this.fsBlink);

  this.vsWave = new Shader(gl, gl.VERTEX_SHADER, "waving_vs.essl");
  this.waveProgram = new Program(gl, this.vsWave, this.fsSolid);

  this.fsHeartbeat = new Shader(gl, gl.FRAGMENT_SHADER, "heartbeat_fs.essl");
  this.heartbeatProgram = new Program(gl, this.vsIdle, this.fsHeartbeat);


  this.triangleGeometry = new TriangleGeometry(gl);
  this.quadGeometry = new QuadGeometry(gl);
  this.circleGeometry = new CircleGeometry(gl);
  this.chairGeometry = new ChairGeometry(gl);
  this.coatRackGeometry = new CoatRackGeometry(gl);
  this.plantGeometry = new PlantGeometry(gl);
  this.lampGeometry = new LampGeometry(gl);
  // this.beanBagGeometry = new BeanBagGeometry(gl);
  
  this.timeAtLastFrame = new Date().getTime();

  this.wavingMaterial = new Material(gl, this.waveProgram);
  this.wavingMaterial.solidColor.set(1,0,1);
  this.wavingMatrix = new Mat4();
  this.wavingMaterial.translationMatrix.set(this.wavingMatrix);
  this.wavingTriangle = new Mesh(this.triangleGeometry, this.wavingMaterial);

  this.blinkingMaterial = new Material(gl, this.blinkProgram);
  this.blinkingMaterial.solidColor.set(1,0,1);
  this.blinkingMaterial.solidColor2.set(0,1,1);
  this.blinkingTriangle = new Mesh(this.triangleGeometry, this.blinkingMaterial);

  this.heartbeatMaterial = new Material(gl, this.heartbeatProgram);
  this.heartbeatMaterial.solidColor.set(0.960, 0, 0.164);
  this.heartbeatMaterial.solidColor2.set(0.572, 0, 0.960);
  this.heartbeatTriangle = new Mesh(this.triangleGeometry, this.heartbeatMaterial);
  this.initialTime = new Date().getTime();
  
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

  this.yellowCheckeredMaterial = new Material(gl, this.checkeredProgram);
  this.yellowCheckeredMaterial.boxColor1.set(0.2,1,0,1);
  this.yellowCheckeredMaterial.boxColor2.set(0.8,0.38,0.3,1);
  this.yellowCheckeredMaterial.boxWidth.set(0.3);
  this.yellowCheckeredCircle = new Mesh(this.circleGeometry, this.yellowCheckeredMaterial);

  this.pinkBullseyeMaterial = new Material(gl, this.bullseyeProgram);
  this.pinkBullseyeMaterial.stripeColor1.set(0.043, 0.925, 0.976,1);
  this.pinkBullseyeMaterial.stripeColor2.set(0.976, 0.043, 0.862, 1);
  this.pinkBullseyeMaterial.stripeWidth.set(0.05);
  this.pinkBullseyeTriangle = new Mesh(this.triangleGeometry, this.pinkBullseyeMaterial);

  this.yellowBullseyeMaterial = new Material(gl, this.bullseyeProgram);
  this.yellowBullseyeMaterial.stripeColor1.set(.9,0,.1,1);
  this.yellowBullseyeMaterial.stripeColor2.set(0.9,1,0.3,1);
  this.yellowBullseyeMaterial.stripeWidth.set(0.01);
  this.yellowBullseyeCircle = new Mesh(this.circleGeometry, this.yellowBullseyeMaterial);

  this.yellowMaterial = new Material(gl, this.solidProgram);
  this.yellowMaterial.solidColor.set(1,1,0);

  this.cyanMaterial = new Material(gl, this.solidProgram);
  this.cyanMaterial.solidColor.set(0,1,1);

  this.yellowTriangle = new Mesh(this.triangleGeometry, this.yellowMaterial);
  this.cyanTriangle = new Mesh(this.triangleGeometry, this.cyanMaterial);
  this.yellowQuad = new Mesh(this.quadGeometry, this.yellowMaterial);
  this.cyanTable = new Mesh(this.circleGeometry, this.cyanMaterial);
  this.cyanChair = new Mesh(this.chairGeometry, this.cyanMaterial);
  this.yellowChair = new Mesh(this.chairGeometry, this.yellowMaterial);
  this.cyanCoatRack= new Mesh(this.coatRackGeometry, this.cyanMaterial);
  this.cyanPlant = new Mesh(this.plantGeometry, this.cyanMaterial);
  this.cyanLamp = new Mesh(this.plantGeometry, this.cyanMaterial);
  this.yellowLamp = new Mesh(this.lampGeometry, this.yellowMaterial);
  // this.cyanBeanBag = new Mesh(this.beanBagGeometry, this.cyanMaterial);

  this.selected = []; // contains indices of the objects that are selected

  this.gameObjects = [];

  // this.asteroid.position.set({x:0.3, y:0, z:0});
  // this.gameObjects.push(this.asteroid);

  
  this.obj2 = new GameObject(this.cyanTriangle);
  this.obj2.position.set({x:0.3, y:0, z:0});

  // this.obj3 = new GameObject(this.yellowQuad);
  // this.obj3.position.set({x:0.3, y:0.3, z:0});

  this.obj4 = new GameObject(this.cyanTable);
  this.obj4.position.set({x:2, y:0, z:0});

  this.chair = new GameObject(this.yellowChair);
  this.chair.position.set({x:-0.3, y:-0.3, z:0});

  this.stripes = new GameObject(this.pinkStripedTriangle);
  this.stripes.position.set({x:0, y:0, z:0});

  this.stripes2 = new GameObject(this.yellowStripedCircle);
  this.stripes2.position.set({x:0, y:0, z:0});

  this.bullseye = new GameObject(this.pinkBullseyeTriangle);
  this.bullseye.position.set({x:1, y:0, z:0});

  this.bullseye2 = new GameObject(this.yellowBullseyeCircle);
  this.bullseye2.position.set({x:-1, y:0, z:0});

  this.coatRack = new GameObject(this.cyanCoatRack);
  this.coatRack.position.set({x:-2, y:0, z:0});

  this.wave = new GameObject(this.wavingTriangle);
  this.wave.position.set({x:0, y:0, z:0});

  this.blink = new GameObject(this.blinkingTriangle);
  this.blink.position.set({x:0, y:0, z:0});

  this.heartbeat = new GameObject(this.heartbeatTriangle);
  this.heartbeat.position.set({x:-.5, y:-.5, z:0});

  this.plant = new GameObject(this.cyanPlant);
  this.plant.position.set({x:0, y:0, z:0});

  this.lamp = new GameObject(this.yellowLamp);
  this.lamp.position.set({x:0, y:0, z:0});
  
  this.checker = new GameObject(this.yellowCheckeredCircle);

  this.gameObjects.push(this.checker);

  // this.gameObjects.push(this.wave);
  this.gameObjects.push(this.obj2);
  // this.gameObjects.push(this.obj3);
 this.gameObjects.push(this.obj4);
  // this.gameObjects.push(this.chair);
  this.gameObjects.push(this.coatRack);
  // this.gameObjects.push(this.stripes);
  // this.gameObjects.push(this.stripes2);
  // this.gameObjects.push(this.blink);
  // this.gameObjects.push(this.lamp);
  // this.gameObjects.push(this.bullseye);
  // this.gameObjects.push(this.bullseye2);
  // this.gameObjects.push(this.heartbeat);


  this.camera = new OrthoCamera();

//DROP DOWN GEORGE BENZ
  document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || target.innerText;  
    console.log(text);
}, false);
};

Scene.prototype.update = function(gl, keysPressed, mousePressed) {
  //jshint bitwise:false
  //jshint unused:false
  const timeAtThisFrame = new Date().getTime();
  const wavet = ((timeAtThisFrame / 1000.0)%3);
  const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;

  if (wavet > 1.5){
    this.wavingMaterial.translationMatrix.set(this.wavingMaterial.translationMatrix.translate(new Vec3(0.005, 0, 0)));
  } else{
    this.wavingMaterial.translationMatrix.set(this.wavingMaterial.translationMatrix.translate(new Vec3(-0.005, 0, 0)));
  }

  var timeNow = new Date().getTime();
  var timeDiff = timeNow - this.initialTime;
  var sin = Math.sin(timeDiff);

  this.blinkingMaterial.sinVal.set(sin);
  this.heartbeatMaterial.timeDiff.set(timeDiff);

  // Press TAB to change selected object
  if(keysPressed["BACK_QUOTE"]){
    if(this.selected.length == 1){
      var nextIndex = (this.selected.pop() + 1) % this.gameObjects.length;
      this.selected.push(nextIndex);
    } else{
      this.selected = [0];
    }
  }

  // Press DELETE to delete selected objects
  if(keysPressed["DELETE"]){
    for(var i=this.selected.length-1; i>=0; i--){
      this.gameObjects.splice(this.selected[i], 1);
    }
    this.selected = [];
  }

  //MOVE OBJECTS GEORGE BENZ
  if(keysPressed["LEFT"]){
    for(var i=this.selected.length-1; i>=0; i--){
      this.gameObjects[this.selected[i]].position.x -= 0.01;
    }
  }
  if(keysPressed["RIGHT"]){
    for(var i=this.selected.length-1; i>=0; i--){
      this.gameObjects[this.selected[i]].position.x += 0.01;
    }
  }
  if(keysPressed["UP"]){
    for(var i=this.selected.length-1; i>=0; i--){
      this.gameObjects[this.selected[i]].position.y += 0.01;
    }
  }
  if(keysPressed["DOWN"]){
    for(var i=this.selected.length-1; i>=0; i--){
      this.gameObjects[this.selected[i]].position.y -= 0.01;
    }
  }

  // If mouse clicked and p is pressed, draw a plant where the mouse is clicked:
  if(mousePressed.Down && keysPressed.P){
    this.plant2 = new GameObject(this.cyanPlant);
    this.plant2.position.set({x:mousePressed.X*this.camera.windowSize.storage[0], y:mousePressed.Y*this.camera.windowSize.storage[1], z:0});
    this.gameObjects.push(this.plant2);
  }
  // If mouse clicked and t is pressed, draw a table where the mouse is clicked:
  if(mousePressed.Down && keysPressed.T){
    this.table2 = new GameObject(this.cyanTable);
    this.table2.position.set({x:mousePressed.X*this.camera.windowSize.storage[0], y:mousePressed.Y*this.camera.windowSize.storage[1], z:0});
    this.gameObjects.push(this.table2);
  }
  // If mouse clicked and c is pressed, draw a chair where the mouse is clicked:
  if(mousePressed.Down && keysPressed.C){
    this.chair2 = new GameObject(this.cyanChair);
    this.chair2.position.set({x:mousePressed.X*this.camera.windowSize.storage[0], y:mousePressed.Y*this.camera.windowSize.storage[1], z:0});
    this.gameObjects.push(this.chair2);
  }
  // If mouse clicked and h is pressed, draw a bean bag where the mouse is clicked:
  // if(mousePressed.Down && keysPressed.H){
  //   this.beanBag2 = new GameObject(this.cyanBeanBag);
  //   this.beanBag2.position.set({x:mousePressed.X*this.camera.windowSize.storage[0], y:mousePressed.Y*this.camera.windowSize.storage[1], z:0});
  //   this.gameObjects.push(this.beanBag2);

  if(mousePressed.Down){
    for(var z = 0; z < this.gameObjects.length; z++){
      if(mousePressed.X*this.camera.windowSize.storage[0] <= this.gameObjects[z].position.x + .15 && mousePressed.X*this.camera.windowSize.storage[0] >= this.gameObjects[z].position.x - .15){
        if(mousePressed.Y*this.camera.windowSize.storage[1] <= this.gameObjects[z].position.y + .15 && mousePressed.Y*this.camera.windowSize.storage[1] >= this.gameObjects[z].position.y - .15){
          console.log("before: ", this.selected.length)
          this.selected.push(this.gameObjects[z]);
          console.log("after: ", this.selected.length)
        }
      }
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
  // If mouse clicked and r is pressed, draw a coat rack where the mouse is clicked:
  if(mousePressed.Down && keysPressed.R){
    this.coatRack2 = new GameObject(this.cyanCoatRack);
    this.coatRack2.position.set({x:mousePressed.X*this.camera.windowSize.storage[0], y:mousePressed.Y*this.camera.windowSize.storage[1], z:0});
    this.gameObjects.push(this.coatRack2);
  }
  // If mouse clicked and r is pressed, draw a coat rack where the mouse is clicked:
  if(mousePressed.Down && keysPressed.E){
    this.lamp2 = new GameObject(this.cyanLamp);
    this.lamp2.position.set({x:mousePressed.X*this.camera.windowSize.storage[0], y:mousePressed.Y*this.camera.windowSize.storage[1], z:0});
    this.gameObjects.push(this.lamp2);
  }

  // Press IJKL to move the camera around
  if(keysPressed.I){
    this.camera.position.y += 0.05;
  }
  if(keysPressed.J){
    this.camera.position.x -= 0.05;
  }
  if(keysPressed.K){
    this.camera.position.y -= 0.05;
  }
  if(keysPressed.L){
    this.camera.position.x += 0.05;
  }
  if(keysPressed.A){
    console.log(this.selected)
    for(var i=0; i<this.selected.length; i++){
      this.gameObjects[this.selected[i]].orientation += 0.1;
    }
  }
  if(keysPressed.D){
    console.log(this.selected)
    for(var i=0; i<this.selected.length; i++){
      this.gameObjects[this.selected[i]].orientation -= 0.1;
    }
  }

  // Zooming in and out GEORGE BENZ
  if(keysPressed.Z){
    this.camera.windowSize.y -= 0.05;
    this.camera.windowSize.x -= 0.05;
  }
  if(keysPressed.X){
    this.camera.windowSize.y += 0.05;
    this.camera.windowSize.x += 0.05;
  }

  



  // mouse drag selected objects if mouse is down and moving
  if(mousePressed.Down && mousePressed.Move){
    var ratio = this.camera.windowSize.storage[0] / this.camera.windowSize.storage[1];
    var dx = (mousePressed.dx * this.camera.windowSize.storage[0]) / (ratio);
    var dy = (mousePressed.dy * this.camera.windowSize.storage[1]);
    for(var i=0; i<this.selected.length; i++){
      this.gameObjects[this.selected[i]].position.x += dx;
      this.gameObjects[this.selected[i]].position.y += dy;
    }
  }


  // mouse rotate selected objects if mouse is down and moving
  if(!mousePressed.Down && mousePressed.Move){
    // get coordinates and scale
    var ratio = this.camera.windowSize.storage[0] / this.camera.windowSize.storage[1];
    var x_0 = (mousePressed.X * this.camera.windowSize.storage[0] / ratio);
    var y_0 = (mousePressed.Y * this.camera.windowSize.storage[1]);
    var x_1 = (mousePressed.finalX * this.camera.windowSize.storage[0]); 
    var y_1 = (mousePressed.finalY * this.camera.windowSize.storage[1]);
    // loop over selected objects and calculate the angle of rotation based on the first highlighted object
    for(var i=0; i<this.selected.length; i++){
      var angle_0 = Math.atan(Math.abs(this.gameObjects[this.selected[0]].position.y - y_0), Math.abs(this.gameObjects[this.selected[0]].position.x - x_0));
      var angle_1 = Math.atan(Math.abs(this.gameObjects[this.selected[0]].position.y - y_1), Math.abs(this.gameObjects[this.selected[0]].position.x - x_1));
      this.gameObjects[this.selected[i]].orientation = angle_1 - angle_0;
    }
  }

  // clear the screen
  gl.clearColor(0.2, 0.3, 0.4, 1);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  this.camera.updateViewProjMatrix();

  // draw all objects
  for (var i=0; i<this.gameObjects.length; i++){
    this.gameObjects[i].draw(this.camera);
  }
  //DUPLICATE GEORGE BENZ
  if(keysPressed["SPACE"]){
    for (var i =0; i <this.selected.length; i++){
      this.temp = new GameObject(this.gameObjects[this.selected[i]].mesh);
      this.temp.position.x += 0.5;
      this.temp.position.y -= 0.3;
      this.gameObjects.push(this.temp);
    }
  }

  // draw selected objects
  var j = 0
  while(this.selected.length != 0 && j < this.selected.length){
    this.gameObjects[this.selected[j]].drawSelected(this.camera, this.yellowMaterial);
    j+=1;
  }

};

//CODE WAS TAKEN FROM https://www.w3schools.com/howto/howto_js_dropdown.asp

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}





