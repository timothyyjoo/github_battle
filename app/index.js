var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var App = require('./components/App');
import "./index.css";

//component has state
//component can also have lifecycle methods(or events)
//example: run this component when events happen
//component also needs UI
//component may not have state or lifecycle, but will always have UI



ReactDOM.render(
  <App />,
  document.getElementById('app')
)
