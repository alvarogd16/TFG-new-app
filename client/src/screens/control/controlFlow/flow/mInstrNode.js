import { Handle, Position } from "react-flow-renderer"

const MInstrNode = ({ data }) => {
    return <>
        <Handle type='target' position={Position.Top}></Handle>
        <p>{data.mInstr.name}</p>
        <Handle type='source' position={Position.Bottom}></Handle>
    </>
}

export default MInstrNode