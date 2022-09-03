import React, { useCallback, useEffect, useState } from 'react'
import ReactFlow, { applyNodeChanges, applyEdgeChanges, Background, addEdge, ReactFlowProvider } from 'react-flow-renderer'
import { post } from '../../api/api'
import BlockTypeNode from './blockTypeNode'

const defaultEdgeOptions = {
    type: 'smoothstep'
}
const nodeTypes = { blockType: BlockTypeNode }

const DesignCircuit = ({ circuit, setCircuit, editNode, warning, setWarning }) => {

    useEffect(() => {
        // TO CHANGE Horrible performance
        let areTwoNodesWithSameLabel = false
        if(circuit) {
            for(let i = 0; i < circuit.nodes.length-1; i++) {
                for(let j = i+1; j < circuit.nodes.length; j++) {
                    if(circuit.nodes[i].data.label === circuit.nodes[j].data.label)
                        areTwoNodesWithSameLabel = true
                }
            }
            if(areTwoNodesWithSameLabel)
                setWarning('Cuidado hay dos nodos con el mismo nombre')
            else
                setWarning('')
        }
    }, [circuit])

    /**
     * The explanation of the newEdges is in the onNodesChange function
     */
    const setNodes = useCallback((newNodes, newEdges) => {
        // console.log('nodes', newNodes)
        const isMoving = newNodes.some((node) => node?.dragging === true)
        if(!isMoving) {
            console.log('posting...', newNodes)
            post('/state/circuit/nodes', newNodes)
        }

        const newCircuit = {...circuit}
        newCircuit.nodes = newNodes
        if(newEdges) newCircuit.edges = newEdges
        setCircuit(newCircuit)
    }, [circuit])

    const setEdges = useCallback((newEdges) => {
        post('/state/circuit/edges', newEdges)
        const newCircuit = {...circuit}
        newCircuit.edges = newEdges
        setCircuit(newCircuit)
    }, [circuit])

    const onNodesChange = useCallback((changes) => {
        /**
         * When you delete a block with edges sometimes it dont update well.
         * Flow dont have time to update and some edges become zombies
         * We remove it manually in case this last happend
         */
        const nodeRemove = changes.find(node => node.type === 'remove')
        let newEdges = undefined
        if(nodeRemove) {
            newEdges = circuit.edges.filter(edge => !(edge.source === nodeRemove.id || edge.target === nodeRemove.id))
        }

        setNodes(applyNodeChanges(changes, circuit.nodes), newEdges)
    }, [setNodes])

    const onEdgesChange = useCallback((changes) => {
        // console.log('edgedChange')
        setEdges(applyEdgeChanges(changes, circuit.edges))
    }, [setEdges])

    const onConnect = useCallback((connection) => {
        const nodeSrc = circuit.nodes.find(node => node.id === connection.source)
        const nodeDest = circuit.nodes.find(node => node.id === connection.target)

        const portSrc = nodeSrc.data.ports.find(p => p.name === connection.sourceHandle)
        const portDest = nodeDest.data.ports.find(p => p.name === connection.targetHandle)

        console.log(portSrc.size, portDest.size)
        if(portSrc.size !== portDest.size)
            return
            // connection.style = { stroke: 'red' }
        else if(portSrc.size > 1)
            connection.style = { strokeWidth: 3 }
        if(nodeSrc) connection.data = { sourceLabel: nodeSrc.data.label }
        console.log(connection)
        setEdges(addEdge(connection, circuit.edges))
    }, [setEdges])

    return <ReactFlow 
                nodes={circuit?.nodes} 
                edges={circuit?.edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeDoubleClick={(event, node) => editNode(node)}
                defaultEdgeOptions={defaultEdgeOptions}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background variant="dots" gap={30} size={1} />
            </ReactFlow>
}   

export default DesignCircuit