import React, { useCallback, useEffect, useState } from 'react'
import { get } from '../../../api/api'

const STEP_SIZE = 20

const createNodeFromBlock = (block) => {
    const node = {
        id: block.moduleName + '_' + Date.now(),
        type: 'blockType',
        position: { x: 0, y: 0 },
        style: {
            width: block.size.width * STEP_SIZE + 'px',
            height: block.size.height * STEP_SIZE + 'px'
        },
        className: 'block-type-node',
        data: {
            isValid: () => console.log('hola'),
            ...block
        }
    }
    return node
}

const AddNode = ({ circuit, setCircuit }) => {
    const [blocksAvailables, setBlocks] = useState([])

    const addBlockToCircuit = useCallback((block) => {
        const newCircuit = {...circuit}
        newCircuit.nodes = circuit.nodes.map(p => p) // Its necesary to create new node array
        newCircuit.nodes.push(createNodeFromBlock(block))
        setCircuit(newCircuit)
    }, [circuit])

    useEffect(() => {
        // GET request
        get('/blocks')
            .then(res => res.json())
            .then(res => setBlocks(res))
            .catch(err => console.error(err))
    }, [])

    return <div className='design-submenu-container'>
        <p className='block-list-title'>Blocks</p>
        <div className='block-list'>
            {blocksAvailables.map((block, idx) =>
            <div
                className='block-list-block'
                key={block.moduleName + idx}
            >
                <button
                    className='block-list-add'
                    onClick={() => {
                        addBlockToCircuit(block)
                    }}
                >
                    {block.moduleName}
                </button>
                {/* <div className='block-list-line'></div> */}
                {/* <button
                    className='block-list-delete'
                >-
                </button> */}
            </div>
            )}
        </div>
    </div>
}

export default AddNode