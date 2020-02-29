'use strict';
import "@babel/polyfill";
import './popup.scss';
import React from "react";
import ReactDOM from "react-dom";

import App from './components/App.js';


(function() {
  ReactDOM.render(
    <App></App>,
    document.getElementById("root")
  );
  
})();
