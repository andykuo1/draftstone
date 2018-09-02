import React from 'react';
import './Toolbar.css';

class Toolbar extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return <div className="toolbar-container">
      {this.props.children}
    </div>;
  }
}

export default Toolbar;
