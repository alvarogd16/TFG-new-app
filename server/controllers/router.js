const express = require('express')
const router = express.Router()

const { getBlocks, 
        getBlock, 
        createBlock, 
        updateBlock, 
        deleteBlock } = require('./blocks/blocks.js')

const { getState, 
        updateNodes, 
        updateEdges, 
        updateMInstrFormat, 
        updateMInstructions, 
        updateFlowNodes, 
        updateFlowEdges } = require('./state/state.js')

const { getVFilesNames, 
        getFileInfo } = require('./vFiles/vFiles.js')

        
// Blocks
router.get('/blocks', getBlocks)
router.get('/block/:blockId', getBlock)
router.post('/block', createBlock)
router.put('/block/:blockId', updateBlock)
router.delete('/block/:blockId', deleteBlock)

// State
router.get('/state', getState)
// - circuit
router.post('/state/circuit/nodes', updateNodes)
router.post('/state/circuit/edges', updateEdges)
// - control
router.post('/state/control/mInstrFormat', updateMInstrFormat)
router.post('/state/control/mInstructions', updateMInstructions)
router.post('/state/control/flow/nodes', updateFlowNodes)
router.post('/state/control/flow/edges', updateFlowEdges)

// Verilog files
router.get('/vFilesNames', getVFilesNames)
router.get('/vFile/:fileName', getFileInfo)

module.exports = router