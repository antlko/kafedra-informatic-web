import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import Paragraph from "editorjs-paragraph-with-alignment"

export const EDITOR_JS_TOOLS = {
    embed: Embed,
    table: Table,
    marker: Marker,
    list: List,
    warning: Warning,
    linkTool: LinkTool,
    image: {
        class: Image,
        config: {
            endpoints: {
                byFile: process.env.REACT_APP_API_HOST + 'uploadFile', // Your backend file uploader endpoint
            }
        }
    },
    raw: Raw,
    header: Header,
    quote: Quote,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
    },
};