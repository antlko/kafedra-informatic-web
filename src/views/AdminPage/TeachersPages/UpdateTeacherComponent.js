import React, {useEffect, useState} from "react";
import {Editor} from "../../../Editor";
import {EDITOR_JS_TOOLS} from "../../../Scripts/Editor";
import CustomInput from "../../../components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import CardBody from "../../../components/Card/CardBody";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-kit-react/views/loginPage";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Button from "../../../components/CustomButtons/Button";
import FileBase64 from 'react-file-base64';
import {addLectureRequest, getTeacherRequest} from "../../../api/requests";
import {useHistory, useParams} from 'react-router-dom'

const useStyles = makeStyles(styles);

const defaultData = {
    blocks: [
        {
            type: "paragraph",
            data: {
                text: "Редактируемая информация (пр. доцент, профессор...)"
            }
        },
        {
            type: "paragraph",
            data: {
                text: "Редактируемая информация о преподавателе."
            }
        },
    ],
}

export const UpdateTeacherComponent = (props) => {

    const history = useHistory();

    const classes = useStyles();

    let {id} = useParams();

    const [photo, setPhoto] = useState('')

    const [addLectureForm, setAddLectureForm] = useState({
        id: id,
        photo: '',
        name: '',
        email: '',
        description: '',
        info_json: JSON.stringify(defaultData),
    })

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        getTeacherRequest(id)().then((value => {
            const form = addLectureForm
            form['info_json'] = value.data.info_json
            form['name'] = value.data.name
            form['description'] = value.data.description
            form['photo'] = value.data.photo
            setAddLectureForm(form)
            setPhoto({base64: value.data.photo})
            setLoaded(true)
        }))
    }, [])

    const printPhoto = () => {
        return photo !== '' ? <img src={photo.base64} alt="Avatar photo"/> : <div>...</div>;
    }

    const onFormUpdate = (elem) => {
        const form = addLectureForm
        form[elem.id] = elem.value
        setAddLectureForm(form)
    }

    const updateDateEditor = (data) => {
        const form = addLectureForm
        form['info_json'] = data
        setAddLectureForm(form)
    }

    const updatePhotoForm = (photo) => {
        const form = addLectureForm
        form['photo'] = photo.base64
        setAddLectureForm(form)
        setPhoto(photo)
    }

    const getForm = () => {
        return loaded ?
            (
                <form className={classes.form}>
                    <h2>Обновление преподавателей</h2>
                    <Button
                        color="primary"
                        target="_blank"
                        className={classes.form}
                        onClick={() => {
                            addLectureRequest(addLectureForm)().then((value) => {
                                history.push("/admin/teachers")
                            })
                        }}
                    >
                        Сохранить
                    </Button>
                    <Button
                        style={{
                            marginLeft: 20
                        }}
                        color="secondary"
                        target="_blank"
                        className={classes.form}
                        onClick={() => {
                            history.push("/admin")
                        }}
                    >
                        Отмена
                    </Button>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={6} md={6}>
                            <CardBody>
                                <h3>Обновить фото:</h3>
                                <FileBase64
                                    id={"load_photo"}
                                    multiple={false}
                                    onDone={(result) => updatePhotoForm(result)}/>
                                {printPhoto()}
                                <CustomInput
                                    labelText="ФИО..."
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <People className={classes.inputIconsColor}/>
                                            </InputAdornment>
                                        ),
                                        name: "name",
                                        id: "name",
                                        onChange: (e) => onFormUpdate(e.target),
                                        defaultValue: addLectureForm.name
                                    }}
                                />
                                <CustomInput
                                    labelText="Короткое описание (должность)..."
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <People className={classes.inputIconsColor}/>
                                            </InputAdornment>
                                        ),
                                        name: "description",
                                        id: "description",
                                        onChange: (e) => onFormUpdate(e.target),
                                        defaultValue: addLectureForm.description
                                    }}
                                />
                                <CustomInput
                                    labelText="email"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <People className={classes.inputIconsColor}/>
                                            </InputAdornment>
                                        ),
                                        name: "email",
                                        id: "email",
                                        onChange: (e) => onFormUpdate(e.target),
                                        defaultValue: addLectureForm.email
                                    }}
                                />
                            </CardBody>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                            <CardBody>
                                <h3>Обновить редактируемую информацию:</h3>
                                <Editor
                                    data={JSON.parse(addLectureForm.info_json)}
                                    tools={EDITOR_JS_TOOLS}
                                    holder={"editor"}
                                    readOnly={false}
                                    onChange={(data) => {
                                        data.saver.save().then((value => updateDateEditor(JSON.stringify(value))))
                                    }}
                                />
                            </CardBody>
                        </GridItem>
                    </GridContainer>

                </form>
            ) : <div>Loading...</div>
    }

    return (
        <div className={"AddTeachersComponent"}>
            {getForm()}
        </div>
    )
}