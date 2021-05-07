import React, {useEffect, useState} from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CardBody from "../../../components/Card/CardBody";
import {EDITOR_JS_TOOLS} from "../../../Scripts/Editor";
import {Editor} from "../../../Editor";
import Button from "../../../components/CustomButtons/Button";
import {getHeadersRequest, saveCustomPageRequest} from "../../../api/requests";
import {InputLabel, MenuItem, Select} from "@material-ui/core";

const defaultData = {
    blocks: [
        {
            type: "paragraph",
            data: {
                text: "Редактируемая информация страницы",
                alignment: "left"
            }
        }
    ]
}

export const CustomPage = () => {

    const [page, setPage] = useState(null)

    const [header, setHeader] = useState([])

    const [urlData, setUrl] = useState('');

    useEffect(() => {
        getHeadersRequest()().then((value) => {
            if (value.status === 200) {

                const headers = value.data
                const headersFull = []
                headers.forEach(h => {
                    if (h.sub.length > 0) {
                        h.sub.forEach(s => {
                            headersFull.push(s)
                        })
                    } else {
                        headersFull.push(h)
                    }
                })


                setHeader(headersFull)
                setPage({
                    info_json: JSON.stringify(defaultData),
                })
            }
        })
    }, [])

    const updateDateEditor = (data) => {
        const form = page
        form['info_json'] = data
        setPage(form)
    }

    const getEditorJS = () => {
        return page === undefined || page === null ? '' : (
            <Editor
                data={JSON.parse(page.info_json)}
                tools={EDITOR_JS_TOOLS}
                holder={"CustomPage"}
                readOnly={false}
                onChange={(data) => {
                    data.saver.save().then((value => updateDateEditor(JSON.stringify(value))))
                }}
            />
        )
    }

    const printHeader = () => {
        return header !== undefined && header !== null
            ? header.map(el => {
                return <MenuItem value={el.url}>{el.url}</MenuItem>
            })
            : ''
    }

    function publishNewPage() {
        const data = {
            url: urlData,
            info_json: page.info_json
        }
        console.log(data)
        saveCustomPageRequest(data)()
    }

    return (
        <div className={"CustomPage"}>
            <Button
                color="primary"
                target="_blank"
                onClick={() => publishNewPage()}
            >
                Публиковать
            </Button>
            <GridContainer justify={"center"}>
                <GridItem xs={12} sm={12} md={12}>
                    <CardBody>
                        <InputLabel id="demo-simple-select-label">Выбор URL</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="url"
                            style={{width: 300}}
                            onChange={(e) => {
                                console.log(e.target)
                                setUrl(e.target.value)
                            }}
                        >
                            {printHeader()}
                        </Select>
                    </CardBody>
                </GridItem>
            </GridContainer>
            <GridContainer justify={"center"}>
                <GridItem xs={12} sm={12} md={12}>
                    <CardBody>
                        <h3>Custom Page:</h3>
                        {getEditorJS()}
                    </CardBody>
                </GridItem>
            </GridContainer>
        </div>
    )
}