const fs = require('fs')
const crypto = require('crypto')
const getDataFromVFile = require('../../utils/parserVerilog/getDataFromVFile.js')

const VERILOG_FILES_PATH = './server/data/verilogFiles'
const BLOCKS_FILE = './server/data/blocks.json'

module.exports = {
    getVFilesNames: (req, res, next) => {
        try {
            const fileNames = fs.readdirSync(VERILOG_FILES_PATH)
            const blocks = JSON.parse(fs.readFileSync(BLOCKS_FILE))

            /**
             * Left only the files that they havent a block asociated
             */
            const defFiles = fileNames.filter(file => 
                                !blocks.some(block => 
                                    block.moduleName === file.slice(0, -2)
                                )
                            )
            res.json(defFiles)
        } catch(err) { next(err) }
    },
    getFileInfo: (req, res, next) => {
        const { fileName } = req.params
        const filePath = VERILOG_FILES_PATH + '/' + fileName;
        try {
            const fileContent = getDataFromVFile(filePath)
            // Calculate the hash
            const fileBuffer = fs.readFileSync(filePath)
            fileContent.hash = crypto.createHash('sha1').update(fileBuffer).digest('base64')
            res.json(fileContent)
        } catch(err) { next(err) }
    }
}