import React from 'react'
import MenuItem from './menuItem.js'

const TopMenu = ({ items, subState, setSubState }) => {
    return <div className='top-menu'>
        {items.map(item => 
            <MenuItem key={item.item} 
                        data={item}
                        subState={subState}
                        setSubState={setSubState}
            ></MenuItem>
        )}
    </div>
}

export default TopMenu