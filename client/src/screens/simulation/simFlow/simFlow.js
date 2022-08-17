import ReactFlow, { Background } from "react-flow-renderer"
import BlockTypeNode from "../../design/blockTypeNode"

const nodeTypes = { blockType: BlockTypeNode }

const SimFlow = ({ circuit, setCircuit }) => {
    return <ReactFlow 
                nodes={circuit?.nodes} 
                edges={circuit?.edges}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background variant="dots" gap={30} size={1} />
            </ReactFlow>
}

export default SimFlow