// Created by Nico Zingarelli
"use strict";
cBeanBagGeometry = function(gl) {
  this.gl = gl;
  
  this.vertices = [0,0,0]; // Center
  var angle = 0
  for(var i=0; i<=256; i++){
      var xpos = Math.pow(Math.sin(angle), 3);
      var ypos = ((13*Math.cos(angle)) - (5*Math.cos(2*angle)) - (2*Math.cos(3*angle)) - Math.cos(4*angle))/16;
      this.vertices.push(xpos);
      this.vertices.push(ypos);
      this.vertices.push(0.5);
      angle += (2*Math.PI) / 256;
    }

  this.colors = [0,0,0]; 
  for(var i=0; i<=256; i++){
    this.colors.push(0);
    this.colors.push(0);
    this.colors.push(1);
  }

  this.triplets = []; // vertices of triangles to draw
  for(var i=1; i<=256; i++){
    this.triplets.push(i);
    this.triplets.push(i+1);
    this.triplets.push(0);
  }

  // allocate and fill vertex buffer in device memory (OpenGL name: array buffer)
  this.vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(this.vertices),
    gl.STATIC_DRAW);

  // allocate and fill vertex buffer in device memory (OpenGL name: array buffer)
  this.colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(this.colors),
    gl.STATIC_DRAW);

  // allocate and fill index buffer in device memory (OpenGL name: element array buffer)
  this.indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(this.triplets),
    gl.STATIC_DRAW);

  // create and bind input layout with input buffer bindings (OpenGL name: vertex array)
  this.inputLayout = gl.createVertexArray();
  gl.bindVertexArray(this.inputLayout);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0,
    3, gl.FLOAT, //< three pieces of float
    false, //< do not normalize (make unit length)
    0, //< tightly packed
    0 //< data starts at array start
  );

  gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1,
    3, gl.FLOAT, //< three pieces of float
    false, //< do not normalize (make unit length)
    0, //< tightly packed
    0 //< data starts at array start
  );


  gl.bindVertexArray(null);
};

BeanBagGeometry.prototype.draw = function() {
  const gl = this.gl;

  gl.bindVertexArray(this.inputLayout);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);  

  gl.drawElements(gl.TRIANGLES, 768, gl.UNSIGNED_SHORT, 0);
};
