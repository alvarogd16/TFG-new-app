import React from 'react'
import TopMenu from '../menu/topMenu/topMenu'

const Header_2 = ({template, data, state, setState}) => {
    const Template = template
    return <header className='header'>
        {/* <Logo></Logo> */}
        {template && <Template data={data} state={state} setState={setState}></Template>}
    </header>
}

const Header = ({ submenu, subState, setSubState }) => {
    return <header className="header">
        {/* <Logo></Logo> */}
        {submenu && <TopMenu items={submenu}
                            subState={subState}
                            setSubState={setSubState}
                    ></TopMenu>}
    </header>
}

export default Header_2