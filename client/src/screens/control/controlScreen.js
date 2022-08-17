import React, { useEffect, useState } from 'react'
import EditMicroInstrFormat from './editMicroInstrFormat/editMicroInstrFormat'
import EditMInstrScreen from './editMicroInstr/editMInstrScreen'
import ControlFlow from './controlFlow/controlFlow'
import './control.css'

const CONTROL_STATES = {
    createMicroInstrFormat: 'μInstr format',
    editMicroInstructions: 'edit μInstr',
    controlFlow: 'controlFlow'
}

const ControlScreen = ({ control, setControl, circuit, subState }) => {
    const [controlState, setControlState] = useState(subState)

    // useEffect(() => {
    //     console.log(subState)
    // }, [subState])

    return (
        <>
            {!subState &&
                <ControlFlow
                    control={control}
                    setControl={setControl}
                    circuit={circuit}
                ></ControlFlow>
            }
            {subState === CONTROL_STATES.createMicroInstrFormat &&
                <EditMicroInstrFormat
                    control={control}
                    setControl={setControl}
                    circuit={circuit}
                    next={() => setControlState(CONTROL_STATES.editMicroInstructions)}
                ></EditMicroInstrFormat>}
            {subState === CONTROL_STATES.editMicroInstructions &&
                <EditMInstrScreen
                    control={control}
                    setControl={setControl}
                ></EditMInstrScreen>}
        </>
    )
}

export default ControlScreen