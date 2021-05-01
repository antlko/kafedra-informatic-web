import React, {useState} from "react";
import {Container} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import Header from "../../components/Header/Header";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";
import {AddLectureComponent} from "./LecturePages/AddLectureComponent";

const defaultData = {
    blocks: [
        {
            type: "paragraph",
            data: {
                text:
                    "Hey. Meet <a href=\"https://github.com/editor-js\">ready-to-use Blocks</a> the new Editor. On this page you can see it in action — try to edit this text."
            }
        },
        {
            "type": "image",
            "data": {
                "file": {
                    "url": "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg"
                },
                "caption": "Roadster // tesla.com",
                "withBorder": false,
                "withBackground": false,
            }
        }
    ],
}

const useStyles = makeStyles(styles);

export const AdminPage = () => {

    const classes = useStyles();

    const [pageComponent, setPageComponent] = useState(null)

    const updatePageComponent = (component) => {
        setPageComponent(component)
    }

    return (
        <div>
            <Container>
                <Header
                    brand="Admin Panel"
                    color="primary"
                    leftLinks={
                        <List className={classes.list}>
                            <ListItem className={classes.listItem}>
                                <CustomDropdown
                                    buttonText="Преподаватели"
                                    dropdownHeader="Меню Преподавателей"
                                    buttonProps={{
                                        className: classes.navLink,
                                        color: "transparent"
                                    }}
                                    dropdownList={[
                                        <div onClick={() => updatePageComponent(<AddLectureComponent/>)}
                                             className={classes.dropdownLink}>
                                            Добавить
                                        </div>,
                                    ]}

                                />
                            </ListItem>
                        </List>
                    }
                />
                {pageComponent === null ? "Dashboard main" : pageComponent}
            </Container>
        </div>
    )
}