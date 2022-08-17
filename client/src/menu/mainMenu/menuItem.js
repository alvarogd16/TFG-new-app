import React from 'react'

const MenuItem = ({ data, focus, setAppState, setSubState }) => {
    const onClick = () => {
        setAppState(data.state)
        setSubState('')
    }
    return <button className={'mm-menu-item' + (focus ? ' menu-item-focus' : '')} onClick={onClick}>{data.name}</button>
}

export default MenuItem