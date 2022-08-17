const ERROR_HANDLERS = {
    defaultError: (res, error) => {
        console.error(error)
        res.status(500).end()
    }
}

module.exports = (error, req, res, next) => {
    const handler = 
        ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
    
    handler(res, error)
}