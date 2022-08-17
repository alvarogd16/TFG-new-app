const fs = require('fs')
const controlToVerilog = require('./controlToVerilog.js')

const PROYECT_FILE = '../../data/projects/default.json'
const VERILOG_FILES = './verilogFiles'
const DEST_FILE = '../../data/vOut.v'
const MAIN_MODULE = 'main_' + Date.now()

const getIntermediateSignals = (circuit, control) => {
    let signals = ''
    signals += '//-----------------------------\n'
    signals += '//--- Intermediate signals ----\n'
    signals += '//-----------------------------\n\n'
    signals += '//---- Outputs ----\n'

    circuit.nodes.forEach(node => {
        node.data.ports.forEach(port => {
            if(port.type === 'out')
                signals += `wire [${port.size-1}:0] ${node.data.label}_${port.name};\n`
        })
    })

    signals += '//---- Inputs ----\n'
    control.mInstrFormat.forEach(signal => {
        signals += `wire [${signal.size-1}:0] ${signal.parentNode}_${signal.name};\n`
    })

    return signals + '\n'
}

const getModuleIncludes = (circuit) => {
    const moduleIncludes = []
    circuit.nodes.forEach(node => {
        if(!moduleIncludes.includes(node.data.moduleName))
            moduleIncludes.push(node.data.moduleName)
    })

    let includes = ''
    moduleIncludes.forEach(include => {
        includes += `\`include "${VERILOG_FILES}/${include}.v"\n`
    })

    return includes + '\n'
}

const getPortsOfNode = (edges, node, mInstrFormat) => {
    let ports = ''
    node.data.ports.forEach(port => {
        /**
         * Always asign a output signal
         */
        if(port.type === 'out') {
            ports += (ports ? ',\n' : '\n')
            ports += `\t.${port.name}(${node.data.label}_${port.name})`
            return
        }

        /**
         * Inputs ports
         * First get all clk ports
         */
        if(port.name === 'clk') {
            ports += (ports ? ',\n' : '\n')
            ports += `\t.clk(clk)`
            return
        }
        
        /**
         * Check if another module use it
         */
        let edgeTarget = edges.find(edge => edge.target === node.id 
                                                && edge.targetHandle === port.name)
        if(edgeTarget) {
            ports += (ports ? ',\n' : '\n')
            ports += `\t.${port.name}(${edgeTarget.data.sourceLabel}_${edgeTarget.sourceHandle})`
            return
        }
        
        /**
         * If not check if it used by the control
         */
        edgeTarget = mInstrFormat.find(signal => signal.parentNode === node.data.label 
                                                && signal.name === port.name)
        if(edgeTarget) {
            ports += (ports ? ',\n' : '\n')
            ports += `\t.${port.name}(${edgeTarget.parentNode}_${edgeTarget.name})`
        }
    })
    return ports
}

const getModulesInstances = (circuit, control) => {
    let instances = ''
    instances += '//---------------------------\n'
    instances += '//----- Module Instances ----\n'
    instances += '//---------------------------\n\n'

    circuit.nodes.forEach(node => {
        instances += `${node.data.moduleName} ${node.data.label} (`
        instances += getPortsOfNode(circuit.edges, node, control.mInstrFormat)
        instances += '\n);\n\n'
    })
    // console.log(instances)
    return instances
}

const circuitToVerilog = () => {
    const state = JSON.parse(fs.readFileSync(PROYECT_FILE))

    const circuit = state.circuit
    const control = state.control

    let fileContent = ''
    fileContent += getModuleIncludes(circuit)
    fileContent += 'module ' + MAIN_MODULE + ' (input clk);\n\n'
    fileContent += getIntermediateSignals(circuit, control)
    fileContent += getModulesInstances(circuit, control)
    fileContent += controlToVerilog(control)
    fileContent += 'endmodule'

    console.log(fileContent)
    fs.writeFileSync(DEST_FILE, fileContent)
}

circuitToVerilog()