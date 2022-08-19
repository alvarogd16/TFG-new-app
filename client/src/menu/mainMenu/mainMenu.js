import React, { useState } from 'react'
import MenuItem from './menuItem'
import '../style.css'

const MenuItem_2 = ({ text, icon, isFocus, onClick}) => {
    const Icon = icon
    return <div onClick={onClick} className={'mm-item' + (isFocus ? ' mm-item-focus' : '')}>
        {icon && <Icon isFocus={isFocus}></Icon>}
        <p>{text}</p>
    </div>
}

const MainMenu_2 = ({ data, state, setState}) => {
    return (
        <div className='main-menu'>
            <div className='logo'></div>
            {data.map((item, idx) =>
                <MenuItem_2
                    key={item.id}
                    text={item.text}
                    icon={item.icon}
                    isFocus={state === idx}
                    onClick={() => setState(idx)}
                ></MenuItem_2>
            )}
        </div>
    )
}

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

export default MainMenu_2