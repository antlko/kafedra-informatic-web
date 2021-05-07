import {YouTubeComponent} from "../YouTube/YouTubeComponent";

const componentSet = {
    "YouTubeComponent": YouTubeComponent
}

export default function RenderComponent(name, props) {
    const component = componentSet[name]
    if (component === undefined) {
        return <div>Undefined Component</div>
    }
    return component(props)
}