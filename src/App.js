import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

import Toolbar from 'components/Toolbar.js';

import InputController from 'InputController.js';
import World from 'World.js';

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    //React references
    this.canvas = null;

    this.inputController = new InputController();

    this.world = new World();

    this.onWindowResize = this.onWindowResize.bind(this);
  }

  onWindowResize(e)
  {
    this.canvas.setAttribute("width", this.canvas.offsetWidth);//window.innerWidth);
    this.canvas.setAttribute("height", this.canvas.offsetHeight);//window.innerHeight);
  }

  componentDidMount()
  {
    window.addEventListener("resize", this.onWindowResize);
    this.onWindowResize(null);

    this.inputController.initialize(this);
    this.world.initialize(this);
  }

  componentWillUnmount()
  {
    window.removeEventListener("resize", this.onWindowResize);

    this.world.destroy();
    this.inputController.destroy();
  }

  componentDidUpdate()
  {
    this.world.update();
  }

  render()
  {
    return <div className="app-container">
      <Toolbar>
        <button>New</button>
        <button>Load</button>
        <button>Save</button>
        <button onClick={
          (e) => {
            this.world.tileMode = this.world.tileMode == "add" ? "subtract" : "add";
          }
        }>Add/Subtract</button>
      </Toolbar>
      <div className="viewport">
        <h1>DraftStone</h1>

        <canvas id="theCanvas" ref={ref=>this.canvas=ref}></canvas>
      </div>
    </div>;
  }
}

//For hotloading this class
export default hot(module)(App);
