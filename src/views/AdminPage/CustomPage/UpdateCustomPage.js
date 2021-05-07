import React, {useEffect, useState} from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CardBody from "../../../components/Card/CardBody";
import {EDITOR_JS_TOOLS} from "../../../Scripts/Editor";
import {Editor} from "../../../Editor";
import Button from "../../../components/CustomButtons/Button";
import {getCustomPageByURLRequest, getHeadersRequest, saveCustomPageRequest} from "../../../api/requests";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import {useParams} from "react-router-dom";

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

export const UpdateCustomPage = () => {

    const [header, setHeader] = useState([])

    const [urlData, setUrlData] = useState({
        id: -1,
        url: '',
        info_json: '',
    });

    let {url} = useParams();

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
                getCustomPageByURLRequest(decodeURIComponent(url))().then(res => {
                    console.log(res)
                    setUrlData({
                        id: res.data.id,
                        url: res.data.url,
                        info_json: res.data.info_json
                    })
                })
            }
        })

    }, [])

    const updateDateEditor = (data) => {
        const form = urlData
        form['info_json'] = data
        setUrlData(form)
    }

    const getEditorJS = () => {
        return urlData === undefined || urlData.info_json === null || urlData.info_json === '' ? '' : (
            <Editor
                data={JSON.parse(urlData.info_json)}
                tools={EDITOR_JS_TOOLS}
                holder={"UpdateCustomPage"}
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
        console.log(urlData)
        saveCustomPageRequest(urlData)()
    }

    return (
        <div className={"UpdateCustomPage"}>
            <h2>Страница обновления кастомных веб-страниц</h2>
            <Button
                color="warning"
                target="_blank"
                onClick={() => publishNewPage()}
            >
                Обновить
            </Button>
            <GridContainer justify={"center"}>
                <GridItem xs={12} sm={12} md={12}>
                    <CardBody>
                        <InputLabel id="demo-simple-select-label">Выбор URL</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="url"
                            style={{width: 300}}
                            value={urlData.url}
                            onChange={(e) => {
                                setUrlData({
                                    id: urlData.id,
                                    info_json: urlData.info_json,
                                    url: e.target.value
                                })
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