"use strict";
// App constructor
const App = function(canvas, overlay) {
  this.canvas = canvas;
  this.overlay = overlay;
  this.keysPressed = {}

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
  };
  this.canvas.onmousedown = (event) => {
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
  };
  window.addEventListener('resize', () => this.resize() );
  window.requestAnimationFrame( () => this.update() );
};

// animation frame update
App.prototype.update = function() {

  const pendingResourceNames = Object.keys(this.gl.pendingResources);
  if (pendingResourceNames.length === 0) {
    // animate and draw scene
    this.scene.update(this.gl, this.keysPressed);
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