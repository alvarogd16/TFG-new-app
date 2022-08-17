import React from 'react'
import TopMenu from '../menu/topMenu/topMenu'

const Header = ({ submenu, subState, setSubState }) => {
    return <header className="header">
        {/* <Logo></Logo> */}
        {submenu && <TopMenu items={submenu}
                            subState={subState}
                            setSubState={setSubState}
                    ></TopMenu>}
    </header>
}

export default Header