import React, { useEffect, useState } from 'react'
import EditMicroInstrFormat from './editMicroInstrFormat/editMicroInstrFormat'
import EditMInstrScreen from './editMicroInstr/editMInstrScreen'
import ControlFlow from './controlFlow/controlFlow'
import './control.css'

const CONTROL_STATES = {
    createMicroInstrFormat: 'mInstrFormat',
    editMicroInstructions: 'editMInstr',
    controlFlow: 'controlFlow'
}

const ControlScreen = ({ control, setControl, circuit, headerState, setHeaderState }) => {
    useEffect(() => setHeaderState({ state: '' }), [])
    const subState = headerState.state
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
                    next={() => setHeaderState({ state: CONTROL_STATES.editMicroInstructions })}
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