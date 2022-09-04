import Translations from "../../../utils/translations/translation"

const MicroInstrRow = ({ mInstr, editMInstr, deleteMInstr }) => {
    return <tr>
        <td>{mInstr.name}</td>
        {mInstr.signals.map(sig => <td key={sig.parentNode+sig.name}>{sig.value.value}</td>)}
        <td>
            <button onClick={() => editMInstr(mInstr)}>E</button>
            <button onClick={() => deleteMInstr(mInstr)}>D</button>
        </td>
    </tr>
}

const ListMInstr = ({ mInstructions, mInstrFormat, addMInstr, editMInstr, deleteMInstr }) => {
    return <div className='edit-mInstr-list'>
        <table className='edit-mInstr-table'>
            <thead>
                <tr>
                    <th>{Translations['NAME']}</th>
                    {mInstrFormat.map(sig => <th key={sig.parentNode+sig.name}>{sig.parentNode + ' ' + sig.name}</th>)}
                </tr>
            </thead>
            <tbody>
                {mInstructions.map(mI => <MicroInstrRow 
                                            key={mI.name} 
                                            mInstr={mI}
                                            editMInstr={editMInstr}
                                            deleteMInstr={deleteMInstr}
                                        ></MicroInstrRow>)}
            </tbody>
        </table>
        <button className='edit-mInstr-add' onClick={addMInstr}>{Translations['ADD']}</button>
    </div>
}

export default ListMInstr