import React from "react";
import { hydrate, render } from "react-dom";
import App from './App';


const root = document.getElementById("root")
var renderMethod
if (root && root.innerHTML !== "") {
  renderMethod = hydrate
} else {
  renderMethod = render
}
renderMethod(<App />, document.getElementById("root"))
//ReactDOM.hydrate(<App />, document.getElementById('root'));