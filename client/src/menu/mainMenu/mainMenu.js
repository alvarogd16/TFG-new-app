import React, { useState } from 'react'
import MenuItem from './menuItem'
import '../style.css'

const MainMenu = ({ menuItems, appState, setAppState, setSubState }) => {
    return (
        <div className='main-menu'>
            {menuItems.map(menuItem =>
                <MenuItem 
                    key={menuItem.name} 
                    data={menuItem} 
                    focus={appState === menuItem.state} 
                    setAppState={setAppState}
                    setSubState={setSubState}
                ></MenuItem>    
            )}
        </div>
    )
}

export default MainMenu