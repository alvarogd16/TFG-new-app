import { useState } from 'react'
import ChooseFile from './chooseFile'
import EditBlock from '../editBlock/editBlock'

const CREATE_STATES = {
    chooseFile: 'chooseFile',
    editBlock: 'editBlock'
}

const CreateBlock = ({ cancel }) => {
    const [createState, setCreateState] = useState(CREATE_STATES.chooseFile)
    const [file, setFile] = useState('')

    return <>
        {createState === CREATE_STATES.chooseFile
        && <ChooseFile setFile={setFile} nextState={() => setCreateState(CREATE_STATES.editBlock)}></ChooseFile>}
        {createState === CREATE_STATES.editBlock
        && <EditBlock 
                file={file}
                cancel={cancel}
            ></EditBlock>}
    </>
}

export default CreateBlock