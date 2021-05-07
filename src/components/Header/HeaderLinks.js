/*eslint-disable*/
import React, {useEffect, useState} from "react";
// react components for routing our app without refresh
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import {getHeadersRequest} from "../../api/requests";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {

    const [header, setHeader] = useState(null)

    useEffect(() => {
        getHeadersRequest()().then((value) => {
            if (value.status === 200) {
                setHeader(value.data)
            }
        })
    }, [])

    const classes = useStyles();

    const printHeaders = () => {
        return header === undefined || header === null ? <div>Loading...</div>
            : (
                header.map((el) => {
                    return el.sub.length === 0
                        ? (
                            <ListItem className={classes.listItem}>
                                <Button
                                    color="transparent"
                                    target="_blank"
                                    className={classes.navLink}
                                    onClick={() => window.location.href = el.url}
                                >
                                    {el.name}
                                </Button>
                            </ListItem>
                        )
                        : (
                            <ListItem className={classes.listItem}>
                                <CustomDropdown
                                    noLiPadding
                                    buttonText={el.name}
                                    buttonProps={{
                                        className: classes.navLink,
                                        color: "transparent"
                                    }}
                                    dropdownList={printDropDownList(el.sub)}
                                />
                            </ListItem>
                        )
                })
            )
    }

    const printDropDownList = (sub) => {
        let list = []
        for (let i = 0; i < sub.length; i++) {
            list[i] = (
                <div className={classes.dropdownLink} onClick={() => window.location.href =sub[i].url}>
                    {sub[i].name}
                </div>
            )
        }
        return list
    }

    return (
        <List className={classes.list}>
            {printHeaders()}
        </List>
    );
}
