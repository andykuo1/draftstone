import Shader from 'mogli/Shader.js';
import BufferObject from 'mogli/BufferObject.js';
import { mat4 } from 'gl-matrix';

const vsh = `
attribute vec4 a_position;

uniform mat4 u_modelview;
uniform mat4 u_projection;

void main() {
  gl_Position = u_projection * u_modelview * a_position;
}
`;
const fsh = `
void main() {
  gl_FragColor = vec4(1.0,1.0,1.0,1.0);
}
`;
const square = [
  -1,  1,
   1,  1,
  -1, -1,
   1, -1
];

class Renderer
{
  constructor()
  {
    this.shader = null;
    this.bufferObject = null;
  }

  initialize(gl)
  {
    if (gl === null)
    {
      alert("Unable to initialize WebGL. Your browser may not support it.");
      return;
    }

    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const shader = new Shader(gl, vsh, fsh);
    this.shader = shader;

    const squareData = new Float32Array(square);
    this.buffer = new BufferObject(gl);
    this.buffer.bind(gl.ARRAY_BUFFER);
    this.buffer.putData(squareData, gl.STATIC_DRAW);
    this.buffer.unbind();
  }

  terminate(gl)
  {
    this.shader.delete();
  }

  render(gl)
  {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 45 * Math.PI / 180;
    const aspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, fieldOfView, aspectRatio, zNear, zFar);

    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -6]);

    {
      const numComponents = 2;  // pull out 2 values per iteration
      const type = gl.FLOAT;    // the data in the buffer is 32bit floats
      const normalize = false;  // don't normalize
      const stride = 0;         // how many bytes to get from one set of values to the next
                                // 0 = use type and numComponents above
      const offset = 0;         // how many bytes inside the buffer to start from
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.handle);
      gl.vertexAttribPointer(this.shader.attributes.a_position,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(this.shader.attributes.a_position);
    }

    // Tell WebGL to use our program when drawing
    gl.useProgram(this.shader.handle);

    // Set the shader uniforms

    gl.uniformMatrix4fv(
        this.shader.uniforms.u_projection,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        this.shader.uniforms.u_modelview,
        false,
        modelViewMatrix);

    {
      const offset = 0;
      const vertexCount = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  }
}

export default Renderer;
