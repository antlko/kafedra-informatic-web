import React, {useEffect, useState} from "react";
import {
    deleteCustomPageRequest,
    deleteTeacherRequest,
    getAllCustomPagesDataRequest,
    getLectureRequest
} from "../../../api/requests";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Button from "../../../components/CustomButtons/Button";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-kit-react/views/loginPage";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(styles);

export const CustomPageListComponent = () => {

    const classes = useStyles();

    const history = useHistory();

    const [customPage, setCustomPage] = useState(null);

    useEffect(() => {
        updateCPages()
    }, [])

    const updateCPages = () => {
        getAllCustomPagesDataRequest()().then(value => {
            setCustomPage(value.data)
        })
    }

    const removePage = (url) => {
        deleteCustomPageRequest(url)().then(value => {
            updateCPages()
        })
    }

    const printPagesInfo = () => {
        return customPage !== undefined && customPage !== null
            ? customPage.map((t) =>
                <div key={t.id} style={{paddingTop: 20}}>
                    <GridContainer>
                        <GridItem xs={3} sm={3} md={3} lg={3}>
                            {t.id}
                        </GridItem>
                        <GridItem xs={3} sm={3} md={3} lg={3}>
                            {t.url}
                        </GridItem>
                        <GridItem xs={3} sm={3} md={3} lg={3}>
                            <Button
                                color="warning"
                                target="_blank"
                                className={classes.form}
                                onClick={() => {
                                    history.push("/admin/custom/update/" + encodeURIComponent(t.url))
                                }}
                            >
                                Обновить
                            </Button>
                            <Button
                                color="danger"
                                target="_blank"
                                className={classes.form}
                                onClick={() => removePage(encodeURIComponent(t.url))}
                            >
                                Удалить
                            </Button>
                        </GridItem>
                    </GridContainer>
                </div>
            )
            : <div>Loading...</div>
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={3} sm={3} md={3} lg={3}>
                    <h3>ID</h3>
                </GridItem>
                <GridItem xs={3} sm={3} md={3} lg={3}>
                    <h3>URL</h3>
                </GridItem>
                <GridItem xs={3} sm={3} md={3} lg={3}>
                    <h3>ACTIONS</h3>
                </GridItem>
            </GridContainer>
            {printPagesInfo()}
        </div>
    )
}