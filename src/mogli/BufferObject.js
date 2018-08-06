const NULLTYPE = 0;

class BufferObject
{
  constructor(gl)
  {
    const handle = gl.createBuffer();

    this._gl = gl;
    this._handle = handle;

    this.__type = NULLTYPE;
  }

  delete() {
    if (this.__type != NULLTYPE)
    {
      console.log("WARNING: Trying to delete bound buffer");
      this.unbind();
    }

    gl.deleteBuffer(this._handle);
    this._handle = 0;
  }

  get handle() { return this._handle; }

  bind(type)
  {
    this._gl.bindBuffer(type, this._handle);
    this.__type = type;
  }

  unbind(forceUpdate=false)
  {
    if (this.__type === NULLTYPE) throw new Error("Cannot unbind already not bound buffer object");

    //Only required if the next possible action WILL change the active buffer type
    if (forceUpdate)
    {
      this._gl.bindBuffer(this.__type, NULLTYPE);
    }

    this.__type = NULLTYPE;
  }

  putData(data, drawMode)
  {
    if (this.__type === NULLTYPE) throw new Error("Must bind this buffer first before making changes");

    if (data instanceof Float32Array)
    {
      this._gl.bufferData(this.__type, data, drawMode);
    }
    else
    {
      throw new Error("Unsupported buffer data type");
    }
  }
}

export default BufferObject;
