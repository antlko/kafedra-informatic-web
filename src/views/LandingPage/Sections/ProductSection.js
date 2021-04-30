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

const useStyles = makeStyles(styles);

export default function ProductSection() {

    const items = [
        {
            image: "https://lh5.googleusercontent.com/SAvBNSnlTa_J3jfVzYKzWt6yelsbnh74XZEnwju2k6MYW5itAU53Gmp0Zu_rAq7iFIw6nanyiuWwM3VkohHiWJQ=w16383"
        },
        {
            image: "https://lh4.googleusercontent.com/T2qgxqVZ24FWZaHB117oBX3puk-h69Lt-t4WRAgfwj9W0SZghLrbTjjaUullW7BK-HZJv_KcGykaZO0UhjylCeo=w16383"
        },
        {
            image: "https://lh6.googleusercontent.com/GNLXDA8ZAHcJsYEtFlTFZJYd1c9oEYzAbxefwC4WaNojSwnPjk3gf8Ew5QlQ35ui7nEhpT_XO2yiSa5Sj2ETEXM=w16383"
        },
        {
            image: "https://lh3.googleusercontent.com/gJ645LU7LwyEPN726Ghdp_vTmnQ5pt299EPjVtB4y7lFS_Bl3xqgfKUoh6wxzQhxbn_XLfZG4X0YoRPO34D7B44=w16383"
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
                                    <Paper>
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
