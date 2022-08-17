import { useEffect, useState } from "react"
import ListMInstr from "./listMInstr"
import EditMInstrContainer from "./editMInstrContainer"
import { post } from "../../../api/api"

const microInstrMock = [
    {
        name: 'mov',
        signals: [
            {
                name: 'in1',
                value: {
                    size: 2,
                    format: 'b',
                    value: '11'
                }
            },
            {
                name: 'in2',
                value: {
                    size: 3,
                    format: 'b',
                    value: '111'
                }
            }
        ]
    },
    {
        name: 'add',
        signals: [
            {
                name: 'in1',
                value: {
                    size: 2,
                    format: 'b',
                    value: '00'
                }
            },
            {
                name: 'in2',
                value: {
                    size: 3,
                    format: 'b',
                    value: '111'
                }
            }
        ]
    },
    {
        name: 'and',
        signals: [
            {
                name: 'in1',
                value: {
                    size: 2,
                    format: 'b',
                    value: '11'
                }
            },
            {
                name: 'in2',
                value: {
                    size: 3,
                    format: 'b',
                    value: '101'
                }
            }
        ]
    }
]

const mInstrFormatMock = [
    {
        name: "in1",
        size: 2,
        parentNode: "parent1"
    },
    {
        name: "in2",
        size: 3,
        parentNode: "parent2"
    }
]

const EditMInstrScreen = ({ control, setControl }) => {
    const [showEditMInstr, setShowEditMInstr] = useState(false)
    const [currentMInstr, setCurrentMInstr] = useState()

    useEffect(() => {
        // const newControl = {...control}
        // // newControl.mInstructions = microInstrMock
        // // newControl.mInstrFormat = mInstrFormatMock
        // setControl(newControl)
    }, [])

    const saveMicroInstr = (mInstr) => {
        const newControl = {...control}
        const newMInstr = newControl.mInstructions || []

        const newMInstrIdx = newMInstr.findIndex(mI => mI.name === mInstr.name)
        if(newMInstrIdx === -1)
            newMInstr.push(mInstr)
        else
            newMInstr[newMInstrIdx] = mInstr
        newControl.mInstructions = newMInstr
        post('/state/control/mInstructions', newMInstr)
        setControl(newControl)
        setShowEditMInstr(false)
        setCurrentMInstr(undefined)
    }

    const cancelMInstr = () => {
        setShowEditMInstr(false)
        setCurrentMInstr(undefined)
    }

    const editMInstr = (mInstr) => {
        setCurrentMInstr(mInstr)
        setShowEditMInstr(true)
    }

    const deleteMInstr = (mInstr) => {
        const newControl = {...control}
        const newMInstr = newControl.mInstructions
        const mInstrIdx = newMInstr.findIndex(mI => mI.name === mInstr.name)
        if(mInstrIdx !== -1) {
            newMInstr.splice(mInstrIdx, 1)
            newControl.mInstructions = newMInstr
            setControl(newControl)
        }

    }

    return <>
        <h1 className='edit-mInstr-title'>Micro Instrucciones</h1>
        <ListMInstr 
            mInstructions={control.mInstructions}
            mInstrFormat={control.mInstrFormat}
            addMInstr={() => setShowEditMInstr(true)}
            editMInstr={editMInstr}
            deleteMInstr={deleteMInstr}
        ></ListMInstr>
        {showEditMInstr 
            && <EditMInstrContainer
                    mInstr={currentMInstr}
                    mInstrFormat={control.mInstrFormat}
                    saveMInstr={saveMicroInstr}
                    cancelMInstr={cancelMInstr}
                ></EditMInstrContainer>}
    </>
}

export default EditMInstrScreen