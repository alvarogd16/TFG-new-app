import { useEffect, useState } from "react"

const NodeCard = ({ node, addPort, removePort, defaultSignals }) => {
    const [checkState, setCheckState] = useState()

    useEffect(() => {
        // Inicialize checkState with ports
        let auxState = {}
        node.data.ports
            .filter(port => port.type === 'in')
            .forEach(port => {
                auxState[port.name] = defaultSignals.some(sig => sig.name === port.name)
            })
        setCheckState(auxState)
    }, [])

    const onChange = ({ target}) => {
        if(checkState[target.name])
            removePort(node.data.label, target.name)
        else
            addPort(node.data.label, target.name, target.size)

        setCheckState(state => ({ ...state, [target.name]: !state[target.name]}))
    }

    return <div className='node-card'>
        <h1>{node.data.label}</h1>
        <p className='node-card-subtitle'>{node.data.moduleName}</p>
        <div className='node-card-horizontal-line'></div>
        <div className='node-card-ports'>
            {node.data.ports
                .filter(port => port.type === 'in')
                .map(p => <div key={p.name} className='node-card-port'>
                    <p>{p.name}</p>
                    <input 
                        type='checkbox'
                        name={p.name}
                        size={p.size}
                        checked={checkState?.[p.name] || false}
                        onChange={onChange}
                    ></input>
                </div>)}
        </div>
    </div>
}

export default NodeCard