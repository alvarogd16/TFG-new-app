const TOKEN_TYPES = {
    symbol: "symbol",
    number: "number",
    mathOp: "mathOp",
    string: "string",
    openParenthesis: '(',
    closeParenthesis: ')',
    openBracket: '[',
    closeBracket: ']',
    numberSign: '#',
    colon: ':',
    semicolon: ';'
}

const PORT_TYPES = [
    "wire",
    "reg"
]

// Sopose that all numbers are integers
const numberToDecimal = (number, base) => {
    base = base.toUpperCase();
    if(base === "D")
        return number
    else if(base === "B")
        return parseInt(number, 2)
    else if(base === "O")
        return parseInt(number, 8)
    else if(base === "H")
        return parseInt(number, 16)
}

module.exports = {TOKEN_TYPES, PORT_TYPES, numberToDecimal}