import React, {useState} from "react";
import {Container} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import Header from "../../components/Header/Header";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";
import {AddTeachersComponent} from "./TeachersPages/AddTeachersComponent";
import {TeachersComponent} from "./TeachersPages/TeachersComponent";
import {BrowserRouter, Link, Switch} from "react-router-dom";
import {PrivateRoute} from "../../App";
import {UpdateTeacherComponent} from "./TeachersPages/UpdateTeacherComponent";
import Button from "../../components/CustomButtons/Button";
import {CustomPage} from "./CustomPage/CustomPage";
import {EditHeaderComponent} from "./HeaderPages/EditHeaderComponent";
import {CustomPageListComponent} from "./CustomPage/CustomPageListComponent";
import {UpdateCustomPage} from "./CustomPage/UpdateCustomPage";
import {useHistory} from "react-router-dom";
import Select from 'react-select';

const options = [
    {value: 'teachers', label: 'Преподователи'}
];
const useStyles = makeStyles(styles);

export const AdminPage = () => {

    const [navbarStage, setNavbarStage] = useState(null);

    let handleChange = (event) => {
        if (event == null) {
            setNavbarStage("");
        } else {
            setNavbarStage(event.value);
        }
    };

    const classes = useStyles();
    const history = useHistory();

    let navbar = getRenderInfo(classes, navbarStage);

    return (
        <div>
            <Container>
                <BrowserRouter>
                    <Header
                        brand={"Admin Panel"}
                        color="white"
                        leftLinks={
                            <List className={classes.list}>
                                <ListItem className={classes.listItem}>
                                    <Link to={"/admin"}>
                                        <Button
                                            color="github"
                                            target="_blank"
                                            buttonProps={{
                                                className: classes.navLink,
                                                color: "white"
                                            }}
                                        >
                                            Главная
                                        </Button>
                                    </Link>
                                </ListItem>
                                {navbar}
                            </List>
                        }
                        rightLinks={
                            <List>
                                <ListItem classes={classes.listItem}>
                                    <Button
                                        color="github"
                                        target="_blank"
                                        buttonProps={{
                                            className: classes.navLink,
                                            color: "transparent"
                                        }}
                                        onClick={() => {
                                            localStorage.removeItem("access_token");
                                            history.push("/admin_informatics");
                                        }}
                                    >
                                        Выход
                                    </Button>
                                </ListItem>
                            </List>
                        }
                    />
                    <Select
                        options={options}
                        isClearable={true}
                        onChange={handleChange}
                    >

                    </Select>
                    <Switch>
                        <PrivateRoute path="/admin/teachers/add" component={AddTeachersComponent}/>
                        <PrivateRoute path="/admin/teachers/update/:id" component={UpdateTeacherComponent}/>
                        <PrivateRoute path="/admin/teachers" component={TeachersComponent}/>
                        <PrivateRoute path="/admin/custom/create" component={CustomPage}/>
                        <PrivateRoute path="/admin/custom/header" component={EditHeaderComponent}/>
                        <PrivateRoute path="/admin/custom/update/:url" component={UpdateCustomPage}/>
                        <PrivateRoute path="/admin/custom" component={CustomPageListComponent}/>
                    </Switch>
                </BrowserRouter>
            </Container>
        </div>
    );
};

const getRenderInfo = (classes, navbarStage) => {
    if (navbarStage === "teachers") {
        return <ListItem className={classes.listItem}>
            <CustomDropdown
                buttonText="Преподаватели"
                dropdownHeader="Меню Преподавателей"
                buttonProps={{
                    className: classes.navLink
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
    } else {
        return <ListItem className={classes.listItem}>
            <CustomDropdown
                buttonText="Новая Страница"
                dropdownHeader="Меню Создания новых страниц"
                buttonProps={{
                    className: classes.navLink,
                    color: "black"
                }}
                dropdownList={[
                    <Link to={"/admin/custom/header"}>
                        <div className={classes.dropdownLink}>
                            Навбар (Хидер)
                        </div>
                    </Link>,
                    <Link to={"/admin/custom/create"}>
                        <div className={classes.dropdownLink}>
                            Создать
                        </div>
                    </Link>,
                    <Link to={"/admin/custom"}
                    >
                        <div className={classes.dropdownLink}>
                            Обновить/Удалить
                        </div>
                    </Link>,
                ]}
            />
        </ListItem>
    }
};