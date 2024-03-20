/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";

import "@/scss/bootstrap.scss";
// Import all of Bootstrap's JS
import "@/helper/bootstrap.js";

import App from "./App";

const root = document.getElementById("root");


render(() => (
  <Router>
    <App />
  </Router>
), root);

