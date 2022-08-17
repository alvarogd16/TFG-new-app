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

const DesignScreen = ({ subState, setSubState, circuit, setCircuit }) => {
    const [warning, setWarning] = useState('')
    const [nodeToEdit, setNodeToEdit] = useState()
    const editNode = useCallback((node) => {
        setNodeToEdit(node)
        setSubState('editNode')
    })
  
    return (
        <>
            {subState === 'Añadir bloque' 
                && <AddNode
                    circuit={circuit}
                    setCircuit={setCircuit}
                ></AddNode>}

            {subState === 'Create block'
                && <CreateBlock
                    cancel={() => setSubState('')}
                ></CreateBlock>
            }

            {(!subState || subState === 'Añadir bloque' || subState === 'Add IO') &&
            <div className={'design-flow-container' + (subState==='Añadir bloque' || subState === 'Add IO' ? ' design-flow-container-with-menu' : '')}>
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
                cancel={() => setSubState('')}
            ></EditBlock>}

            {subState === 'Add IO' &&
            <AddIO></AddIO>}
        </>)
}

export default DesignScreen