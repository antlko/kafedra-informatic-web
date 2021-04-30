import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {Route} from "react-router-dom";

import "./assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById("root")
);