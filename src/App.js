import './App.css';
import React from "react";
import {EDITOR_JS_TOOLS} from "./Scripts/Editor";
import {Editor} from "./Editor";

const defaultData = {
    blocks: [
        {
            type: "paragraph",
            data: {
                text:
                    "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
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
                "stretched": true
            }
        }
    ],
}

function App() {
    return (
        <div className="App">
            <Editor
                data={defaultData}
                tools={EDITOR_JS_TOOLS}
                holder={"editor"}
                readOnly={false}
            />
            <Editor
                data={defaultData}
                tools={EDITOR_JS_TOOLS}
                holder={"editor"}
                readOnly={true}
            />
        </div>
    );
}

export default App;
