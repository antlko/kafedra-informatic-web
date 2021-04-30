import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="NURE INFORMATICS"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={"assets/img/landing-bg.jpg"}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>122-Комп'ютерні науки</h1>
              <h3 className={classes.title}>ОСВІТНЬО-ПРОФЕСІЙНА ПРОГРАМА "ІНФОРМАТИКА"</h3>
              <h3 className={classes.title}>КАФЕДРА ІНФОРМАТИКИ</h3>
              <h4>
                  Факультет Інформаційно-аналітичних технологій та менеджменту
              </h4>
              <h4>
                  Харківський національний університет радіоелектроніки
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=NXR3lSNoqxY&ab_channel=NURETV"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Дивитись відео
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
