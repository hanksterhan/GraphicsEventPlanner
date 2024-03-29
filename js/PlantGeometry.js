"use strict";
//CREATED BY GEORGE BENZ
const PlantGeometry = function(gl) {
  this.gl = gl;

  this.vertices = [0, 0, 0.5];

 for (var i = 0; i < 6; i++){
    this.vertices.push(Math.sin((Math.PI/4)*i));
    this.vertices.push(Math.cos((Math.PI/4)*i));
    this.vertices.push(0.5);
  };

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
    new Float32Array([
       0.9, 2, 0.0,
       0.1, 0.1, 0.1,
       0.1, 0.1, 0.1,
       0.1, 0.1, 0.1,
       0.1, 0.1, 0.1,
       0.1, 0.1, 0.1,
       0.1, 0.1, 0.1,
      ]),
    gl.STATIC_DRAW);

  // allocate and fill index buffer in device memory (OpenGL name: element array buffer)
  this.indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([
      0, 2, 5,
      0, 1 ,4,
      0, 3 ,6,
    ]),
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

PlantGeometry.prototype.draw = function() {
  const gl = this.gl;

  gl.bindVertexArray(this.inputLayout);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);  

  gl.drawElements(gl.TRIANGLES, 9, gl.UNSIGNED_SHORT, 0);
};
