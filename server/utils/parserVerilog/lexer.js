const {TOKEN_TYPES} = require('./constants.js')

const isWhitespace = (c) => /\s/.test(c);
const isSymbol = (c) => /[a-zA-Z_]/.test(c);
const isSingleCharacter = (c) => /[\(\)\[\];#:]/.test(c);
const isDisplayTask = (c) => /[\$]/.test(c);
const isNumberFormat = (c) => /[0-9\'a-fA-FhHoO.]/.test(c);
const isNumber = (c) => /[0-9]/.test(c);
const isNumberReal = (c) => /[0-9.]/.test(c);
const isNumberBase = (c) => /[0-9a-fA-F.]/.test(c);
const isBase = (c) => /[bBdDhHoO]/.test(c);
const isSemicolon = (c) => /[;]/.test(c);
const isString = (c) => /[\"]/.test(c);
const isMathOp = (c) => /[\+\-\*\/]/.test(c);

/**
 * From a verilog string without comments return an array of tokens
 * with the follow specification
 * {
 *     type: TOKEN_TYPE,
 *     [value: string,]     // Except single characters
 *     [size: string,]      // Only number types
 *     [base: string]       // Only number types
 * }
 */
 const lexer = (data) => {
    let tokens = [];
    let current = 0;

    const _processDisplayTask = () => {
        // This are $TYPE task 
        // We dont want them
        while(!isSemicolon(data[current])) current++;
    }

    const _processSymbols = () => {
        let symbol = "";

        // Symbols cant start with numbers but it can include numbers 🤯
        while(data[current] && (isSymbol(data[current]) || isNumber(data[current]))) {
            symbol += data[current];
            current++;
        }
        return {type: TOKEN_TYPES.symbol, value: symbol};
    }

    const _processNumber = () => {
        let size, base, number;

        const _microProcessNumber = () => {
            let number = "";
            while(isNumberReal(data[current])) {
                number += data[current];
                current++;
            }
            return number
        }

        const _microProcessNumberBase = () => {
            let number = "";
            while(isNumberBase(data[current])) {
                number += data[current];
                current++;
            }
            return number
        }

        while(isNumberFormat(data[current])) {
            if(isNumberReal(data[current])) 
                number = _microProcessNumber();
            else if(data[current] === '\'') {
                size = number;
                current++;
            } else if(isBase(data[current])) {
                base = data[current];
                current++;
            } else if(base && isNumberBase(data[current]))
                number = _microProcessNumberBase();
        }

        return {type: TOKEN_TYPES.number, size: size, base: base, value: number}
    }

    const _processSingleCharacter = () => {
        return {type: data[current++]}
    }

    const _processMathOp = () => {
        return {type: TOKEN_TYPES.mathOp, value: data[current++]}
    }

    const _processString = () => {
        let string = "";
        // Ignore begin double quotes
        current++;
        while(!isString(data[current])) {
            string += data[current];
            current++;
        }
        // Ignore end double quotes
        current++;

        return {type: TOKEN_TYPES.string, value: string}
    }
 
    while(current < data.length) {
        let currentChar = data[current];

        if(isWhitespace(currentChar))
            current++;
        else if(isDisplayTask(currentChar))
            _processDisplayTask()
        else if(isSymbol(currentChar))
            tokens.push(_processSymbols())
        else if(isNumber(currentChar))
            tokens.push(_processNumber())
        else if(isSingleCharacter(currentChar))
            tokens.push(_processSingleCharacter())
        else if(isMathOp(currentChar))
            tokens.push(_processMathOp())
        else if(isString(currentChar))
            tokens.push(_processString())
        else
            current++;
    }

    return tokens;
}

module.exports = lexer