import React, {useState} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import {loginRequest} from "../../api/requests";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {

    const [loginForm, setLoginForm] = useState({
        login: '',
        password: ''
    })

    const onFormUpdate = (elem) => {
        const newSignupForm = loginForm
        newSignupForm[elem.id] = elem.value
        setLoginForm(newSignupForm)
        console.log(loginForm)
    }

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const {...rest} = props;
    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="Admin Panel login"
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Login</h4>
                                    </CardHeader>
                                    <p className={classes.divider}>Login to Admin panel</p>
                                    <CardBody>
                                        <CustomInput
                                            labelText="Admin Login..."
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <People className={classes.inputIconsColor}/>
                                                    </InputAdornment>
                                                ),
                                                name: "login",
                                                id: "login",
                                                onChange: (e) => onFormUpdate(e.target)
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Admin Password"
                                            name="password" id="password"
                                            onChange={(e) => onFormUpdate(e.target)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "password",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputIconsColor}>
                                                            lock_outline
                                                        </Icon>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off",
                                                name: "password",
                                                id: "password",
                                                onChange: (e) => onFormUpdate(e.target)
                                            }}
                                        />
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button simple color="primary" size="lg" onClick={loginRequest(loginForm)}>
                                            Login
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </div>
    );
}
