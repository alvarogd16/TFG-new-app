import { useState, useEffect, useCallback } from "react"
import SelectItem from "./selectItem"
import Flow from "./flow/flow"

const getConditionalSignals = (circuit) => {
    const signals = []
    circuit.nodes.forEach(node => 
        node.data.ports.forEach(port => { if(port.type === 'out') signals.push({...port, parentNode: node.data.label})})
    )
    return signals
}

const SelectCondition = ({ condition, setCondition, close }) => {
    const onChange = ({ target }) => {
        const newCondition = {...condition}
        newCondition.value = target.value
        setCondition(newCondition)
    }
    return <div className='select-condition'>
        <label>{condition.name}</label>
        <input type='text' defaultValue={condition.value} onChange={onChange}></input>
        <button onClick={close}>CLOSE</button>
    </div>
}

const ControlFlow = ({ control, setControl, circuit }) => {
    const [conditionalSignals, setConditionalSignals] = useState()
    const [selectCondition, setSelectCondition] = useState()

    useEffect(() => {
        setConditionalSignals(getConditionalSignals(circuit))
    }, [])

    const setFlow = useCallback((newFlow) => {
        const newControl = {...control}
        newControl.flow = newFlow
        // console.log('newFlow', newControl.flow)
        setControl(newControl)
    }, [control])
    
    return <div className='control-flow-container'>
        <SelectItem
            mInstructions={control.mInstructions}
            conditionalSignals={conditionalSignals}
            flow={control.flow}
            setFlow={setFlow}
        ></SelectItem>
        <Flow 
            flow={control.flow}
            setFlow={setFlow}
            selectEdge={(event, edge) => {
                if(edge.data.isConditinal) {
                    setSelectCondition({ name: edge.target, value: edge.label})
                }
            }}
        ></Flow>
        {selectCondition && 
        <SelectCondition
            condition={selectCondition}
            setCondition={(newCondition) => {
                setSelectCondition(newCondition)
                const newFlow = {...control.flow}
                const newEdgeIdx = newFlow.edges.findIndex(edge => edge.target === newCondition.name)
                const newEdge = {...newFlow.edges[newEdgeIdx]}
                newEdge.label = newCondition.value
                newFlow.edges = control.flow.edges.map(edge => edge)
                newFlow.edges[newEdgeIdx] = newEdge
                setFlow(newFlow)
            }}
            close={() => setSelectCondition('')}
        ></SelectCondition>}
    </div>
}

export default ControlFlow