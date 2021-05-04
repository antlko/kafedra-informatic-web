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
                console.log(response.data)
                localStorage.setItem("access_token", response.data.token)
                alert("User was logged successfully!")
                window.location.href = "/admin"
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

export const authRequest = async () => {
    return await axios({
        method: 'get',
        url: process.env.REACT_APP_API_HOST + 'auth/token',
        headers: {
            "Authorization": localStorage.getItem("access_token"),
        }
    }).then((response) => {
        return true
    }).catch((err) => {
        localStorage.setItem("access_token", "")
        if (err.response === undefined) {
            networkErrorMessage()
        } else {
            alert(err.response.data.message)
        }
        return false
    })
}

export const addLectureRequest = (addLectureForm) => {
    return async () => {
        await axios({
            method: 'post',
            url: process.env.REACT_APP_API_HOST + 'admin/lectures',
            data: addLectureForm,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
            }
        }).then((response) => {
            if (response.status === 200) {
                alert("Lecture was added successfully!")
            }
        }).catch((err) => {
            if (err.response === undefined) {
                networkErrorMessage()
            } else {
                alert("Lecture cant be added")
            }
        })
    };
}

export const getLectureRequest = () => {
    return async () => {
        return await axios({
            method: 'get',
            url: process.env.REACT_APP_API_HOST + 'lectures/findAll'
        }).then((response) => {
            return response
        }).catch((err) => {
            console.log("error getting teachers!", err)
            return err
        })
    };
}