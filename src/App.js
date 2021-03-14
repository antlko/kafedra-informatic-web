import './App.css';
import EditorJs from 'react-editor-js';
import React from "react";
import {EDITOR_JS_TOOLS} from "./scripts/Editor";

function App() {

    return (
        <div className="App">
            <EditorJs tools={EDITOR_JS_TOOLS}
                      data={{
                          blocks: [
                              {
                                  type: "paragraph",
                                  data: {
                                      text:
                                          "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
                                  }
                              },
                          ],
                      }}/>
        </div>
    );
}

export default App;
