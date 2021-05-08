import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {Route} from "react-router-dom";
import "./App.css"
import "./assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import App from "./App";
import toastr from "toastr"

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById("root")
);

toastr.options = {
    toastClass: 'alert',
    iconClasses: {
        error: 'alert-error',
        info: 'alert-info',
        success: 'alert-success',
        warning: 'alert-warning'
    },
};