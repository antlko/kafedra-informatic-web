import React from "react";
import {Container} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import Header from "../../components/Header/Header";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";
import {AddTeachersComponent} from "./TeachersPages/AddTeachersComponent";
import {TeachersComponent} from "./TeachersPages/TeachersComponent";
import {BrowserRouter, Link, Switch, useHistory} from "react-router-dom";
import {PrivateRoute} from "../../App";
import {createBrowserHistory} from "history";
import {UpdateTeacherComponent} from "./TeachersPages/UpdateTeacherComponent";
import Button from "../../components/CustomButtons/Button";

let hist = createBrowserHistory();

const useStyles = makeStyles(styles);

export const AdminPage = () => {

    const classes = useStyles();

    return (
        <div>
            <Container>
                <BrowserRouter>
                    <Header
                        brand={"Admin Panel"}
                        color="primary"
                        leftLinks={
                            <List className={classes.list}>
                                <ListItem className={classes.listItem}>
                                    <Link to={"/admin"}>
                                        <Button
                                            color="white"
                                            target="_blank"
                                            className={classes.navLink}
                                        >
                                            Главная
                                        </Button>
                                    </Link>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <CustomDropdown
                                        buttonText="Преподаватели"
                                        dropdownHeader="Меню Преподавателей"
                                        buttonProps={{
                                            className: classes.navLink,
                                            color: "transparent"
                                        }}
                                        dropdownList={[
                                            <Link to={"/admin/teachers/add"}>
                                                <div className={classes.dropdownLink}>
                                                    Добавить
                                                </div>
                                            </Link>,
                                            <Link to={"/admin/teachers"}>
                                                <div className={classes.dropdownLink}>
                                                    Обновить/Удалить
                                                </div>
                                            </Link>,
                                        ]}

                                    />
                                </ListItem>
                            </List>
                        }
                    />
                    <h2>ADMIN Панель NURE-INF</h2>
                    <Switch>
                        <PrivateRoute path="/admin/teachers/add" component={AddTeachersComponent}/>
                        <PrivateRoute path="/admin/teachers/update/:id" component={UpdateTeacherComponent}/>
                        <PrivateRoute path="/admin/teachers" component={TeachersComponent}/>
                    </Switch>
                </BrowserRouter>
            </Container>
        </div>
    )
}

const AdminStaticPage = () => {
    return (
        <div className={"AdminStaticPage"}>

        </div>
    )
}