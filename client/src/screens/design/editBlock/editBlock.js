import { useEffect, useState } from "react"
import './style.css'
import PortsContainer from "./portsContainer"
import { getDataFromFile, createNewBlock, updateNode } from "./utils"
import Translations from "../../../utils/translations/translation"

const EditBlock = ({ circuit, setCircuit, node, file, cancel }) => {
    const [blockInfo, setBlockInfo] = useState(node?.data)

    const [blockLabel, setBlockLabel] = useState(node?.data?.label || '')
    const [blockWidth, setBlockWidth] = useState(node?.data?.size?.width || '4')
    const [blockHeight, setBlockHeight] = useState(node?.data?.size?.height || '4')
    const [blockPorts, setBlockPorts] = useState(node?.data?.ports || [])

    useEffect(() => {
        if(blockInfo === undefined) {
            getDataFromFile(
                file,
                setBlockInfo, 
                setBlockLabel, 
                setBlockWidth, 
                setBlockHeight, 
                setBlockPorts
            )
        }
    }, [])

    const handleSubmit = (event) => {
        if(node === undefined)
            createNewBlock(blockInfo, blockLabel, blockWidth, blockHeight, blockPorts)
        else
            updateNode(circuit, setCircuit, node, blockLabel, blockWidth, blockHeight, blockPorts)

        // Close the window
        cancel()
        event.preventDefault()
    }

    return <>
    {blockInfo &&
    <div className='edit-block-container'>
        <h1>{blockInfo?.moduleName}</h1>
        <form onSubmit={handleSubmit}>
            <div className='edit-block-label'>
                <label>{Translations['NAME']}</label>
                <input 
                    type='text'
                    value={blockLabel} 
                    onChange={e => setBlockLabel(e.target.value)}
                />
            </div>
            <div className='edit-block-width'>
                <label>{Translations['WIDTH']}</label>
                <input 
                    type='number' 
                    min='2' 
                    max = '10' 
                    value={blockWidth}
                    onChange={e => setBlockWidth(e.target.value)}
                />
            </div>
            <div className='edit-block-height'>
                <label>{Translations['HEIGHT']}</label>
                <input 
                    type='number' 
                    min='2' 
                    max = '10' 
                    value={blockHeight}
                    onChange={e => setBlockHeight(e.target.value)}
                />
            </div>


            {/* <h2>Parameters</h2>
            {blockInfo.parameters.map(param => <p key={param.name}>{param.name + ' = ' + param.value.value}</p>)} */}

            <PortsContainer
                blockPorts={blockPorts}
                setBlockPorts={setBlockPorts}
            />
            <button className='edit-block-submit' type='submit' value='Submit'>{Translations['SAVE']}</button>
            <button className='edit-block-cancel' onClick={cancel} value='Cancel'>{Translations['CANCEL']}</button>
        </form>
    </div>
    }
    </>
}

export default EditBlock