// server/index.js
const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const app = express()

const router = require('./controllers/router.js')
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')
const { spawn, execFile } = require('child_process')

const server = http.createServer(app)

const PORT = 3001

app.use(express.json())

app.use('/api', router)

const io = socketIO(server)

const sendData = (socket) => {
    socket.emit('client:data', { prueba: 'prueba' })
}


// CAMBIAR FICHERO

const { exec } = require = require('child_process');


let runInterval, child;

const initSimulator = () => {
    child = spawn('./server/utils/simulator/init.sh', {'detached': true})

    child.stdout.on('data', (data) => {
        console.log('stdout', data.toString())
    })

    child.stderr.on('data', data => {
        console.log('stderr', data.toString())
    })

    child.on('close', code => {
        console.log("Child closed code:", code)
    })
    
    process.on('SIGINT', () => {
        console.log('Process Exit', child.pid, child.killed);
        try{
            process.kill(-child.pid)
        } catch(e) {
            console.log(`Process ${child.pid} already killed`)
        }
        process.exit(0)
    });
}

const finishSimulator = () => {
    console.log('Bye bye child');
    console.log('childPID', child.pid)
    try{
        process.kill(-child.pid)
    } catch(e) {
        console.log(`Process ${child.pid} already killed`)
    }
}

const clientInit = () => {
    console.log('Iniciando simulación...')
    console.log('Generando el fichero verilog...')
    console.log('Inciando Verilator...')
    initSimulator()
    console.log('Establaciendo comunicación con Verilator...')
}

const clientTick = (sSocket) => {
    sSocket.emit('verilator:tick')
}

const clientRun = (sSocket) => {
    runInterval = setInterval(() => {
        sSocket.emit("verilator:tick")
    }, 100)
}

const clientPause = (sSocket) => {
    clearInterval(runInterval)
}

const clientFinish = (cSocket) => {
    if(isSimInit) {
        console.log('Finalizando simulación...')
        finishSimulator()
        setTimeout(() => { console.log('[OK] Simulación finalizada'); cSocket.emit('client:finishFinish') }, 1000)
        isSimInit = false
    }
}

const simEstablishConection = (cSocket) => {
    isSimInit = true
    console.log('[OK] Comunicación establecida')
    cSocket.emit('client:finishInit')
}

const simData = (cSocket, data) => {
    cSocket.emit('client:data', data)
}


let clientSocket, simSocket
let isSimInit = false;

io.of('/clients').on("connection", (socket) => {
    console.log("New client")
    clientSocket = socket

    clientSocket.on('client:init', clientInit)
    clientSocket.on('client:run', () => clientRun(simSocket))
    clientSocket.on('client:pause', () => clientPause(simSocket))
    clientSocket.on('client:tick', () => clientTick(simSocket))
    clientSocket.on('client:finish', () => clientFinish(clientSocket))
})

io.of("/simulator").on("connection", (socket) => {
    console.log("New simulator")
    simSocket = socket

    simSocket.on('verilator:establishConection', () => simEstablishConection(clientSocket))
    simSocket.on('verilator:data', (data) => simData(clientSocket, data))
})

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(notFound)
app.use(handleErrors)

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});