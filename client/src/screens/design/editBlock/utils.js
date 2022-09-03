import { get, post, put } from "../../../api/api"

/**
 * @param {Object} moduleInfo 
 * @returns An array of ports (inputs and outputs together) with more information
 */
 const getPortsFromMooduleInfo = (moduleInfo) => {
    const inputs = moduleInfo?.inputs
                    .map(input => ({ 
                        name: input.name, 
                        direction: 'left', 
                        directionIdx: 0, 
                        size: input.size || '1',
                        type: 'in' 
                    }))
    return inputs
            .concat(moduleInfo?.outputs
            .map(output => ({
                name: output.name,
                direction: 'right', 
                directionIdx: 0,
                size: output.size || '1',
                type: 'out' 
            })))
}

export const getDataFromFile = (file, 
                        setBlockInfo, 
                        setBlockLabel, 
                        setBlockWidth, 
                        setBlockHeight, 
                        setBlockPorts) => {
    get('/vFile/' + file)
        .then(res => res.json())
        .then(res => {
            setBlockInfo(res)
            setBlockLabel(res?.label || res?.moduleName?.toUpperCase())
            res?.size?.width && setBlockWidth(res?.size?.width)
            res?.size?.height && setBlockHeight(res?.size?.heigh)

            setBlockPorts(
                getPortsFromMooduleInfo(res)
            )
        })
}

export const createNewBlock = (blockInfo, blockLabel, blockWidth, blockHeight, blockPorts) => {
    const newBlock = {
        id: blockInfo.moduleName,
        moduleName: blockInfo.moduleName,
        hash: blockInfo.hash,
        parameters: blockInfo.parameters,
        label: blockLabel,
        size: {
            width: blockWidth,
            height: blockHeight
        },
        ports: blockPorts
    }

    post('/block', newBlock)
}

const STEP_SIZE = 20

export const updateNode = (circuit, setCircuit, node, blockLabel, blockWidth, blockHeight, blockPorts) => {
    const newNode = { ...node }
    const newData = { ...node.data }
    
    newData.label = blockLabel
    newData.size = {
        width: blockWidth,
        height: blockHeight
    }
    newData.ports = blockPorts
    newNode.data = newData
    newNode.style = {
        width: blockWidth * STEP_SIZE + 'px',
        height: blockHeight * STEP_SIZE + 'px'
    }
    
    const nodeIdx = circuit.nodes.findIndex(n => n.id === node.id)
    if(nodeIdx !== -1) {
        const newCircuit = {...circuit}
        newCircuit.nodes[nodeIdx] = newNode
        setCircuit(newCircuit)
    }
}