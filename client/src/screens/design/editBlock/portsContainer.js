const portSelectValues = [
    'top',
    'bottom',
    'left',
    'right'
]

const Port = ({ port, onChange }) => {
    return <div>
        <p>{port.name}</p>
        <select value={port.direction} onChange={onChange}>
            {portSelectValues.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <label>Direction index</label>
        <input type='number' value={port.directionIdx} onChange={onChange}></input>
    </div>
}

const PortsContainer = ({ blockPorts, setBlockPorts }) => {
    return <>
        <div className='edit-block-inputs'>
        <h2>Inputs</h2>
        {blockPorts
            .filter(port => port.type === 'in')
            .map(input => 
                <Port 
                    key={input.name} 
                    port={input}
                    onChange={event => {
                        const newPortIdx = blockPorts.findIndex(port => port.name === input.name)
                        if(newPortIdx !== -1) {
                            const newInput = {...input}
                            if(event.target.tagName === 'SELECT')
                                newInput.direction = event.target.value
                            else
                                newInput.directionIdx = event.target.value

                            const newPorts = [...blockPorts]
                            newPorts[newPortIdx] = newInput
                            setBlockPorts(newPorts)
                        }
                    }}
                />
        )}
    </div>
    <div className='edit-block-outputs'>
        <h2>Outputs</h2>
        {blockPorts
            .filter(port => port.type === 'out')
            .map(output => 
                <Port 
                    key={output.name} 
                    port={output}
                    onChange={event => {
                        const newPortIdx = blockPorts.findIndex(port => port.name === output.name)
                        if(newPortIdx !== -1) {
                            const newOutput = {...output}
                            if(event.target.tagName === 'SELECT')
                                newOutput.direction = event.target.value
                            else
                                newOutput.directionIdx = event.target.value

                            const newPorts = [...blockPorts]
                            newPorts[newPortIdx] = newOutput
                            setBlockPorts(newPorts)
                        }
                    }}
                />
        )}
    </div>
    </>
}

export default PortsContainer