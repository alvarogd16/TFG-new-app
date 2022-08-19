import APP_STATES from '../states/appStates'
import ButtonList from '../header/templates/buttonList'
import ChipIcon from '../assets/icons/chipIcon'
import ControlIcon from '../assets/icons/controlIcon'
import ISAIcon from '../assets/icons/isaIcon'
import SimIcon from '../assets/icons/simIcon'

const menuData_2 = [
    {
        id: APP_STATES.design,
        text: 'design',         // Lateral menu name
        icon: ChipIcon,   // Lateral menu icon
        topMenu: {
            template: ButtonList,
            data: [
                {
                    id: 'addNode',
                    icon: 'path/to/icon',       // Top menu icon
                    text: 'añadir nodo' // Top menu alt text
                },
                {
                    id: 'createBlock',
                    icon: 'path/to/icon',
                    text: 'crear bloque'
                },
                {
                    id: 'addIO',
                    icon: 'path/to/icon',
                    text: 'añadir io'
                }
            ]
        }
    },
    {
        id: APP_STATES.control,
        text: 'control',         // Lateral menu name
        icon: ControlIcon,
        topMenu: {
            template: ButtonList,
            data: [
                {
                    id: 'editMInstr',
                    icon: 'path/to/icon',       // Top menu icon
                    text: 'editar m-instr' // Top menu alt text
                },
                {
                    id: 'mInstrFormat',
                    icon: 'path/to/icon',
                    text: 'formato m-instr'
                }
            ]
        }
    },
    {
        id: APP_STATES.isa,
        text: 'isa',         // Lateral menu name
        icon: ISAIcon
    },
    {
        id: APP_STATES.simulation,
        text: 'sim',         // Lateral menu name
        icon: SimIcon,
        topMenu: {
            template: ButtonList,
            data: [
            ]
        }
    },
]

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

export default menuData_2