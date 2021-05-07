import React, {useEffect, useState} from "react";
import {getHeadersRequest, saveHeaderRequest} from "../../../api/requests";
import {Input} from "@material-ui/core";
import Button from "../../../components/CustomButtons/Button";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-kit-react/views/loginPage";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CardBody from "../../../components/Card/CardBody";

const useStyles = makeStyles(styles);

const headerTemplate = {
    id: -1,
    name: '',
    url: '',
    sub: [],
}

export const EditHeaderComponent = () => {

    const classes = useStyles();

    const [header, setHeader] = useState([])

    useEffect(() => {
        getHeadersRequest()().then((value) => {
            if (value.status === 200) {
                setHeader(value.data)
            }
        })
    }, [])

    useEffect(() => {
        console.log(header)
    }, [header])

    function updateElementName(array, id, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                array[i].name = value
                setHeader(array)
                return true
            }
            if (array[i].sub.length > 0 && updateElementName(array[i].sub, id, value)) {
                setHeader(array)
                return true
            }
        }
        return false
    }

    function updateElementURL(array, id, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                array[i].url = value
                setHeader(array)
                return true
            }
            if (array[i].sub.length > 0 && updateElementURL(array[i].sub, id, value)) {
                setHeader(array)
                return true
            }
        }
        return false
    }

    function createNewSubElem(el) {
        const newHeader = [...header]
        for (let i = 0; i < newHeader.length; i++) {
            if (el.id === newHeader[i].id) {
                const newObj = {...headerTemplate}
                newObj.sub = []
                newObj.id = getMaxID() + 1
                el.sub.push(newObj)
                setHeader(newHeader)
                return
            }
        }
    }

    const getMaxID = () => {
        let maxItem = -1
        header.forEach(el => {
            if (el.id > maxItem) {
                maxItem = el.id
            }
            el.sub.forEach(subel => {
                if (subel.id > maxItem) {
                    maxItem = subel.id
                }
            })
        })
        return maxItem
    }

    function printEditableHeaderElement() {
        const myHeader = [...header]

        return myHeader.map(el => {
            let subEls = null
            if (el.sub.length > 0) {
                subEls = getSubHeader(el);
            }

            const url = el.sub.length > 0 ?
                '' :
                <Input
                    id={"url"}
                    name={"url"}
                    defaultValue={el.url}
                    style={{background: "#e59966", marginLeft: 20}}
                    onChange={(e) => {
                        updateElementURL([...header], el.id, e.target.value)
                    }}
                />

            const hEl =
                <div style={{paddingTop: 20}} key={el.id}>
                    <Input
                        id={"name"}
                        name={"name"}
                        defaultValue={el.name}
                        style={{background: "#e2506d"}}
                        onChange={(e) => {
                            updateElementName([...header], el.id, e.target.value)
                        }}
                    />
                    {url}
                    <Button
                        color="success"
                        target="_blank"
                        className={classes.form}
                        style={{marginLeft: 10}}
                        onClick={() => {
                            createNewSubElem({...el})
                        }}
                    >
                        +
                    </Button>
                    <Button
                        color="danger"
                        target="_blank"
                        className={classes.form}
                        style={{marginLeft: 10}}
                        onClick={() => {
                            deleteElement([...header], el.id)
                        }}
                    >
                        Х
                    </Button>
                    {subEls}
                </div>
            return <div>{hEl} -</div>
        })
    }

    function deleteElement(array, id) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].sub.length > 0 && deleteElement(array[i].sub, id)) {
                setHeader(array)
                return true
            }
            if (array[i].id === id) {
                array.splice(i, 1);
                setHeader(array)
                return true
            }
        }
        return false
    }

    function getSubHeader(el) {
        return el.sub.map(subEl => {
            return (
                <div style={{paddingTop: 20}} key={subEl.id}>
                    <Input
                        id={"name"}
                        name={"name"}
                        defaultValue={subEl.name}
                        style={{background: "#6acfdc"}}
                        onChange={(e) => {
                            updateElementName([...header], subEl.id, e.target.value)
                        }}
                    />
                    <Input
                        id={"url"}
                        name={"url"}
                        defaultValue={subEl.url}
                        style={{background: "#d8dc6a", marginLeft: 20}}
                        onChange={(e) => {
                            updateElementURL([...header], subEl.id, e.target.value)
                        }}
                    />
                    <Button
                        color="danger"
                        target="_blank"
                        className={classes.form}
                        style={{marginLeft: 10}}
                        onClick={() => {
                            deleteElement([...header], subEl.id)
                        }}
                    >
                        Х
                    </Button>
                </div>
            )
        })
    }

    const createNewHeaderMain = () => {
        const newHeader = [...header]
        const newObj = {...headerTemplate}
        newObj.id = getMaxID() + 1
        newObj.sub = []
        newHeader.push(newObj)
        setHeader(newHeader)
    }

    return (
        <div className={"EditHeaderComponent"}>
            <h3>
                Настройки навбара
            </h3>
            <GridContainer justify={"center"}>
                <GridItem xs={12} sm={12} md={12}>
                    <CardBody>
                        <Button
                            color="primary"
                            target="_blank"
                            className={classes.form}
                            onClick={() => {
                                saveHeaderRequest(header)()
                            }}
                        >
                            Сохранить
                        </Button>
                        <Button
                            color="success"
                            target="_blank"
                            className={classes.form}
                            style={{marginLeft: 20}}
                            onClick={() => createNewHeaderMain()}
                        >
                            Добавить
                        </Button>
                        {printEditableHeaderElement()}
                    </CardBody>
                </GridItem>
            </GridContainer>
        </div>
    )
}
