import APP_STATES from '../states/appStates'

const menuData = [
    {
        state: APP_STATES.design,
        name: 'design',
        submenu: [
            {
                item: 'Añadir bloque'
            },
            {
                item: 'Create block'
            },
            {
                item: 'Add IO'
            }
        ]
    },
    {
        state: APP_STATES.control,
        name: 'controlUnit',
        submenu: [
            {
                item: 'edit μInstr'
            },
            {
                item: 'μInstr format'
            }
        ]
    },
    {
        state: APP_STATES.isa,
        name: 'ISA'
    },
    {
        state: APP_STATES.simulation,
        name: 'simulation'
    }
]

export default menuData