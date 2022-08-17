import React, { useEffect } from 'react'

const MenuItem = ({ data, subState, setSubState }) => {
    return <button className={'tm-menu-item' + (subState===data.item ? ' tm-menu-item-focus' : '')} 
                    onClick={() => {
                        if(subState === data.item) setSubState('')
                        else setSubState(data.item)
                    }}
            >
                {data.item}
            </button>
}

export default MenuItem