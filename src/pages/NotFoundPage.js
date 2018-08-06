import React from 'react';
import Router from 'router.js';

class NotFoundPage extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return <div>
      Error 404. Page Not Found.
      <button onClick={()=>Router.routeTo("/")}>Return Home</button>
    </div>;
  }
}

export default NotFoundPage;
