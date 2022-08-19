import { useEffect, useState } from 'react'
import Header_2 from './header/header'
import MainMenu_2 from './menu/mainMenu/mainMenu'
import MainScreen_2 from './screens/mainScreen'
import menuData from './menu/menuData'

import { get } from './api/api'

function App() {
    const [menuState, setMenuState] = useState(0)
    const [headerState, setHeaderState] = useState({state: ''})

    const [appState, setAppState] = useState()

    useEffect(() => {
        get('/state')
            .then((res) => res.json())
            .then((res) => setAppState(res))
            .catch(err => console.error(err))
    }, [])

    return (
        <div>
            {/* <Header submenu={menuData.find(item => item.state === appState).submenu}
                    subState={subState}
                    setSubState={setSubState}
            ></Header> */}
            <MainMenu_2
                data={menuData.map(item => { return {id: item.id, text: item.text, icon: item.icon} })}
                state={menuState}
                setState={setMenuState}
            ></MainMenu_2>
            <div className="main">
                <Header_2 
                    template={menuData[menuState]?.topMenu?.template}
                    data={menuData[menuState]?.topMenu?.data}
                    state={headerState}
                    setState={setHeaderState}
                ></Header_2>

                <MainScreen_2
                    state={appState}
                    setState={setAppState}
                    headerState={headerState}
                    setHeaderState={setHeaderState}
                    menuState={menuState}
                ></MainScreen_2>
                {/* <MainMenu 
                    appState={appState} 
                    setAppState={setAppState}
                    setSubState={setSubState}
                    menuItems={menuData}></MainMenu> */}
                {/* <MainScreen 
                    appState={appState} 
                    subState={subState}
                    setSubState={setSubState}
                    state={state} 
                    setState={setState}></MainScreen> */}
            </div>
        </div>
    )
}

export default App
