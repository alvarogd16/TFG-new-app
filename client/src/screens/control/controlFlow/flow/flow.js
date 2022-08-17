import { useState, useCallback, useEffect } from "react"
import ReactFlow, { Background, applyNodeChanges, applyEdgeChanges, addEdge, useEdges } from "react-flow-renderer"
import MInstrNode from "./mInstrNode"
import { post } from "../../../../api/api"

const nodeTypes = {
    mInstrNode: MInstrNode
}

const Flow = ({ flow, setFlow, selectEdge }) => {

    /**
     * The explanation of the newEdges is in the onNodesChange function
     */
    const setNodes = useCallback((newNodes, newEdges) => {
        const isMoving = newNodes.some((node) => node?.dragging === true)
        if(!isMoving) {
            post('/state/control/flow/nodes', newNodes)
        }

        const newFlow = {...flow}
        newFlow.nodes = newNodes
        if(newEdges) newFlow.edges = newEdges
        setFlow(newFlow)
    }, [flow])

    const setEdges = useCallback((newEdges) => {
        post('/state/control/flow/edges', newEdges)
        const newFlow = {...flow}
        newFlow.edges = newEdges
        setFlow(newFlow)
    }, [flow])


    const onNodesChange = useCallback((changes) => {
        /**
         * When you delete a block with edges sometimes it dont update well.
         * Flow dont have time to update and some edges become zombies
         * We remove it manually in case this last happend
         */
        const nodeRemove = changes.find(node => node.type === 'remove')
        let newEdges = undefined
        if(nodeRemove) {
            newEdges = flow.edges.filter(edge => !(edge.source === nodeRemove.id || edge.target === nodeRemove.id))
        }

        setNodes(applyNodeChanges(changes, flow.nodes), newEdges)
    }, [setNodes])

    const onEdgesChange = useCallback((changes) => {
        setEdges(applyEdgeChanges(changes, flow.edges))
    }, [setEdges])
    
    const onConnect = useCallback(
        (connection) => {
            connection.animated = true
            connection.data = { isConditinal: false }
            if(connection.source.startsWith('conditional')) {
                connection.label = 'default'
                connection.data = { isConditinal: true }
            }
            setEdges(addEdge(connection, flow.edges))
        },
        [setEdges]
    )

    return <div className='flow-container'>
        <ReactFlow
            nodes={flow.nodes}
            edges={flow.edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgeClick={selectEdge}
            nodeTypes={nodeTypes}
            fitView
        >
            <Background variant="dots" gap={30} size={1} />
        </ReactFlow>
    </div>
}

export default Flow