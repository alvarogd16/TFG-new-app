// server/index.js
const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const app = express()

const router = require('./controllers/router.js')
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')

const server = http.createServer(app)

const PORT = 3001

app.use(express.json())

app.use('/api', router)

const io = socketIO(server)

const sendData = (socket) => {
    socket.emit('client:data', { prueba: 'prueba' })
}

let runInterval;

io.on("connection", (socket) => {
    console.log('newConnection')
    socket.on('client:init', () => {
        console.log('Iniciando simulación...')
        console.log('Generando el fichero verilog...')
        console.log('Inciando Verilator...')
        console.log('Establaciendo comunicación con Verilator...')
        setTimeout(() => { console.log('[OK] Comunicación establecida'); socket.emit('client:finishInit') }, 1000)
    })

    socket.on('client:run', () => {
        console.log('Iniciar run')
        runInterval = setInterval(() => sendData(socket), 50)
    })

    socket.on('client:pause', () => {
        console.log('Pause run sim')
        clearInterval(runInterval)
    })

    socket.on('client:tick', () => {
        console.log('Event tick')
        setTimeout(() => sendData(socket), 100)
    })

    socket.on('client:finish', () => {
        console.log('Finalizando simulación...')
        setTimeout(() => { console.log('[OK] Simulación finalizada'); socket.emit('client:finishFinish') }, 1000)
    })
})

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(notFound)
app.use(handleErrors)

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});