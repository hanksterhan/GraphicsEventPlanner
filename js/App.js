"use strict";
// App constructor
const App = function(canvas, overlay) {
  this.canvas = canvas;
  this.overlay = overlay;
  this.keysPressed = {};
  this.mousePressed = {};

  // obtain WebGL context
  this.gl = canvas.getContext("webgl2");
  if (this.gl === null) {
    throw new Error("Browser does not support WebGL2");
  }


  // serves as a registry for textures or models being loaded
  this.gl.pendingResources = {};
  // create a simple scene
  this.scene = new Scene(this.gl);
  
  this.resize();
};

// match WebGL rendering resolution and viewport to the canvas size
App.prototype.resize = function() {
  this.canvas.width = this.canvas.clientWidth;
  this.canvas.height = this.canvas.clientHeight;
  this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

  this.scene.camera.setAspectRatio(
    this.canvas.clientWidth / this.canvas.clientHeight
  );
};

App.prototype.registerEventHandlers = function() {
  document.onkeydown = (event) => {
    if(keyboardMap[event.keyCode] === "W"){
      this.keysPressed.W = 1;
    }
    if(keyboardMap[event.keyCode] === "A"){
      this.keysPressed.A = 1;
    }
    if(keyboardMap[event.keyCode] === "S"){
      this.keysPressed.S = 1;
    }
    if(keyboardMap[event.keyCode] === "D"){
      this.keysPressed.D = 1;
    }
    if(keyboardMap[event.keyCode] === "BACK_QUOTE"){
      this.keysPressed["BACK_QUOTE"] = 1;
    }
    if(keyboardMap[event.keyCode] === "P"){
      this.keysPressed.P = 1;
    }
    if(keyboardMap[event.keyCode] === "T"){
      this.keysPressed.T = 1;
    }
    if(keyboardMap[event.keyCode] === "C"){
      this.keysPressed.C = 1;
    }
    if(keyboardMap[event.keyCode] === "H"){
      this.keysPressed.H = 1;
    }
    if(keyboardMap[event.keyCode] === "R"){
      this.keysPressed.R = 1;
    }
    if(keyboardMap[event.keyCode] === "E"){
      this.keysPressed.E = 1;
    }
    if(keyboardMap[event.keyCode] === "DELETE"){
      this.keysPressed["DELETE"] = 1;
    }
  };
  document.onkeyup = (event) => {
    if(keyboardMap[event.keyCode] === "W"){
      this.keysPressed.W = 0;
    }
    if(keyboardMap[event.keyCode] === "A"){
      this.keysPressed.A = 0;
    }
    if(keyboardMap[event.keyCode] === "S"){
      this.keysPressed.S = 0;
    }
    if(keyboardMap[event.keyCode] === "D"){
      this.keysPressed.D = 0;
    }
    if(keyboardMap[event.keyCode] === "BACK_QUOTE"){
      this.keysPressed["BACK_QUOTE"] = 0;
    }
    if(keyboardMap[event.keyCode] === "P"){
      this.keysPressed.P = 0;
    }
    if(keyboardMap[event.keyCode] === "T"){
      this.keysPressed.T = 0;
    }
    if(keyboardMap[event.keyCode] === "C"){
      this.keysPressed.C = 0;
    }
    if(keyboardMap[event.keyCode] === "H"){
      this.keysPressed.H = 0;
    }
    if(keyboardMap[event.keyCode] === "R"){
      this.keysPressed.R = 0;
    }
    if(keyboardMap[event.keyCode] === "E"){
      this.keysPressed.E = 0;
    }
    if(keyboardMap[event.keyCode] === "DELETE"){
      this.keysPressed["DELETE"] = 0;
    }
    console.log(event.keyCode);
  };
  this.canvas.onmousedown = (event) => {
    // TODO: Aspect ratio is tweaking everything
    // calculate and scale the mouse clicks so that they are where the computer thinks they are
    this.mousePressed.Down = 1;
    this.originX = this.canvas.width / 2;
    this.originY = this.canvas.height / 2;
    this.windowX = this.canvas.width / 176.5;
    this.windowY = this.canvas.height / 176.5;
    this.mousePressed.X =  this.windowX * ((event.x - this.originX) / this.canvas.width); // need to tweak this
    this.mousePressed.Y = -1 * this.windowY * ((event.y - this.originY) / this.canvas.height); // need to tweak this
    //jshint unused:false
  };
  this.canvas.onmousemove = (event) => {
    //jshint unused:false
    event.stopPropagation();
  };
  this.canvas.onmouseout = (event) => {
    //jshint unused:false
  };
  this.canvas.onmouseup = (event) => {
    //jshint unused:false
    this.mousePressed.Down = 0;
  };
  window.addEventListener('resize', () => this.resize() );
  window.requestAnimationFrame( () => this.update() );
};

// animation frame update
App.prototype.update = function() {

  const pendingResourceNames = Object.keys(this.gl.pendingResources);
  if (pendingResourceNames.length === 0) {
    // animate and draw scene
    this.scene.update(this.gl, this.keysPressed, this.mousePressed);
    this.overlay.innerHTML = "Esketit.";
  } else {
    this.overlay.innerHTML = "Loading: " + pendingResourceNames;
  }

  // refresh
  window.requestAnimationFrame( () => this.update() );
};

// entry point from HTML
window.addEventListener('load', function() {
  const canvas = document.getElementById("canvas");
  const overlay = document.getElementById("overlay");
  overlay.innerHTML = "WebGL";

  const app = new App(canvas, overlay);
  app.registerEventHandlers();
});