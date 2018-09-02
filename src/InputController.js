class InputController
{
  constructor()
  {
    this.canvas = null;

    this.pointer = {
      x: 0,
      y: 0,
      down: false,
      _mouseup: false,
      _mousemove: false
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  initialize(app)
  {
    this.canvas = app.canvas;

    this.canvas.addEventListener('mousedown', this.onMouseDown);
  }

  destroy()
  {
    this.canvas.removeEventListener('mousedown', this.onMouseDown);

    //Make sure it does not exist
    if (this.pointer._mouseup)
    {
      document.removeEventListener('mouseup', this.onMouseUp);
      this.pointer_mouseup = false;
    }
    if (this.pointer._mousemove)
    {
      document.removeEventListener('mousemove', this.onMouseMove);
      this.pointer._mousemove = false;
    }

    this.canvas = null;
  }

  getPointer()
  {
    return this.pointer;
  }

  onMouseDown(e)
  {
    this.pointer.down = true;

    let rect = this.canvas.getBoundingClientRect();
    this.pointer.x = e.clientX - rect.left;
    this.pointer.y = e.clientY - rect.top;

    //Make sure it does not exist
    if (this.pointer._mouseup)
    {
      document.removeEventListener('mouseup', this.onMouseUp);
      this.pointer._mouseup = false;
    }
    if (this.pointer._mousemove)
    {
      document.removeEventListener('mousemove', this.onMouseMove);
      this.pointer._mousemove = false;
    }

    this.pointer._mouseup = true;
    document.addEventListener('mouseup', this.onMouseUp);
    this.pointer._mousemove = true;
    document.addEventListener('mousemove', this.onMouseMove);
  }

  onMouseUp(e)
  {
    this.pointer.down = false;

    if (this.pointer._mouseup)
    {
      document.removeEventListener('mouseup', this.onMouseUp);
      this.pointer._mouseup = false;
    }
    if (this.pointer._mousemove)
    {
      document.removeEventListener('mousemove', this.onMouseMove);
      this.pointer._mousemove = false;
    }
  }

  onMouseMove(e)
  {
    let rect = this.canvas.getBoundingClientRect();

    this.pointer.x = e.clientX - rect.left;
    this.pointer.y = e.clientY - rect.top;
  }
}

export default InputController;
