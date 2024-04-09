/* eslint-disable no-unused-vars */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import React from "react";

const rootElement = document.getElementById("root");
// @ts-ignore
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <h1>React Leaflet </h1>
    <App />
  </StrictMode>
);
