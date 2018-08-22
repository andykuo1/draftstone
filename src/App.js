import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

import TileMap from './TileMap.js';

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.canvas = React.createRef();
    this.canvasContext = null;
  }

  componentDidMount()
  {
    this.canvasContext = this.canvas.getContext('2d');
  }

  update()
  {
    const ctx = this.canvasContext;
    if (!ctx) return;

    ctx.strokeStyle = "black";
    for(let i = 0; i < TileMap.SIZE; ++i)
    {
      for(let j = 0; j < TileMap.SIZE; ++j)
      {
        ctx.strokeRect(i * 16, j * 16, 16, 16);
        ctx.stroke();
      }
    }
  }

  render()
  {
    this.update();
    return <div className="app-container">
      <h1>DraftStone</h1>
      <canvas ref={ref=>this.canvas=ref} id="theCanvas" width="600" height="400">
      </canvas>
    </div>;
  }
}

//For hotloading this class
export default hot(module)(App);
