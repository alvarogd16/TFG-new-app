import { useEffect, useState } from 'react'
import Header from './header/header'
import MainMenu from './menu/mainMenu/mainMenu'
import MainScreen from './screens/mainScreen'
import menuData from './menu/menuData'

import { get } from './api/api'

import { Position } from 'react-flow-renderer'
const STEP_SIZE = 20

const stateMock = {
    circuit: {
        nodes: [
            {
                id: '0',
                type: 'blockType',
                position: { x: 100, y: 125 },
                style: {
                    width: 4*STEP_SIZE + 'px',
                    height: 4*STEP_SIZE + 'px',
                    display: 'flex'
                },
                className: 'block-type-node',
                data: {
                    label: 'ADDER',
                    size: { width: 3, height: 2 },
                    ports: [
                        {
                            name: 'p1',
                            type: 'in',
                            direction: Position.Left,
                            direction_index: 1
                        },
                        {
                            name: 'p2',
                            type: 'in',
                            direction: Position.Right,
                            direction_index: 2
                        },
                        {
                            name: 'p3',
                            type: 'in',
                            direction: Position.Bottom,
                            direction_index: 3
                        },
                        {
                            name: 'p4',
                            type: 'in',
                            direction: Position.Top,
                            direction_index: 1
                        }
                    ]
                }
            },
            {
                id: '1',
                type: 'blockType',
                position: { x: 150, y: 125 },
                style: {
                    width: 4*STEP_SIZE + 'px',
                    height: 4*STEP_SIZE + 'px',
                    display: 'flex'
                },
                className: 'block-type-node',
                data: {
                    label: 'ADDER2',
                    size: { width: 3, height: 2 },
                    ports: [
                        {
                            name: 'p1',
                            type: 'out',
                            direction: Position.Left,
                            direction_index: 1
                        },
                        {
                            name: 'p2',
                            type: 'out',
                            direction: Position.Right,
                            direction_index: 2
                        },
                        {
                            name: 'p3',
                            type: 'out',
                            direction: Position.Bottom,
                            direction_index: 3
                        },
                        {
                            name: 'p4',
                            type: 'out',
                            direction: Position.Top,
                            direction_index: 1
                        }
                    ]
                }
            }
        ],
        edges: []
    },
    control: {
        microInst: [],
        flow: {}
    }
}

function App() {
    const [appState, setAppState] = useState(menuData[0].state)
    const [subState, setSubState] = useState()

    const [state, setState] = useState()

    useEffect(() => {
        get('/state')
            .then((res) => res.json())
            .then((res) => setState(res))
            .catch(err => console.error(err))
    }, [])

    return (
        <div>
            <Header submenu={menuData.find(item => item.state === appState).submenu}
                    subState={subState}
                    setSubState={setSubState}
            ></Header>
            <div className="main">
                <MainMenu 
                    appState={appState} 
                    setAppState={setAppState}
                    setSubState={setSubState}
                    menuItems={menuData}></MainMenu>
                <MainScreen 
                    appState={appState} 
                    subState={subState}
                    setSubState={setSubState}
                    state={state} 
                    setState={setState}></MainScreen>
            </div>
        </div>
    )
}

export default App
