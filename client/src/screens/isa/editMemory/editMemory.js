import { useState, useEffect } from "react"
import { get, post } from '../../../api/api.js';
import Translations from "../../../utils/translations/translation.js";

const validateEditorCode = (content, memory) => {
    return content
        .split('\n')
        .map((line, i) => {
            return line.slice(0, memory.wordSize)
        })
        .join('\n')
}

const EditMemory = ({ memories }) => {
    const [memory, setMemory] = useState(memories[0])
    const [memoryContent, setMemoryContent] = useState()

    useEffect(() => {
        get(`/memories/readMemory/${memory.name}`)
            .then(res =>
                res.json())
            .then(res =>
                setMemoryContent(res.content))
    }, [memory])

    return <div className='ISA-edit'>
        <select 
            className='choose-memory' 
            value={memory.name} 
            onChange={({ target }) => 
                setMemory(memories.find(m => m.name === target.value))
            }>
            {memories.map(mem => <option key={mem.name} value={mem.name}>{mem.name}</option>)}
        </select>
        <button
            className='save-memory'
            onClick={() => {
                post(`/memories/writeMemory/${memory.name}`, { memoryData: memoryContent })
            }}
        >{Translations['SAVE']}</button>
        <textarea
            className='editor'
            value={memoryContent}
            onChange={({ target }) => {

                const isInvalid = target.value
                                    .split('\n')
                                    .some(line => line && !/\b[01]+\b/g.test(line))
                if(isInvalid)
                    return setMemoryContent(memoryContent)

                setMemoryContent(validateEditorCode(target.value, memory))
            }}
            style={{resize: 'none'}}
        ></textarea>
    </div>
}

export default EditMemory