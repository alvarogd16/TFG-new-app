import { useCallback } from "react"

const createNode = (data, type) => {
    const node = {
        id: (type === 'conditional' ? `${type} ` : '') + data.name + '_' + Date.now(),
        position: { x: 0, y: 0 },
        type: 'default',
        data: { 
            label: (type === 'conditional' ? data.parentNode + ' ' : '') + data.name,
            type: type
        },
        className: type === 'm-instr' ? 'node-m-instr' : 'node-conditional'
    }
    return node
}

const SelectItem = ({ mInstructions, conditionalSignals, flow, setFlow }) => {
    const addNode = useCallback((newNode) => {
        const newFlow = {...flow}
        newFlow.nodes = flow.nodes.map(p => p)
        newFlow.nodes.push(newNode)
        setFlow(newFlow)
    }, [setFlow])

    return <div className='select-item'>
        <div className='select-item-mInstr-container'>
            <p className='select-item-title'>Micro instr</p>
            <div className='select-item-mInstr'>
                {mInstructions && 
                    mInstructions.map(mI => <button 
                                                key={mI.name}
                                                onClick={() => addNode(createNode(mI, 'm-instr'))}
                                            >{mI.name}</button>)}
            </div>
        </div>
        <div className='select-item-cond-sig-container'>
            <p className='select-item-title'>Conditional signals</p>
            <div className='select-item-mInstr'>
                {conditionalSignals && 
                    conditionalSignals.map(cS => <button 
                                                    key={cS.parentNode + cS.name}
                                                    onClick={() => addNode(createNode(cS, 'conditional'))}
                                                >{cS.parentNode + ' ' + cS.name}</button>)}
            </div>
        </div>
    </div>
}

export default SelectItem