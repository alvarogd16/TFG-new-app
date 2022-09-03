const fs = require('fs')

const MEMORIES_PATH = './server/data/memories/'
const MEMORY_MAIN = 'memories.json'

module.exports = {
    readMemory: (req, res, next) => {
        const { memoryName } = req.params
        try {
            const memories = JSON.parse(fs.readFileSync(MEMORIES_PATH + MEMORY_MAIN))
            const memory = memories.find(mem => mem.name === memoryName)

            if(!memory) return res.status(404).end()

            const memoryContent = fs.readFileSync(MEMORIES_PATH + memory.fileName).toString()
            res.json({memory: memoryName, content: memoryContent})
        } catch(err) { next(err) }
    },
    writeMemory: (req, res, next) => {
        const { memoryName } = req.params
        const newMemoryContent = req.body

        try {
            const memories = JSON.parse(fs.readFileSync(MEMORIES_PATH + MEMORY_MAIN))
            const memory = memories.find(mem => mem.name === memoryName)

            if(!memory) return res.status(404).end()

            fs.writeFileSync(MEMORIES_PATH + memory.fileName, newMemoryContent.memoryData)
            res.end()
        } catch(err) { next(err) }
    }
}