import React, {useEffect, useState} from "react";
import {deleteTeacherRequest, getLectureRequest} from "../../../api/requests";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Button from "../../../components/CustomButtons/Button";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-kit-react/views/loginPage";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(styles);

export const TeachersComponent = () => {

    const classes = useStyles();

    const history = useHistory();

    const [teachers, setTeachers] = useState(null);

    useEffect(() => {
        updateTeachers()
    }, [])

    const updateTeachers = () => {
        getLectureRequest()().then(value => {
            setTeachers(value.data)
        })
    }

    const removeTeacher = (id) => {
        deleteTeacherRequest(id)().then(value => {
            updateTeachers()
        })
    }

    const printTeachers = () => {
        return teachers !== undefined && teachers !== null
            ? teachers.map((t) =>
                <div key={t.id} style={{paddingTop: 20}}>
                    <GridContainer>
                        <GridItem xs={3} sm={3} md={3} lg={3}>
                            {t.name}
                        </GridItem>
                        <GridItem xs={3} sm={3} md={3} lg={3}>
                            {t.description}
                        </GridItem>
                        <GridItem xs={3} sm={3} md={3} lg={3}>
                            <Button
                                color="github"
                                target="_blank"
                                className={classes.form}
                                onClick={() => {
                                    history.push("/admin/teachers/update/" + t.id)
                                }}
                            >
                                Обновить
                            </Button>
                            <Button
                                style={{
                                    marginLeft: 10
                                }}
                                color="github"
                                target="_blank"
                                className={classes.form}
                                onClick={() => removeTeacher(t.id)}
                            >
                                Удалить
                            </Button>
                        </GridItem>
                    </GridContainer>
                </div>
            )
            : <div>Данные не найдены...</div>
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={3} sm={3} md={3} lg={3}>
                    <h3>ФИО</h3>
                </GridItem>
                <GridItem xs={3} sm={3} md={3} lg={3}>
                    <h3>Должность</h3>
                </GridItem>
                <GridItem xs={3} sm={3} md={3} lg={3}>
                    <h3>Возможности</h3>
                </GridItem>
            </GridContainer>
            {printTeachers()}
        </div>
    )
}