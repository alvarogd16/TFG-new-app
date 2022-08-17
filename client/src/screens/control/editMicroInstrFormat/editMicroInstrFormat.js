import { useEffect, useState } from "react"
import { post } from "../../../api/api"
import MicroInstrFormatContainer from "./microInstrFormatContainer"
import NodesContainer from "./nodesContainer"

const EditMicroInstrFormat = ({ circuit, control, setControl, next }) => {
    const [microInstrFormat, setMicroInstrFormat] = useState(control.mInstrFormat)

    const save = () => {
        const newControl = {...control}
        newControl.mInstrFormat = microInstrFormat
        setControl(newControl)
        post('/state/control/mInstrFormat', microInstrFormat)
        next()
    }

    return <>
        <NodesContainer
            nodes={circuit.nodes} 
            microInstrFormat={microInstrFormat} 
            setMicroInstrFormat={setMicroInstrFormat}
        ></NodesContainer>
        <div className='control-word-container'>
            <MicroInstrFormatContainer microInstrFormat={microInstrFormat}></MicroInstrFormatContainer>
        </div>
        <button className='control-word-save' onClick={save}>SAVE</button>
    </>
}

export default EditMicroInstrFormat