import React, {useState} from "react";
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
import FileBase64 from 'react-file-base64';
import {useHistory} from "react-router-dom";
import {addLectureRequest} from "../../../api/requests";
import Button from "../../../components/CustomButtons/Button";

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

export const AddTeachersComponent = () => {

    const classes = useStyles();

    const history = useHistory();

    const [photo, setPhoto] = useState('')

    const [addLectureForm, setAddLectureForm] = useState({
        photo: '',
        name: '',
        email: '',
        description: '',
        info_json: JSON.stringify(defaultData),
    });

    const printPhoto = () => {
        return photo !== '' ? <img src={photo.base64} alt="Avatar photo"/> : <div>...</div>;
    };

    const onFormUpdate = (elem) => {
        const form = addLectureForm;
        form[elem.id] = elem.value;
        setAddLectureForm(form)
    };

    const updateDateEditor = (data) => {
        const form = addLectureForm;
        form['info_json'] = data;
        setAddLectureForm(form)
    };

    const updatePhotoForm = (photo) => {
        const form = addLectureForm;
        form['photo'] = photo.base64;
        setAddLectureForm(form);
        setPhoto(photo);
    };

    return (
        <div className={"AddTeachersComponent"}>
            <form className={classes.form}>
                <h2>Добавление Преподавателей</h2>
                <Button
                    color="github"
                    target="_blank"
                    className={classes.form}
                    onClick={() => {
                        addLectureRequest(addLectureForm)().then((value => {
                            history.push("/admin/teachers")
                        }))
                    }}
                >
                    Сохранить
                </Button>
                <Button
                    style={{
                        marginLeft: 20
                    }}
                    color="github"
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
                            <h3>Загрузить фото:</h3>
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
                                    onChange: (e) => onFormUpdate(e.target)
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
                                    onChange: (e) => onFormUpdate(e.target)
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
                                    onChange: (e) => onFormUpdate(e.target)
                                }}
                            />
                        </CardBody>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                        <CardBody>
                            <h3>Редактируемая информация:</h3>
                            <Editor
                                data={defaultData}
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
        </div>
    )
}