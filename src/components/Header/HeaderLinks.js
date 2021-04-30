/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import {Link} from "react-router-dom";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
    const classes = useStyles();
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Button
                    color="transparent"
                    target="_blank"
                    className={classes.navLink}
                    onClick={() => window.location.href = "/"}
                >
                    Головна
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    buttonText="Про кафедру"
                    buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                    }}
                    dropdownList={[
                        <Link to="/" className={classes.dropdownLink}>
                            Історія Кафедри
                        </Link>,
                        <Link to="/" className={classes.dropdownLink}>
                            Колектив Кафедри
                        </Link>,
                        <Link to="/" className={classes.dropdownLink}>
                            Міжнародна співпраця
                        </Link>,
                        <Link to="/" className={classes.dropdownLink}>
                            Команії партнери
                        </Link>,
                        <Link to="/" className={classes.dropdownLink}>
                            Контакти
                        </Link>,
                    ]}
                />
            </ListItem>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    buttonText="Освіта"
                    buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                    }}
                    dropdownList={[
                        <Link to="/" className={classes.dropdownLink}>
                            Освітні програми
                        </Link>,
                        <Link to="/" className={classes.dropdownLink}>
                            Аспірантура
                        </Link>,
                    ]}
                />
            </ListItem>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    buttonText="Наука"
                    buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                    }}
                    dropdownList={[
                        <Link to="/" className={classes.dropdownLink}>
                            Напрямки наукових досліджень та наукові школи
                        </Link>,
                        <Link to="/" className={classes.dropdownLink}>
                            Науково-дослідницька робота студентів
                        </Link>,
                        <Link to="/" className={classes.dropdownLink}>
                            Навчально-наукова лабораторія
                        </Link>,
                    ]}
                />
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button
                    color="transparent"
                    target="_blank"
                    className={classes.navLink}
                    onClick={() => window.location.href = "/"}
                >
                    Вступнику
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button
                    color="transparent"
                    target="_blank"
                    className={classes.navLink}
                    onClick={() => window.location.href = "/"}
                >
                    Студенту
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button
                    color="transparent"
                    target="_blank"
                    className={classes.navLink}
                    onClick={() => window.location.href = "/"}
                >
                    Новини
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button
                    color="transparent"
                    target="_blank"
                    className={classes.navLink}
                    onClick={() => window.location.href = "/"}
                >
                    Young Genius IT
                </Button>
            </ListItem>
        </List>
    );
}
