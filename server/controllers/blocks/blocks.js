const fs = require('fs')

// We use a json file for data persistance
const BLOCKS_FILE = './server/data/blocks.json'

module.exports = {
    getBlocks: (req, res, next) => {
        try {
            const blocks = JSON.parse(fs.readFileSync(BLOCKS_FILE))
            res.json(blocks)
        } catch(err) { next(err) }
    },
    getBlock: (req, res, next) => {
        const { blockId } = req.params
        try {
            const blocks = JSON.parse(fs.readFileSync(BLOCKS_FILE))
            const block = blocks.find(block => block.id === blockId)

            if(!block) return res.status(404).end()
            res.json(block)
        } catch(err) { next(err) }
    },
    createBlock: (req, res, next) => {
        const newBlock = req.body

        // TODO validate newBlock?

        try {
            const blocks = JSON.parse(fs.readFileSync(BLOCKS_FILE))

            const sameBlock = blocks.find(block => block.id === newBlock.id)
            if(sameBlock) return res.status(409).end() // I dont know if is 409 the status error i want it

            blocks.push(newBlock)
            fs.writeFileSync(BLOCKS_FILE, JSON.stringify(blocks, null, 4))
            res.end()
        } catch(err) { next(err) }
    },
    updateBlock: (req, res, next) => {
        const { blockId } = req.params
        const updatedBlock = req.body

        // TODO validate updatedBlock?

        try {
            const blocks = JSON.parse(fs.readFileSync(BLOCKS_FILE))
            const blockIdx = blocks.findIndex(block => block.id === blockId)

            if(blockIdx === -1) return res.status(404).end()
            
            blocks[blockIdx] = updatedBlock
            fs.writeFileSync(BLOCKS_FILE, JSON.stringify(blocks, null, 4))
            res.end()
        } catch(err) { next(err) }
    },
    deleteBlock: (req, res, next) => {
        const { blockId } = req.params

        try {
            const blocks = JSON.parse(fs.readFileSync(BLOCKS_FILE))
            const blockIdx = blocks.findIndex(b => b.id === blockId)

            if(blockIdx === -1) return res.status(404).end()

            blocks.splice(blockIdx, 1)
            fs.writeFileSync(BLOCKS_FILE, JSON.stringify(blocks, null, 4))
            res.end()
        } catch(err) { next(err) }
    }
}