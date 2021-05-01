import React from "react";
import {Editor} from "../../Editor";
import {EDITOR_JS_TOOLS} from "../../Scripts/Editor";
import {Container} from "@material-ui/core";

const defaultData = {
    blocks: [
        {
            type: "paragraph",
            data: {
                text:
                    "Hey. Meet <a href=\"https://github.com/editor-js\">ready-to-use Blocks</a> the new Editor. On this page you can see it in action — try to edit this text."
            }
        },
        {
            "type": "image",
            "data": {
                "file": {
                    "url": "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg"
                },
                "caption": "Roadster // tesla.com",
                "withBorder": false,
                "withBackground": false,
            }
        }
    ],
}

export const AdminPage = () => {

    return (
        <div>
            <Container>
                <h1>Admin Page</h1>
                <Editor
                    data={defaultData}
                    tools={EDITOR_JS_TOOLS}
                    holder={"editor"}
                    readOnly={false}
                />
            </Container>
        </div>
    )
}