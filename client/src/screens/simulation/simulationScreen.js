import React from 'react'
import SimFlow from './simFlow/simFlow'
import './sim.css'

const SimulationScreen = ({ circuit }) => {
    return <div className="sim-container">
        <SimFlow
            circuit={circuit}
        ></SimFlow>
    </div>
}

export default SimulationScreen