import React, {useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Parallax from "../../components/Parallax/Parallax";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/views/landingPage";
import classNames from "classnames";
import Footer from "../../components/Footer/Footer";
import {getLectureRequest} from "../../api/requests";
import {EDITOR_JS_TOOLS} from "../../Scripts/Editor";
import {Editor} from "../../Editor";

const useStyles = makeStyles(styles);

export const TeachersPage = () => {

    const classes = useStyles();

    const [teachers, setTeachers] = useState(null);

    useEffect(() => {
        getLectureRequest()().then(value => {
            setTeachers(value.data)
        })
    }, []);

    const printTeachers = () => {
        return teachers !== undefined && teachers !== null
            ? teachers.map(teacher => {
                return <div className={classes.section}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={5}>
                            <img
                                style={{
                                    width: 400,
                                    maxHeight: 400
                                }}
                                src={teacher.photo}
                                alt="Teacher photo"
                                className={classes.imgRoundedCircle + " " + classes.imgFluid}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={7}
                                  style={{display: "flex", alignItems: "top"}}>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12} style={{display: "flex", alignItems: "top"}}>
                                    <h1>{teacher.name}</h1>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} style={{display: "flex", alignItems: "top"}}>
                                    <h2>{teacher.description}</h2>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} style={{display: "flex", alignItems: "top"}}>
                                    <h3>{teacher.email}</h3>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} style={{display: "flex", alignItems: "center"}}
                                          alignItems={"flex-start"}>
                                    {printFullInfo(teacher)}
                                </GridItem>
                            </GridContainer>
                        </GridItem>
                    </GridContainer>
                </div>
            })
            : <div>Loading...</div>
    }

    const printFullInfo = (teacher) => {
        return teacher.info_json !== null ? (
            <Editor
                data={JSON.parse(teacher.info_json)}
                tools={EDITOR_JS_TOOLS}
                holder={"editor" + teacher.id}
                readOnly={true}
            />
        ) : <h4>404 Інформація відсутня</h4>
    }

    return (
        <div className={"TeachersPage"}>
            <Header
                color="transparent"
                brand="NURE INFORMATICS"
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 100,
                    color: "white"
                }}
            />
            <Parallax filter image={"/img/im1.jpg"}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={8}>
                            <h1 className={classes.title}>Колектив кафедри</h1>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                {printTeachers()}
            </div>
            <Footer/>
        </div>
    )
}