import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'router.js';
import Config from 'config.js';
import { loadConfig, saveConfig } from 'config.js';

import NotFoundPage from 'pages/NotFoundPage.js';
import App from 'pages/App.js';

//Register page with router
Router.registerPage("/404", NotFoundPage);
Router.registerPage("/", App);

//Setup viewport
window.addEventListener('load', (event) => {
  loadConfig();
  loadApplication();
  window.requestAnimationFrame(updateApplication);
});

window.addEventListener('beforeunload', (event) => {
  saveConfig();
});

//Setup application
const FRAMES_PER_SECOND = 60;
let prevtime = 0;
let root = null;

//Load application
function loadApplication()
{
  //Get the root element
  root = document.getElementById("root");
}

//Update application
function updateApplication(time)
{
  const dt = (time - prevtime) / FRAMES_PER_SECOND;
  {
    const page = Router.getPage();
    ReactDOM.render(React.createElement(page), root);
  }
  prevtime = time;
  window.requestAnimationFrame(updateApplication);
}
