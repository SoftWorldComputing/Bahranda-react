import React, { Component } from "react";
import { createPortal } from "react-dom";
const modalRoot = document.querySelector("#modal");

export default class Portal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.modalDiv = document.createElement("div");
    this.modalDiv.classList.add("modal-wrapper");
  }

  componentDidMount() {
    modalRoot.appendChild(this.modalDiv);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.modalDiv);
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return createPortal(<Component {...rest} />, this.modalDiv);
  }
}
