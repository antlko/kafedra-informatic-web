import './App.css';
import React, {useEffect, useState} from "react";
import {AdminPage} from "./views/AdminPage/AdminPage";
import {Route, Router, Switch} from "react-router-dom";
import LoginPage from "./views/LoginPage/LoginPage";
import LandingPage from "./views/LandingPage/LandingPage";
import {createBrowserHistory} from "history";
import {authRequest} from "./api/requests";
import Components from "./views/Components/Components";

let hist = createBrowserHistory();

function App() {
    return (
        <div className="App">
            <Router history={hist}>
                <Switch>
                    <PrivateRoute path="/admin" component={AdminPage}/>
                    <Route path="/admin_informatics" component={LoginPage}/>
                    <Route path="/" component={LandingPage}/>
                    <Route path="/info" component={Components}/>
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
            isAuth ? <Component {...props} /> : <div>{window.location.href='/admin_informatics'}</div>
        )}/>
    ) : <h2>Loading...</h2>
}

export default App;
