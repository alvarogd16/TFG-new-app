const {TOKEN_TYPES, PORT_TYPES} = require('./constants.js')

const parse = (tokens) => {
    let tokensTree = [];
    let current = 0;

    const _processModule = () => {
        let line = [];

        const _microProcessParameter = () => {
            // Ignore '#' and '(' characters
            current += 2;

            let params = []

            /**
             *  Return a paramList like
             * [
             *      {parameter},
             * With one parameter 
             *      [
             *          {name}
             *          {value}
             *      ]
             * With N parameters
             *      [
             *          [
             *              {name0},
             *              {value0}
             *          ],
             *          ...
             *          [
             *              {nameN},
             *              {valueN}
             *          ]
             *      ]
             * ]
             */ 
            const _nanoProcessParameter = () => {
                let paramList = [];

                paramList.push(tokens[current]);
                current++;

                paramValues = [];

                // TODO support sizeType

                while(tokens[current]?.type !== TOKEN_TYPES.closeParenthesis 
                        && tokens[current]?.value !== "parameter") {
                    paramValues.push([ tokens[current], tokens[current+1] ]);
                    current += 2;
                }

                paramList.push(paramValues.length === 1 ? paramValues[0] : paramValues);

                return paramList
            }

            while(tokens[current].type !== TOKEN_TYPES.closeParenthesis) {
                if(tokens[current]?.value === "parameter") {
                    params.push(_nanoProcessParameter())
                } else
                    current++;
            }

            // Ignore ')'
            current++;

            return params.length === 1 ? params[0] : params
        }

        const _microProcessIO = () => {
            let ports = []

            // Ignore '('
            current ++;

            const _nanoProcessIO = () => {
                let singlePort = [];

                singlePort.push(tokens[current]);
                current++;

                if(PORT_TYPES.some((tokenType) => tokenType === tokens[current]?.value)) {
                    singlePort.push(tokens[current]);
                    current++;
                }

                if(tokens[current]?.type === TOKEN_TYPES.openBracket) {
                    let size = []
                    while(tokens[current]?.type !== TOKEN_TYPES.closeBracket) {
                        size.push(tokens[current]);
                        current++;
                    }
                    size.push(tokens[current]);
                    current++;

                    singlePort.push(size);
                }

                let ports = []

                while(tokens[current]?.type !== TOKEN_TYPES.closeParenthesis 
                        && tokens[current]?.value !== "input"
                        && tokens[current]?.value !== "output") {
                    ports.push(tokens[current]);
                    current++;
                }

                singlePort.push(ports);

                return singlePort
            }

            while(tokens[current].type !== TOKEN_TYPES.closeParenthesis) {
                if(tokens[current]?.value === "input" || tokens[current]?.value === "output") {
                    ports.push(_nanoProcessIO())
                } else
                    current++;
            }

            // Ignore ')'
            current++;

            return ports.length === 1 ? ports[0] : ports
        }

        while(tokens[current].type !== TOKEN_TYPES.semicolon) {
            if(tokens[current].type === TOKEN_TYPES.numberSign)
                line.push(_microProcessParameter())
            else if(tokens[current].type === TOKEN_TYPES.openParenthesis)
                line.push(_microProcessIO())
            else {
                line.push(tokens[current]);
                current++;
            }
        }

        return line;
    }

    const _processParameter = () => {
        let params = [];

        params.push(tokens[current]);
        current++;

        if(tokens[current].type === TOKEN_TYPES.openBracket) {
            let range = [ tokens[current] ];
            current++;

            while(tokens[current].type !== TOKEN_TYPES.closeBracket) {
                range.push(tokens[current])
                current++;
            }

            // Push the close bracket
            range.push(tokens[current])
            current++;

            params.push(range);
        }

        let paramsItems = []

        while(tokens[current].type !== TOKEN_TYPES.semicolon) {
            paramsItems.push([ tokens[current++], tokens[current++]] )
        }

        // If only one param [ paramName, paramValue ] if not [ [paramName1, paramValue1], ... [paramNameN, paramValueN] ]
        params.push(paramsItems.length === 1 ? paramsItems[0] : paramsItems)

        
        return params
    }

    const _processIO = () => {
        let ports = [];

        ports.push(tokens[current]);
        current++;

        if(tokens[current].type === TOKEN_TYPES.symbol
            && PORT_TYPES.some(p => p === tokens[current].value)) {
            ports.push(tokens[current]);
            current++;
        }
            

        if(tokens[current].type === TOKEN_TYPES.openBracket) {
            let range = [ tokens[current] ];
            current++;

            while(tokens[current].type !== TOKEN_TYPES.closeBracket) {
                range.push(tokens[current])
                current++;
            }

            // Push the close bracket
            range.push(tokens[current])
            current++;

            ports.push(range);
        }

        let portsItems = []

        while(tokens[current].type !== TOKEN_TYPES.semicolon) {
            portsItems.push(tokens[current])
            current++;
        }
        ports.push(portsItems)

        return ports
    }

    while(current < tokens.length) {
        let currentTok = tokens[current];

        if(currentTok.type !== TOKEN_TYPES.symbol) {
            current++;
            continue;
        }

        if(currentTok.value === "endmodule") break;
        

        if(currentTok.value === "module")
            tokensTree.push(_processModule())
        else if(currentTok.value === "parameter")
                // || currentTok.value === "localparam")
            tokensTree.push(_processParameter())
        else if(currentTok.value === "input"
                    || currentTok.value === "output")
            tokensTree.push(_processIO())
        else
            current++;
    }

    return tokensTree;
}

module.exports = parse