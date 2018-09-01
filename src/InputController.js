class InputController
{
  constructor()
  {
    this.canvas = null;

    this.pointer = {
      x: 0,
      y: 0,
      down: false
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  initialize(app)
  {
    this.canvas = app.canvas;

    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
  }

  destroy()
  {
    document.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);

    this.canvas = null;
  }

  getPointer()
  {
    return this.pointer;
  }

  onMouseDown(e)
  {
    this.pointer.down = true;
  }

  onMouseUp(e)
  {
    this.pointer.down = false;
  }

  onMouseMove(e)
  {
    let rect = this.canvas.getBoundingClientRect();

    this.pointer.x = e.clientX - rect.left;
    this.pointer.y = e.clientY - rect.top;
  }
}

export default InputController;
