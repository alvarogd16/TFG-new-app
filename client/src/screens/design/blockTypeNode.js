import { useEffect, useState } from "react"
import { Handle, Position, useUpdateNodeInternals } from "react-flow-renderer"

const STEP_SIZE = 20

const getStyle = (dir, dirIdx, type) => {
    const style = {}
    const nPixels = dirIdx * STEP_SIZE + 'px'
    switch(dir) {
        case Position.Top:
        case Position.Bottom:
            style.left = nPixels
            break
        case Position.Left:
        case Position.Right:
            style.top = nPixels
            break  
    }

    style.backgroundColor = type === 'in' ? '#89CFF0' : '#ff6ec7'
    return style
}

const isValidConnection = (connection) => {
    console.log(connection)
    return true
}

const onConnect = (connection) => {
    console.log('c', connection)
}

const HandleExtension = ({ type, size, ...props}) => {
    // TODO
    // const [connections, setConnections] = useState(0)

    const onConnect = () => {
        // console.log('connection', props.id)
        // setConnections(connections+1)
    }

    const isValidConnection = (connection) => {
        // console.log(connection)
        return true
    }

    return (
        <Handle 
            id={props.id}
            type={type}
            position={props.position}
            style={props.style}
            onMouseOver={props.onMouseOver}
            onMouseLeave={props.onMouseLeave}
            isValidConnection={isValidConnection}
            onConnect={onConnect}
        ></Handle>
    )
}

const getHandles_2 = (ports, handleFocusIdx, setHandleFocusIdx) => {
    return ports.map((p, idx) =>
        <HandleExtension
            key={idx}
            id={p.name}
            type={p.type === 'in' ? 'target' : 'source'}
            size={p.size}
            position={p.direction}
            style={getStyle(p.direction, p.directionIdx, p.type)}
            onMouseOver={() => setHandleFocusIdx(p.name)}
            onMouseLeave={() => setHandleFocusIdx('')}
        >
            {handleFocusIdx === p.name && <div className='handle-label'>{p.name + ' ' + p.size + 'b'}</div>}
        </HandleExtension>
    )
}

const getHandles = (ports, handleFocusIdx, setHandleFocusIdx) => {
    return ports.map((p, idx) =>
        <Handle
            key={idx}
            id={p.name}
            type={p.type === 'in' ? 'target' : 'source'}
            position={p.direction}
            style={getStyle(p.direction, p.directionIdx, p.type)}
            onMouseOver={() => setHandleFocusIdx(p.name)}
            onMouseLeave={() => setHandleFocusIdx('')}
            // isValidConnection={isValidConnection}
            // onConnect={onConnect}
        >
            {handleFocusIdx === p.name && <div className='handle-label'>{p.name + ' ' + p.size + 'b'}</div>}
        </Handle>
    )
}

const BlockTypeNode = ({ data, selected }) => {
    const [handleFocusIdx, setHandleFocusIdx] = useState('')

    // useEffect(() => console.log('render'), [])
    useEffect(() => data?.isValid && data.isValid(),[])

    return (
        <div className={'block-type-container' + (selected ? ' block-type-node-selected' : '')}>
            <div className='block-type-handles'>
                {data.ports && getHandles(data.ports, handleFocusIdx, setHandleFocusIdx)}
            </div>
            <div className='block-type-label-container'>
                {data.label && <p id='label' title={data.label} className='block-type-label'>{data.label}</p>}
            </div>
        </div>
    )
}

export default BlockTypeNode