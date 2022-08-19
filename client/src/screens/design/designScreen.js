import React, { useCallback, useEffect, useState } from 'react'
import BlockTypeNode from './blockTypeNode'
import './blockTypeNode.css'
import './design.css'
import AddNode from './addNode/addNode'
import DesignCircuit from './designCircuit'
import CreateBlock from './createBlock/createBlock'
import EditBlock from './editBlock/editBlock'
import AddIO from './addIO/addIO'

const STEP_SIZE = 20

const defaultEdgeOptions = {
    type: 'smoothstep'
}

const nodeTypes = { blockType: BlockTypeNode }

const DesignScreen = ({ headerState, setHeaderState, circuit, setCircuit }) => {
    const [warning, setWarning] = useState('')
    const [nodeToEdit, setNodeToEdit] = useState()
    const editNode = useCallback((node) => {
        setNodeToEdit(node)
        setHeaderState({ state: 'editNode' })
    })
    const subState = headerState?.state;
  
    return (
        <>
            {subState === 'addNode' 
                && <AddNode
                    circuit={circuit}
                    setCircuit={setCircuit}
                ></AddNode>}

            {subState === 'createBlock'
                && <CreateBlock
                    cancel={() => setHeaderState({state: ''})}
                ></CreateBlock>
            }

            {(!subState || subState === 'addNode' || subState === 'addIO') &&
            <div className={'design-flow-container' + (subState==='addNode' || subState === 'addIO' ? ' design-flow-container-with-menu' : '')}>
                <DesignCircuit
                    circuit={circuit}
                    setCircuit={setCircuit}
                    warning={warning}
                    setWarning={setWarning}
                    editNode={editNode}
                ></DesignCircuit>
                {warning && 
                <div className='design-warning'>
                    <div className='design-warning-icon'></div>
                    <div className='design-warning-text'>{warning}</div>    
                </div>}
            </div>}

            {subState === 'editNode' && 
            <EditBlock
                circuit={circuit}
                setCircuit={setCircuit}
                node={nodeToEdit}
                cancel={() => setHeaderState({state: ''})}
            ></EditBlock>}

            {subState === 'addIO' &&
            <AddIO></AddIO>}
        </>)
}

export default DesignScreen