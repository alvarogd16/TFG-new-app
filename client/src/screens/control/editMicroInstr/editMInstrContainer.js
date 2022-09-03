import { useEffect, useState } from "react"

const isValidMInstr = (mInstr, mInstrFormat) => {
    if(!mInstr?.name) return false
    if(!mInstr?.signals) return false

    for(let i = 0; i < mInstrFormat.length; i++) {
        const signal = mInstr.signals.find(sig => sig.name === mInstrFormat[i].name)
        if(!signal || !signal?.value?.value)
            return false
    }

    return true
}

const EditMInstrContainer = ({ mInstr, mInstrFormat, saveMInstr, cancelMInstr }) => {
    const [newMicroInstr, setNewMicroInstr] = useState(mInstr)

    useEffect(() => {
        if(newMicroInstr === undefined)
            setNewMicroInstr({})
    }, [])

    const setName = ({ target }) => {
        const newMicroInstrCopy = {...newMicroInstr}
        newMicroInstrCopy.name = target.value
        setNewMicroInstr(newMicroInstrCopy)
    }

    const setSignal = ({ target }) => {
        const newSignal = { name: target.name, value: {value: target.value} }
        const newMicroInstrCopy = {...newMicroInstr}
        const newSignals = newMicroInstrCopy?.signals ? [...newMicroInstrCopy.signals] : []

        const signalIdx = newSignals.findIndex(sig => sig.name === target.name)
        if(signalIdx !== -1)
            newSignals[signalIdx] = newSignal
        else
            newSignals.push(newSignal)
        newMicroInstrCopy.signals = newSignals
        setNewMicroInstr(newMicroInstrCopy)
    }

    const save = () => {
        if(!isValidMInstr(newMicroInstr, mInstrFormat)) {
            console.log('mala mInstr')
            return
        }
        saveMInstr(newMicroInstr)
    }

    return <div className='edit-mInstr-edit'>
        <div className='edit-mInstr-edit-form'>
            <div className='edit-mInstr-edit-item-name '>
                <p>Name</p>
                <input
                    defaultValue={newMicroInstr?.name || ''}
                    onChange={setName}
                    type='text'
                    maxLength={20}
                ></input>
            </div>
            {mInstrFormat.map(sig => <div key={sig.name} className='edit-mInstr-edit-item-signals'>
                <p>{sig.parentNode + ' ' + sig.name}</p>
                <input 
                    defaultValue={newMicroInstr?.signals?.find(_sig => _sig.name === sig.name)?.value?.value || ''}
                    onChange={setSignal}
                    name={sig.name}
                    type='text'
                    maxLength={sig.size}
                    size={sig.size}
                    // pattern={'[01xX]+'}
                ></input>
            </div>)}
        </div>
        <div className='edit-mInstr-edit-buttons'>
            <button className='edit-mInstr-edit-save' onClick={save}>SAVE</button>
            <button className='edit-mInstr-edit-cancel' onClick={cancelMInstr}>CANCEL</button>
        </div>
    </div>
}

export default EditMInstrContainer