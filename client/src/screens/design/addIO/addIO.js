const availableIONodes = [
    {
        id: 'input',
        label: 'INPUT'
    },
    {
        id: 'output',
        label: 'OUTPUT'
    }
]

const addIOToCircuit = (IOBlock) => {
    console.log(IOBlock)
}

const AddIO = () => {
    return <div className='design-submenu-container'>
    <p className='block-list-title'>IO</p>
    <div className='block-list'>
        {availableIONodes.map((IOBlock, idx) =>
        <button
            className='block-list-add-io'
            key={IOBlock.id}
            onClick={() => {
                addIOToCircuit(IOBlock)
            }}
        >
            {IOBlock.id}
        </button>
        )}
    </div>
</div>
}

export default AddIO