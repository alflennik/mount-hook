require("jsdom-global")();
const React = require('react')
const ReactDOM = require("react-dom");
const Hello = require('./Hello')

const div = document.createElement("div");
document.body.appendChild(div);

ReactDOM.render(<Hello />, div);
