import React, {useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import classNames from "classnames";
import Footer from "../../components/Footer/Footer";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/views/landingPage";
import CardBody from "../../components/Card/CardBody";
import {getCustomPageByURLRequest} from "../../api/requests";
import {Editor} from "../../Editor";
import {EDITOR_JS_TOOLS} from "../../Scripts/Editor";

const useStyles = makeStyles(styles);

export const CustomPage = (props) => {

    const {url} = props

    const [infoJson, setInfoJson] = useState(null)

    useEffect(() => {
        getCustomPageByURLRequest(url)().then(res => {
            setInfoJson(res.data.info_json)
        })
    }, [])

    const classes = useStyles();

    const getEditorJS = () => {
        return infoJson === undefined || infoJson === null || infoJson === '' ? '' : (
            <Editor
                data={JSON.parse(infoJson)}
                tools={EDITOR_JS_TOOLS}
                holder={"CustomPageRead"}
                readOnly={true}
            />
        )
    }

    return (
        <div className={"CustomPage"}>
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
                            <h1 className={classes.title}>Custom Page</h1>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <GridContainer justify={"center"} style={{
                    paddingLeft:70,
                    paddingRight:70,
                }}>
                    <GridItem xs={12} sm={12} md={12}>
                        <CardBody>
                            {getEditorJS()}
                        </CardBody>
                    </GridItem>
                </GridContainer>
            </div>
            <Footer/>
        </div>
    )

}