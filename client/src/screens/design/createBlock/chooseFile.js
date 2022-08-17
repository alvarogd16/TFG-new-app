import { useEffect, useState } from 'react'
import { get } from '../../../api/api'
import Translations from '../../../utils/translations/translation'

const ChooseFile = ({ setFile, nextState }) => {
    const [files, setFiles] = useState()

    useEffect(() => {
        get('/vFilesNames')
            .then(res => res.json())
            .then(res => setFiles(res))
    }, [])
    // const files = ['asdfa.v', 'qoyerq.v', 'kñajdñfjañs.v'] // TODO: Add getFiles request
    return <div className='choose-v-file'>
        <h1>{Translations['CHOOSE_FILE']}</h1>
        <h2>{'Si no aprece aquí tu fichero prueba a meterlo en la carpeta verilogFiles del proyecto'}</h2>
        {files && files.map(f => <p key={f} onClick={() => { setFile(f); nextState()}}>{f}</p>)}
    </div>
}

export default ChooseFile