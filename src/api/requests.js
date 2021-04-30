import axios from "axios";
import {networkErrorMessage} from "./helpers";

export const loginRequest = (loginForm) => {
    return async () => {
        await axios({
            method: 'post',
            url: process.env.REACT_APP_API_HOST + 'auth',
            data: loginForm
        }).then((response) => {
            if (response.status === 200) {
                console.log(response)
                localStorage.setItem("access_token", response.data.access_token)
                alert("User was logged successfully!")
                window.location.href = "/"
            }
        }).catch((err) => {
            if (err.response === undefined) {
                networkErrorMessage()
            } else {
                alert("User can't be logged")
            }
        })
    };
}