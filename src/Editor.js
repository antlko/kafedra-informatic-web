import React from 'react'
import EditorJS from "@editorjs/editorjs";

export const Editor = (config) => {
    const {data} = config;

    const [update] = useEditor(config);

    React.useEffect(() => {
        update(data);
    }, [data, update])

    return <div id={config.holder}/>
}

const useEditor = (config) => {
    const editor = useEditorInstance(config);

    const update = React.useCallback((data) => {
        editor?.render?.(data);
    }, [editor])

    return [update, editor]
}

const useEditorInstance = (config) => {
    const [editor, setEditor] = React.useState();

    React.useEffect(() => {
        const editorInstance = new EditorJS({
            ...config,
            onReady() {
                setEditor(editorInstance);
                config?.onReady?.();
            }
        });

        return () => editorInstance.destroy?.();
    }, [setEditor, config])

    return editor;
}