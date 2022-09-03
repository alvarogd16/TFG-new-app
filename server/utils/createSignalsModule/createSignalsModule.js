const fs = require('fs')

const SIGNAL_FILE = '../../data/signalsInfo.txt'
const DEST_FILE = '../../data/signalModule.cpp'

const END_FILE = '\\n'
const TAB = '\\t'

const createSignalsModule = () => {
    const fileContent = fs.readFileSync(SIGNAL_FILE, {encoding:'utf8', flag:'r'})

    const signalsList = fileContent.split('\n')

    let moduleContent = 'void printSignals(VvOut *dut, vluint64_t simTime) {\n'
    moduleContent += `\tprintf("==============================${END_FILE}");\n`
    moduleContent += `\tprintf("-> simTime: %ld${TAB}clk: %d${END_FILE}", simTime, dut->clk);\n`
    moduleContent += `\tprintf("==============================${END_FILE}");\n\n`

    signalsList.forEach(signal => {
        if(!signal) return
        moduleContent += `\tprintf("${signal}: %d${END_FILE}", dut->${signal});\n`
    })

    moduleContent += `\tprintf("${END_FILE}"):\n}`

    fs.writeFileSync(DEST_FILE, moduleContent)
}

createSignalsModule()