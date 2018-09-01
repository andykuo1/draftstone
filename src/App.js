import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

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
  }

  componentDidMount()
  {
    this.inputController.initialize(this);
    this.world.initialize(this);
  }

  componentWillUnmount()
  {
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
      <canvas id="theCanvas" ref={ref=>this.canvas=ref}
        width="300px"
        height="300px"></canvas>
      <div className="viewport">
        <h1>DraftStone</h1>
      </div>
    </div>;
  }
}

//For hotloading this class
export default hot(module)(App);
