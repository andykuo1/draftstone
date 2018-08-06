import React from 'react';
import Config from 'config.js';

import Renderer from 'renderer/Renderer.js';

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.canvas = React.createRef();
    this.gl = null;

    this.renderer = new Renderer();
  }

  componentDidMount()
  {
    this.gl = this.canvas.getContext("webgl");

    this.renderer.initialize(this.gl);
  }

  componentWillUnmount()
  {
    this.renderer.terminate(this.gl);
  }

  render()
  {
    if (this.gl)
    {
      this.renderer.render(this.gl);
    }

    return <div className="app-container">
      <canvas id="glCanvas" ref={ref=>this.canvas=ref}
        width="640" height="480">
      </canvas>
    </div>;
  }
}

export default App;
