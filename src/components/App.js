import React from "react";
import css from "../css/main.css"
import Header from "./Header"
export default class App extends React.Component {
  render() {
    var w = window,
       d = document,
       documentElement = d.documentElement,
       body = d.getElementsByTagName('body')[0],
       width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
       height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;
    var h = (height-60) + "px";
    return (
      <div className="container-fluid" style={{ height: h }}>
      <Header/>
        {this.props.children}
      </div>
    );
  }
}
