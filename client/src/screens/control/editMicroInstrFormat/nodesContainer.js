import { useEffect } from "react"
import NodeCard from "./nodeCard"

const NodesContainer = ({ nodes, microInstrFormat, setMicroInstrFormat }) => {
    const removePort = (nodeId, portName) => {
        const controlPortIdx = microInstrFormat
                                .findIndex(controlPort => controlPort.parentNode === nodeId 
                                                            && controlPort.name === portName)
        if(controlPortIdx === -1) return

        const newControl = [...microInstrFormat]
        newControl.splice(controlPortIdx, 1)    
        setMicroInstrFormat(newControl)
    }

    const addPort = (nodeId, portName, portSize) => {
        const newControl = [...microInstrFormat]
        newControl.push(           {
            parentNode: nodeId,
            name: portName,
            size: portSize
        })
        setMicroInstrFormat(newControl)
    }
    return <div className='nodes-container'>
        {nodes.map(node => <NodeCard 
                                key={node.id} 
                                node={node}
                                defaultSignals={microInstrFormat.filter(mI => mI.parentNode === node.data.label)}
                                addPort={addPort}
                                removePort={removePort}
                            ></NodeCard>)}
    </div>
}

export default NodesContainer