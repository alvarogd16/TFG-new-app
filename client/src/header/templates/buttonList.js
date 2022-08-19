const ButtonList = ({ data, state, setState }) => {
    return <div className='top-menu'>
        {data.map(item =>
            <div 
                key={item.id} 
                className={'tm-menu-item' + (item.id === state.state ? ' tm-menu-item-focus' : '')}
                onClick={() => { 
                    state.state !== item.id ? 
                    setState({ state: item.id }) : 
                    setState({ state: '' })
                }}
            ><p>{item.text}</p></div>
            // <MenuItem key={item.item} 
            //             data={item}
            //             subState={subState}
            //             setSubState={setSubState}
            // ></MenuItem>
        )}
    </div>
}

export default ButtonList