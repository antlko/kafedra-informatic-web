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
        return teachers !== null
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
                                <GridItem xs={12} sm={12} md={12} style={{display: "flex", alignItems: "center"}}
                                          alignItems={"flex-start"}>
                                    {printFullInfo(teacher)}
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} style={{display: "flex", alignItems: "top"}}>
                                    <h3>{teacher.email}</h3>
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
            <Parallax filter image={"assets/img/landing-bg.jpg"}>
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
                <div className={classes.section}>
                    <GridContainer alignContent={"flex-start"}>
                        <GridItem xs={12} sm={12} md={5}>
                            <img
                                style={{
                                    width: 400,
                                    maxHeight: 400
                                }}
                                src={"https://lh3.googleusercontent.com/ocfqrldUatLr_EHdurNES3ecz5J6rIIssfy7gZYstD2tCLpGAckACuX7EtXs-uhUDHpLxuzje-xz7KJlOSSQJc6nOQLLeZdEy80tqs0EWA9PglAZOSAxih3o5JCo-ApD=w1280"}
                                alt="..."
                                className={classes.imgRoundedCircle + " " + classes.imgFluid}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={7} alignItems={"flex-start"}
                                  style={{display: "flex", alignItems: "top"}}>
                            <GridContainer alignContent={"flex-start"}>
                                <GridItem xs={12} sm={12} md={12} style={{display: "flex", alignItems: "top"}}>
                                    <h1>Name Surname</h1>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} style={{display: "flex", alignItems: "top"}}>
                                    <h2>description ...</h2>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} style={{display: "flex", alignItems: "top"}}>
                                    text editor js...
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} style={{display: "flex", alignItems: "top"}}>
                                    <h3>Email: ....@...</h3>
                                </GridItem>
                            </GridContainer>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
            <Footer/>
        </div>
    )
}