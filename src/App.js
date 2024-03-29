import './App.css';
import React, {useEffect, useState} from "react";
import {AdminPage} from "./views/AdminPage/AdminPage";
import {Route, Switch, Redirect, BrowserRouter as Router} from "react-router-dom";
import LoginPage from "./views/LoginPage/LoginPage";
import LandingPage from "./views/LandingPage/LandingPage";
import {authRequest, getHeadersRequest} from "./api/requests";
import {TeachersPage} from "./views/TeachersPage/TeachersPage";
import {CustomPage} from "./views/CustomPage/CustomPage";

const staticPages = ["/", "/teachers", "/admin_informatics", "/admin"]

export const App = () => {

    const [header, setHeader] = useState([])

    useEffect(() => {
        getHeadersRequest()().then((value) => {
            if (value.status === 200) {
                const headers = value.data
                const headersFull = []
                headers.forEach(h => {
                    if (h.sub.length > 0) {
                        h.sub.forEach(s => {
                            if (s.url !== null && !staticPages.includes(s.url.replace(/\s+/g, ''))) {
                                headersFull.push(s)
                            }
                        })
                    } else {
                        if (!staticPages.includes(h.url.replace(/\s+/g, ''))) {
                            headersFull.push(h)
                        }
                    }
                })

                setHeader(headersFull)
            }
        })
    }, [])

    const setCustomPageRoutes = () => {
        return header !== undefined && header !== null ?
            header.map(el => {
                if (el.url)
                    return <Route path={el.url} component={() => <CustomPage url={el.url}/>}/>
            }) : <div>Loading...</div>
    };

    return (
        <div className="App">
            <Router>
                <Switch>
                    <PrivateRoute path="/admin" component={AdminPage}/>
                    <Route path="/admin_informatics" component={LoginPage}/>
                    <Route path="/teachers" component={TeachersPage}/>
                    {setCustomPageRoutes()}
                    <Route path="/" component={LandingPage}/>
                </Switch>
            </Router>
        </div>
    );
}


export const PrivateRoute = ({component: Component, ...rest}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const fetchAuth = async () => {
            const result = await authRequest()
            setIsAuth(result)
            setIsLoading(false)
        }
        fetchAuth()
    }, [])

    return !isLoading ? (
        <Route {...rest} render={(props) => (
            isAuth ? <Component {...props} /> : <div><Redirect to={"/admin_informatics"}/></div>
        )}/>
    ) : <h2>Loading...</h2>
}

export default App;
