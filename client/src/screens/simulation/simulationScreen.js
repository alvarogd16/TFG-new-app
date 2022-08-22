import React, { useEffect } from 'react'
import SimFlow from './simFlow/simFlow'
import './sim.css'
import io from 'socket.io-client'

let socket

const SimulationScreen = ({ circuit, headerState, setHeaderState }) => {

    useEffect(() => {
        // Conect ws
        socket = io()

        // Bind events
        socket.on('client:finishInit', () => {
            setHeaderState({ state: 'ready' })
        })

        socket.on('client:finishFinish', () => {
            setHeaderState({ state: 'halt' })
        })

        socket.on('client:data', (data) => {
            console.log('simData -> ', data)
        })

        return () => {
            socket.off('client:finishInit')
            socket.off('client:finishFinish')
            socket.off('client:data')
            socket.emit('client:finish')
        }
    }, [])

    useEffect(() => {
        console.log(headerState)
        switch(headerState.state) {
            case 'init':
                socket.emit('client:init')
                break;
            case 'run':
                socket.emit('client:run')
                break;
            case 'pause':
                socket.emit('client:pause')
                setHeaderState({ state: 'ready' })
                break;
            case 'tick':
                socket.emit('client:tick')
                setHeaderState({ state: 'ready' })
                break;
            case 'finish':
                socket.emit('client:finish')
                break;
        }
    }, [headerState])

    return <div className="sim-container">
        <SimFlow
            circuit={circuit}
        ></SimFlow>
    </div>
}

export default SimulationScreen