import React, { useCallback, useEffect } from 'react'
import APP_STATES from '../states/appStates'
import './style.css'
import DesignScreen from './design/designScreen'
import ControlScreen from './control/controlScreen'
import ISAScreen from './isa/isaScreen'
import SimulationScreen from './simulation/simulationScreen'

const getMain = (state) => {
    switch(state) {
        case APP_STATES.design:
            return DesignScreen
        case APP_STATES.control:
            return ControlScreen
        case APP_STATES.isa:
            return ISAScreen
        case APP_STATES.simulation:
            return SimulationScreen
    }
}

const MainScreen = ({ appState, subState, setSubState, state, setState}) => {
    const setCircuit = useCallback((newCircuit) => {
        const newState = {...state}
        newState.circuit = newCircuit
        setState(newState)
    }, [state])

    const setControl = useCallback((newControl) => {
        const newState = {...state}
        newState.control = newControl
        setState(newState)
    }, [state])

    const Template = getMain(appState)
    return (
        <div className='main-screen'>
            <Template
                subState={subState}
                setSubState={setSubState}
                circuit={state?.circuit}
                setCircuit={setCircuit}
                control={state?.control}
                setControl={setControl}
            ></Template>
        </div>
    )
}

export default MainScreen