import React, { useEffect, useState } from 'react'
import EditMemory from './editMemory/editMemory.js';
import './style.css'

const ISA = {
    instructions: [
        {
            name: 'ADD Rf1, Rf2, Rd',
            fields: [
                {
                    name: 'COP',
                    defaultValue: '11',
                    size: 2
                },
                {
                    name: 'Rd',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'Rf1',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'Rf2',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'none',
                    defaultValue: '--',
                    size: 2
                },
                {
                    name: 'OP',
                    defaultValue: '100',
                    size: 3
                }
            ]
        },
        {
            name: 'SUB Rf1, Rf2, Rd',
            fields: [
                {
                    name: 'COP',
                    defaultValue: '11',
                    size: 2
                },
                {
                    name: 'Rd',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'Rf1',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'Rf2',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'none',
                    defaultValue: '--',
                    size: 2
                },
                {
                    name: 'OP',
                    defaultValue: '101',
                    size: 3
                }
            ]
        },
        {
            name: 'AND Rf1, Rf2, Rd',
            fields: [
                {
                    name: 'COP',
                    defaultValue: '11',
                    size: 2
                },
                {
                    name: 'Rd',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'Rf1',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'Rf2',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'none',
                    defaultValue: '--',
                    size: 2
                },
                {
                    name: 'OP',
                    defaultValue: '111',
                    size: 3
                }
            ]
        },
        {
            name: 'ASR Rf, Rd',
            fields: [
                {
                    name: 'COP',
                    defaultValue: '11',
                    size: 2
                },
                {
                    name: 'Rd',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'Rf1',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'none',
                    defaultValue: '-----',
                    size: 5
                },
                {
                    name: 'OP',
                    defaultValue: '110',
                    size: 3
                }
            ]
        },
        {
            name: 'ADDI Rf1, #num, Rd',
            fields: [
                {
                    name: 'COP',
                    defaultValue: '11',
                    size: 2
                },
                {
                    name: 'Rd',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'Rf1',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: '#num',
                    defaultValue: 'XXXXX',
                    size: 5
                },
                {
                    name: 'OP',
                    defaultValue: '100',
                    size: 3
                }
            ]
        },
        {
            name: 'SUBI Rf1, #num, Rd',
            fields: [
                {
                    name: 'COP',
                    defaultValue: '11',
                    size: 2
                },
                {
                    name: 'Rd',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'Rf1',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: '#num',
                    defaultValue: 'XXXXX',
                    size: 5
                },
                {
                    name: 'OP',
                    defaultValue: '100',
                    size: 3
                }
            ]
        },
        {
            name: 'LOAD dir_base(Ri), Rd',
            fields: [
                {
                    name: 'COP',
                    defaultValue: '00',
                    size: 2
                },
                {
                    name: 'Rd',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'Ri',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'dir_base',
                    defaultValue: 'XXXXXXXX',
                    size: 8
                }
            ]
        },
        {
            name: 'STORE Rf, dir_base(Ri)',
            fields: [
                {
                    name: 'COP',
                    defaultValue: '01',
                    size: 2
                },
                {
                    name: 'Rf',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'Ri',
                    defaultValue: 'XXX',
                    size: 3
                },
                {
                    name: 'dir_base',
                    defaultValue: 'XXXXXXXX',
                    size: 8
                }
            ]
        },
        {
            name: 'BEQ dir_destino',
            fields: [
                {
                    name: 'COP',
                    defaultValue: '10',
                    size: 2
                },
                {
                    name: 'COND',
                    defaultValue: '001',
                    size: 3
                },
                {
                    name: 'none',
                    defaultValue: '---',
                    size: 3
                },
                {
                    name: 'dir_salto',
                    defaultValue: 'XXXXXXXX',
                    size: 8
                }
            ]
        },
        {
            name: 'BNE dir_destino',
            fields: [
                {
                    name: 'COP',
                    defaultValue: '10',
                    size: 2
                },
                {
                    name: 'COND',
                    defaultValue: '101',
                    size: 3
                },
                {
                    name: 'none',
                    defaultValue: '---',
                    size: 3
                },
                {
                    name: 'dir_salto',
                    defaultValue: 'XXXXXXXX',
                    size: 8
                }
            ]
        },
        {
            name: 'BG dir_destino',
            fields: [
                {
                    name: 'COP',
                    defaultValue: '10',
                    size: 2
                },
                {
                    name: 'COND',
                    defaultValue: '111',
                    size: 3
                },
                {
                    name: 'none',
                    defaultValue: '---',
                    size: 3
                },
                {
                    name: 'dir_salto',
                    defaultValue: 'XXXXXXXX',
                    size: 8
                }
            ]
        },
        {
            name: 'BGE dir_destino',
            fields: [
                {
                    name: 'COP',
                    defaultValue: '10',
                    size: 2
                },
                {
                    name: 'COND',
                    defaultValue: '110',
                    size: 3
                },
                {
                    name: 'none',
                    defaultValue: '---',
                    size: 3
                },
                {
                    name: 'dir_salto',
                    defaultValue: 'XXXXXXXX',
                    size: 8
                }
            ]
        },
        {
            name: 'BL dir_destino',
            fields: [
                {
                    name: 'COP',
                    defaultValue: '10',
                    size: 2
                },
                {
                    name: 'COND',
                    defaultValue: '010',
                    size: 3
                },
                {
                    name: 'none',
                    defaultValue: '---',
                    size: 3
                },
                {
                    name: 'dir_salto',
                    defaultValue: 'XXXXXXXX',
                    size: 8
                }
            ]
        },
        {
            name: 'BLE dir_destino',
            fields: [
                {
                    name: 'COP',
                    defaultValue: '10',
                    size: 2
                },
                {
                    name: 'COND',
                    defaultValue: '011',
                    size: 3
                },
                {
                    name: 'none',
                    defaultValue: '---',
                    size: 3
                },
                {
                    name: 'dir_salto',
                    defaultValue: 'XXXXXXXX',
                    size: 8
                }
            ]
        },
        {
            name: 'BR dir_destino',
            fields: [
                {
                    name: 'COP',
                    defaultValue: '10',
                    size: 2
                },
                {
                    name: 'COND',
                    defaultValue: '000',
                    size: 3
                },
                {
                    name: 'none',
                    defaultValue: '---',
                    size: 3
                },
                {
                    name: 'dir_salto',
                    defaultValue: 'XXXXXXXX',
                    size: 8
                }
            ]
        }
    ]
}


const ISAInfo = () => {
    return <div className='ISA-info'>
        <div className='ISA-info-title'>Un esquema de la ISA actual que te ayudará a codificar mejor. 
            Actualmente solo se puede codificar en binario. En un futuro se añadirá la opción de ensamblador</div>
        <div className='ISA-isa-container'>
        {ISA.instructions.map(inst => 
            <div key={inst.name}>
                <h3>{inst.name}</h3>
                <table>
                    <thead>
                    <tr>
                    {inst.fields.map(field =>
                        <th key={'th'+field.name}>{field.name}</th>
                    )}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    {inst.fields.map(field =>
                        <td key={'td'+field.name}>{field.defaultValue}</td>
                    )}
                    </tr>
                    </tbody>
                </table>
            </div>    
        )}
        </div>
    </div>
}

const memories = [
    {
        name: 'RAM',
        nWords: 500,
        wordSize: 16
    },
    {
        name: 'ROM',
        nWords: 200,
        wordSize: 16
    }
]

const ISAScreen = () => {
 return <div className='ISA-screen'>
    <ISAInfo></ISAInfo>
    <EditMemory memories={memories}></EditMemory>
 </div>
}

export default ISAScreen