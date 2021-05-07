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
        return await axios({
            method: 'post',
            url: process.env.REACT_APP_API_HOST + 'admin/teacher',
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
            url: process.env.REACT_APP_API_HOST + 'teachers'
        }).then((response) => {
            return response
        }).catch((err) => {
            console.log("error getting teachers!", err)
            return err
        })
    };
}

export const deleteTeacherRequest = (teacherID) => {
    return async () => {
        await axios({
            method: 'delete',
            url: process.env.REACT_APP_API_HOST + 'admin/teacher/delete?id=' + teacherID,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
            }
        }).then((response) => {
            if (response.status === 200) {
                alert("Lecture was removed successfully!")
            }
        }).catch((err) => {
            if (err.response === undefined) {
                networkErrorMessage()
            } else {
                alert("Lecture cant be removed")
            }
        })
    };
}

export const getTeacherRequest = (teacherID) => {
    return async () => {
        return await axios({
            method: 'get',
            url: process.env.REACT_APP_API_HOST + 'teacher?id=' + teacherID
        }).then((response) => {
            if (response.status === 200) {
                return response
            }
        }).catch((err) => {
            console.log("error getting teacher ", err)
            return err
        })
    };
}

export const getHeadersRequest = () => {
    return async () => {
        return await axios({
            method: 'get',
            url: process.env.REACT_APP_API_HOST + 'header'
        }).then((response) => {
            if (response.status === 200) {
                return response
            }
        }).catch((err) => {
            console.log("error getting header ", err)
            return err
        })
    };
}

export const saveHeaderRequest = (headerArray) => {
    return async () => {
        const jsonRequest = {
            data: headerArray
        }
        return await axios({
            method: 'post',
            url: process.env.REACT_APP_API_HOST + 'admin/header',
            data: JSON.stringify(jsonRequest),
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
            }
        }).then((response) => {
            if (response.status === 200) {
                alert("Header was added successfully!")
            }
        }).catch((err) => {
            if (err.response === undefined) {
                networkErrorMessage()
            } else {
                console.log(err)
                alert("Header cant be added")
            }
        })
    };
}

export const saveCustomPageRequest = (dataForm) => {
    return async () => {
        return await axios({
            method: 'post',
            url: process.env.REACT_APP_API_HOST + 'admin/custompage',
            data: dataForm,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
            }
        }).then((response) => {
            if (response.status === 200) {
                alert("Custom page was added successfully!")
            }
        }).catch((err) => {
            if (err.response === undefined) {
                networkErrorMessage()
            } else {
                console.log(err)
                alert("Header cant be added")
            }
        })
    };
}

export const getCustomPageByURLRequest = (urlField) => {
    return async () => {
        return await axios({
            method: 'get',
            url: process.env.REACT_APP_API_HOST + 'custompage?url=' + encodeURIComponent(urlField)
        }).then((response) => {
            if (response.status === 200) {
                return response
            }
        }).catch((err) => {
            console.log("error getting page ", err)
            return err
        })
    };
}

export const getAllCustomPagesDataRequest = () => {
    return async () => {
        return await axios({
            method: 'get',
            url: process.env.REACT_APP_API_HOST + 'admin/custompages',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
            }
        }).then((response) => {
            if (response.status === 200) {
                return response
            }
        }).catch((err) => {
            console.log("error getting pages ", err)
            return err
        })
    };
}

export const deleteCustomPageRequest = (url) => {
    return async () => {
        await axios({
            method: 'delete',
            url: process.env.REACT_APP_API_HOST + 'admin/custompage?url=' + url,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
            }
        }).then((response) => {
            if (response.status === 200) {
                alert("Page was removed successfully!")
            }
        }).catch((err) => {
            if (err.response === undefined) {
                networkErrorMessage()
            } else {
                alert("Page cant be removed")
            }
        })
    };
}