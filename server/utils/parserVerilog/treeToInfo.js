const {TOKEN_TYPES, PORT_TYPES, numberToDecimal} = require('./constants.js')


/**
 * From a tree create an object to consume by the main program
 * {
 *      moduleName: "name",
 *      parameters: [
 *                      {
 *                          name: "name",
 *                          value: numberType // { size: sizeExpresion, base: [dbho], value: numberType }
 *                      },
 *                      ...
 *                  ]
 *      inputs: [
 *                  {
 *                      name: "name",
 *                      type: portType,
 *                      size: sizeExpresion // [N-1:0] -> "N-1", [5:2] -> "3"
 *                  }
 *                  ...
 *              ]
 *      outputs: same that inputs
 * }
 */
 const treeToInfo = (data) => {
    let object = {moduleName: "", parameters: [], inputs: [], outputs: []}
    let current = 0;

    const _transformRangeToSize = (range) => {
        // By now not support parameters
        // Neither math expresions

        if(range.length > 4) return "1"

        let size = "";

        // Skip '['
        let _current = 1;

        // First number
        let number = range[_current].value;
        if(range[_current].base)
            number = numberToDecimal(number, range[_current].base)
        size += number;
        _current++;

        size += range[_current].type;
        _current++;

        // Second number
        number = range[_current].value;
        if(range[_current].base)
            number = numberToDecimal(number, range[_current].base)
        size += number;

        return size;
    }


    /**
     * Check for parameters in module
     * 
     * Always params are in the second position
     * [0] "module", [1] name, [2] params?
     * 
     * Parameters can be a simple array (if its only one param)
     * or a arrays of arrays (each array is a param)
     * [param] or [[param1], [param2] ... [paramN]]
     */
    const _moduleHasParameters = (moduleArray) => {
        return moduleArray[2] && moduleArray[2].length !== 0
                && (moduleArray[2][0]?.value === "parameter" || moduleArray[2][0][0]?.value === "parameter");
    }

    /**
     * Check for ports in module
     * 
     * It can be 
     * [0] "module", [1] name, [2] params, [3] ports 
     * or
     * [0] "module", [1] name, [2] ports
     */
    const _moduleHasPorts = (moduleArray) => {
        let portsIndex = 2;
        if(_moduleHasParameters(moduleArray)) portsIndex = 3

        return moduleArray[portsIndex]?.length > 0;
    }

    /**
     * Create new parameters (old style definition)
     * to process later all of them
     * 
     * Parameters can be a simple array (if its only one param)
     * or a arrays of arrays (each array is a param)
     * [param] or [[param1], [param2] ... [paramN]]
     */
    const _createParamsFromModule = (_data) => {
        const moduleParams = _data[0][2];

        if(Array.isArray(moduleParams[0])) {
            moduleParams.forEach(p => {
                _data.splice(1,0, p);
            })
        } else
            _data.splice(1, 0, moduleParams) // insert into data[1] (data[0] its module line, parameters start at data[1])

        return _data
    }

    const _createPortsFromModule = (_data) => {
        let portsIndex = 2;
        if(_moduleHasParameters(_data[0])) portsIndex = 3

        const modulePorts = _data[0][portsIndex]

        if(Array.isArray(modulePorts[0])) {
            modulePorts.forEach(p => {
                _data.push(p);
            })
        } else
            _data.push(modulePorts)

        return _data
    }

    const _fillParameters = () => {
        let parameters = []

        const hasSize = (v) => v?.length > 2
        
        /**
         * {
         *      name: "name",
         *      value: numberType // { size: sizeExpresion, base: [dbho], value: numberType
         * }         
         */
        const _createParam = (p) => {
            return {
                    name: p[0].value,
                    value: {
                            size: p[1].size,
                            base: p[1].base,
                            value: p[1].value   
                            }
                    }
        }
        
        while(data[current][0].value === "parameter") {
            let paramListIdx = 1; // By default params definition are in data[current][1]

            // But when it has size is in the next position
            if(hasSize(data[current]))
                paramListIdx++; // TODO size = _transformRangeToSize(data[current][1])

            const paramList = data[current][paramListIdx]
            if(Array.isArray(paramList[0])) {
                // Parameters line with multiple definitions
                paramList.forEach(param => {
                    parameters.push(_createParam(param))
                });
            } else
                parameters.push(_createParam(paramList))
 
            current++;
        }
        return parameters;
    }

    const _fillPorts = () => {
        let inputs = [],
            outputs = [];

        const _createInput = (input, type, size) => {
            return {
                name: input.value,
                size: size,
                type: type
            }
        }

        while(data[current] && (data[current][0].value === "input"
                                || data[current][0].value === "output")) {
            let portListIdx = 1;
            let inOrOut = data[current][0].value;
            let type = "wire"; // By default all ports are wires
            let size = "1";

            if(inOrOut === "output" && PORT_TYPES.some((port_type) => port_type === data[current][portListIdx].value)) {
                type = data[current][portListIdx].value;
                portListIdx++;
            }

            if(data[current][portListIdx][0].type === TOKEN_TYPES.openBracket) {
                size = _transformRangeToSize(data[current][portListIdx])
                portListIdx++;
            }

            

            let portList = data[current][portListIdx];
            let portRet = []

            if(Array.isArray(portList)) {
                portList.forEach(i => {
                    portRet.push(_createInput(i, type, size))
                })
            } else
                portRet.push(_createInput(portList, type, size))

            if(inOrOut === "input")
                inputs = inputs.concat(portRet)
            else
                outputs = outputs.concat(portRet)

            current++;
        }

        return {inputs, outputs}
    }
 

    // Get module name
    // [0] its the token "module", [1] its the name of the module
    object.moduleName = data[current][1].value;

    // Create params from modules header
    if(_moduleHasParameters(data[current]))
        data = _createParamsFromModule(data)

    // Create ports from module header
    if(_moduleHasPorts(data[current]))
        data = _createPortsFromModule(data)

    // Finish with module line
    current++;

    // Fill parameters
    object.parameters = _fillParameters()
    
    // Fill IOs
    let {inputs, outputs} = _fillPorts()
    object.inputs = inputs;
    object.outputs = outputs;

    return object
}

module.exports = treeToInfo