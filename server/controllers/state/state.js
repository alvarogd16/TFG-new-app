const fs = require('fs')

// We use a json file for data persistance
const PROYECT_FILE = './server/data/projects/default.json'

module.exports = {
    getState: (req, res, next) => {
        try {
            const state = JSON.parse(fs.readFileSync(PROYECT_FILE))
            res.json(state)
        } catch(err) { next(err) }
    },
    updateNodes: (req, res, next) => {
        const newNodes = req.body

        try {
            const state = JSON.parse(fs.readFileSync(PROYECT_FILE))
            state.circuit.nodes = newNodes
            fs.writeFileSync(PROYECT_FILE, JSON.stringify(state, null, 4))
            res.end()
        } catch(err) { next(err) }
    },
    updateEdges: (req, res, next) => {
        const newEdges = req.body

        try {
            const state = JSON.parse(fs.readFileSync(PROYECT_FILE))
            state.circuit.edges = newEdges
            fs.writeFileSync(PROYECT_FILE, JSON.stringify(state, null, 4))
            res.end()
        } catch(err) { next(err) }
    },
    updateMInstrFormat: (req, res, next) => {
        const newMInstrFormat = req.body

        try {
            const state = JSON.parse(fs.readFileSync(PROYECT_FILE))
            state.control.mInstrFormat = newMInstrFormat
            fs.writeFileSync(PROYECT_FILE, JSON.stringify(state, null, 4))
            res.end()
        } catch(err) { next(err) }
    },
    updateMInstructions: (req, res, next) => {
        const newMInstructions = req.body

        try {
            const state = JSON.parse(fs.readFileSync(PROYECT_FILE))
            state.control.mInstructions = newMInstructions
            fs.writeFileSync(PROYECT_FILE, JSON.stringify(state, null, 4))
            res.end()
        } catch(err) { next(err) }
    },
    updateFlowNodes: (req, res, next) => {
        const newFlowNodes = req.body

        try {
            const state = JSON.parse(fs.readFileSync(PROYECT_FILE))
            state.control.flow.nodes = newFlowNodes
            fs.writeFileSync(PROYECT_FILE, JSON.stringify(state, null, 4))
            res.end()
        } catch(err) { next(err) }
    },
    updateFlowEdges: (req, res, next) => {
        const newFlowEdges = req.body

        try {
            const state = JSON.parse(fs.readFileSync(PROYECT_FILE))
            state.control.flow.edges = newFlowEdges
            fs.writeFileSync(PROYECT_FILE, JSON.stringify(state, null, 4))
            res.end()
        } catch(err) { next(err) }
    }
}