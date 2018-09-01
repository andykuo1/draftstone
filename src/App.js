import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

class App extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return <div className="app-container">
      <h1>DraftStone</h1>
    </div>;
  }
}

//For hotloading this class
export default hot(module)(App);
