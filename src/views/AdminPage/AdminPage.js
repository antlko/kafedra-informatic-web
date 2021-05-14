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
    {value: "teachers", label: "Преподователи"},
    {value: "newPage", label: "Новая Страница"}
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
                        <h4 className="selectLabel">Выберете объект для роботы</h4>
                        <Select
                            className="select"
                            options={options}
                            isClearable={true}
                            onChange={handleChange}
                        />
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

const initMap = () => {
    let mappingsMap = new Map();
    mappingsMap.set("teachers", [
        {
            link: "/admin/teachers/add",
            name: "Добавить"
        },
        {
            link: "/admin/teachers",
            name: "Обновить/Удалить"
        }
    ]);
    mappingsMap.set("newPage", [
        {
            link: "/admin/custom/header",
            name: "Добавить новую вкладку"
        },
        {
            link: "/admin/custom/create",
            name: "Создать новую страницу"
        },
        {
            link: "/admin/custom",
            name: "Обновить/Удалить страницу"
        }
    ]);
    return mappingsMap;
};

const printByStage = (classes, navbarStage) => {
    let stageElement = initMap().get(navbarStage);
    if (stageElement === undefined) {
        stageElement = initMap().get("newPage");
    }
    return stageElement.map(el => {
        return (
            <Link to={el.link}>
                <div className={classes.dropdownLink}>
                    {el.name}
                </div>
            </Link>
        )
    })
};

const setupButton = (classes, buttonText, dropdownHeader, navbarStage) => {
    return <ListItem className={classes.listItem}>
        <CustomDropdown
            buttonText={buttonText}
            dropdownHeader={dropdownHeader}
            buttonProps={{
                className: classes.navLink
            }}
            dropdownList={printByStage(classes, navbarStage)}
        />
    </ListItem>
};

const getRenderInfo = (classes, navbarStage) => {
    if (navbarStage === "teachers") {
        return setupButton(classes, "Преподователи", "Меню", navbarStage);
    } else {
        return setupButton(classes, "Новая страница", "Меню страницы", navbarStage);
    }
};