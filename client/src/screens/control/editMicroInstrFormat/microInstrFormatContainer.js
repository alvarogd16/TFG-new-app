import Translations from "../../../utils/translations/translation"

const MicroInstrFormatContainer = ({ microInstrFormat }) => {
    return <>
        <h1>{Translations['M_INSTR_FORMAT']}</h1>
        <table className='control-word-table'>
            <thead>
                <tr>
                    {microInstrFormat.map(signal => 
                                        <th 
                                            key={signal.parentNode+signal.name}
                                        >{`├──${signal.size}b──┤`}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {microInstrFormat.map(signal => 
                                        <td 
                                            key={signal.parentNode+signal.name}
                                        >{signal.name}</td>
                    )}
                </tr>
                <tr>
                    {microInstrFormat.map(signal => 
                                        <td 
                                            key={signal.parentNode+signal.name}
                                        >{signal.parentNode}</td>
                    )}
                </tr>
            </tbody>
        </table>
    </>
}

export default MicroInstrFormatContainer