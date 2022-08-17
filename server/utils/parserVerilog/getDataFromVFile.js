/*
    The mayor part of the syntax specification is from 
    https://www.chipverify.com/verilog/verilog-syntax
*/

const fs = require('fs');
const lexer = require('./lexer.js')
const parse = require('./parser.js')
const treeToInfo = require('./treeToInfo.js')

const removeComments = (data) => {
    // https://stackoverflow.com/questions/37051797/remove-comments-from-string-with-javascript-using-javascript
    return data.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'');
}

const getDataFromVFile = (file) => {
    try {
        let data = fs.readFileSync(file, 'utf8');

        data = removeComments(data);
    
        // Convert string into list of tokens
        data = lexer(data);
    
        // Convert a list of tokens in a "tree"
        data = parse(data);
    
        // Convert the tree into a info object ready to the main program
        data = treeToInfo(data);

        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = getDataFromVFile