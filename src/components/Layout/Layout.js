import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default class Layout extends Component {
  render() {
    return (
      <>
        <Navbar/>
        {this.props.children}
        <Footer />
      </>
    );
  }
}
