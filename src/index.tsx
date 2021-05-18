import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import MailApp from "./MailApp";
import "./styles/main.scss";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <MailApp />
  </StrictMode>,
  rootElement
);
