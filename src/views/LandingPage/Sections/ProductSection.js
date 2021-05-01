import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import Carousel from "react-material-ui-carousel";
import {Paper} from "@material-ui/core";
import Button from "../../../components/CustomButtons/Button";
import icon1 from "../../../assets/img/common/icon1.jpg"
import icon2 from "../../../assets/img/common/icon2.jpg"
import icon3 from "../../../assets/img/common/icon3.jpg"
import icon4 from "../../../assets/img/common/icon4.jpg"

const useStyles = makeStyles(styles);

export default function ProductSection() {

    const items = [
        {
            key: 1,
            image: icon1
        },
        {
            key: 2,
            image: icon2
        },
        {
            key: 3,
            image: icon3,
        },
        {
            key: 4,
            image: icon4,
        },

    ]

    const classes = useStyles();
    return (
        <div className={"ProductSection"}>
            <div className={classes.section}>
                <h3 className={classes.title}>Формування професійних компетенцій у відповідності до світових
                    стандартів</h3>
            </div>
            <div className={classes.section}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={6}>
                        <Carousel>
                            {
                                items.map((item, i) =>
                                    <Paper key={item.key}>
                                        <img src={item.image} alt={"photo"}/>
                                    </Paper>
                                )
                            }
                        </Carousel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <h2 className={classes.title}>Вступнику</h2>
                        <h4 className={classes.description}>Практика та працевлаштування у провідних українських та
                            міжнародних ІТ - компаніях</h4>
                        <h4 className={classes.description}>Сучасні вимоги IT - компаній до підготовки фахівців
                            враховуються
                            в усіх дисциплінах та атестаційних роботах</h4>
                        <h4 className={classes.description}>Участь провідних фахівців IT-компаній у викладанні</h4>
                        <h4 className={classes.description}>Участь у міжнародних проєктах та конкурсах</h4>
                        <h4 className={classes.description}>Можливість навчання в магістратурі Німеччини, Польщі та
                            Швеції</h4>
                        <h4 className={classes.description}>Перспектива продовжити навчання в аспірантурі</h4>

                    </GridItem>
                </GridContainer>
                <Button
                    target="_blank"
                    className={classes.navLink}
                    onClick={() => window.location.href = "/"}
                >
                    Детальніше
                </Button>
                <div>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <InfoArea
                                title="Free Chat"
                                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                                icon={Chat}
                                iconColor="info"
                                vertical
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <InfoArea
                                title="Verified Users"
                                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                                icon={VerifiedUser}
                                iconColor="success"
                                vertical
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <InfoArea
                                title="Fingerprint"
                                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                                icon={Fingerprint}
                                iconColor="danger"
                                vertical
                            />
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </div>
    );
}
