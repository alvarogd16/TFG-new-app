/**
 * Set the outSignals for a given state.
 * outSignals depends only of the current state. 
 */
const outSignalsCase = (stateNodes, mInstrFormat, mInstructions) => {
    let ret = ''
    ret += 'always @(*)\nbegin\n'
    ret += '\tcase(state)\n'
    stateNodes.forEach((state, idx) => {
        const mInstr = mInstructions.find(mI => state.data.label === mI.name)

        ret += `\t\t${idx}:\n`
        ret += '\t\t\toutSignals = { '
        
        for(let i = 0; i < mInstrFormat.length; i++) {
            ret += `${mInstrFormat[i].size}'b${mInstr.signals[i].value.value}`
            if(i != mInstrFormat.length-1)
                ret += ', '
        }
        ret += ' };\n'
    })
    ret += '\tendcase\nend\n\n'
    return ret
}

const getIndexFromTargetEdge = () => {}

/**
 * Set the nextState. 
 * Its depend of the current state and some conditional signals.
 */
const nextStateCase = (stateNodes, conditionalNodes, edges, initialStateIdx) => {
    let ret = ''
    ret += 'always @(*)\nbegin\n'
    ret += '\tcase(state)\n'
    stateNodes.forEach((state, idx) => {
        const edgeFromNode = edges.find(e => e.source === state.id)
        
        ret += `\t\t${idx}:\n`

        /**
         * With no edge the next state is the first
         */
        if(!edgeFromNode)
            return ret += `\t\t\tnextState = ${initialStateIdx};\n`

        if(edgeFromNode.data.isConditional)
            return
        
        if(edgeFromNode.target.startsWith('conditional')) {
            const condNode = conditionalNodes.find(node => 
                                                    edgeFromNode.target === node.id)
            const condEdges = edges.filter(edge => 
                                                    edgeFromNode.target === edge.source)
            
            ret += `\t\t\tcase(${condNode.data.label.replace(' ', '_')})\n`
                condEdges.forEach(edge => {
                    ret += `\t\t\t\t${edge.label}:\n`

                    const stateIdx = stateNodes
                                        .findIndex(targetState => 
                                            targetState.id === edge.target)
                    ret += `\t\t\t\t\tnextState = ${stateIdx};\n`
                })
            ret += '\t\t\tendcase\n'
        }
        else {
            const stateIdx = stateNodes
                                .findIndex(targetState => 
                                    targetState.id === edgeFromNode.target)
            // TODO Rewrite this eeror msg
            if(stateIdx === -1) 
                throw new Error(`f NextStateCase. Target state index not exits`)

            ret += `\t\t\tnextState = ${stateIdx};\n`
        }
    })

    ret += '\tendcase\nend\n\n'
    return ret
}

const getOutSignalsSize = (mInstrFormat) => {
    let cont = 0;
    mInstrFormat.forEach(signal => cont += parseInt(signal.size))
    return cont
}

const getInitialStateIdx = (flow) => {
    return flow.nodes.findIndex(node => 
        !flow.edges.some(edge => edge.target === node.id)  
    )
}


/**
 * Main function that return all control logic.
 * The info comes from state.control,
 * 
 * It translate the flow diagram and micro-instr to a 
 * state machine in Verilog.
 */
module.exports = (control) => {
    let controlRet = ''
    
    const mInstrFormat = control.mInstrFormat
    const mInstructions = control.mInstructions
    const flow = control.flow

    controlRet += '//-------------------\n'
    controlRet += '//----- CONTROL -----\n'
    controlRet += '//-------------------\n\n'

    /**
     * There is two types of nodes: m-instr and conditional. 
     * We get the firsts ones because each micro-instr represent a state.
    */
    const stateNodes = control.flow.nodes.filter(node => node.data.type === 'm-instr')
    const conditionalNodes = control.flow.nodes.filter(node => node.data.type === 'conditional')
    if(!stateNodes) return

    const initialStateIdx = getInitialStateIdx(flow)
    
    /**
     * If we have 7 statesNodes we need a 3b size state variable.
     * With the first line calculate the size of the states variable
     * to fit into the number of states.
     */
    const nStates = Math.ceil(Math.log2(stateNodes.length))
    controlRet += `reg [${nStates-1}:0] nextState;\n`
    controlRet += `reg [${nStates-1}:0] state = ${initialStateIdx};\n\n`

    controlRet += `reg [${getOutSignalsSize(mInstrFormat)-1}:0] outSignals;\n\n`

    controlRet += 'assign { '
    mInstrFormat.forEach((signal, idx) => {
        controlRet += `${signal.parentNode}_${signal.name}`
        if(idx !== mInstrFormat.length-1)
            controlRet += ', '
    })
    controlRet += ' } = outSignals;\n\n'

    /**
     * Each clk pulse we update the state. 
     * There is a always statement that calculate the nextState 
     * based on the current state and other signals.
     */
    controlRet += 'always @(posedge clk)\n'
    controlRet += '\tstate <= nextState;\n\n'

    controlRet += outSignalsCase(stateNodes, mInstrFormat, mInstructions)
    controlRet += nextStateCase(stateNodes, conditionalNodes, flow.edges, initialStateIdx)

    // console.log(controlRet)
    return controlRet
}