const express = require('express'); 
const router = express.Router(); 
const { fork } = require('child_process'); 


router.get('/info', (_req, res)=>{
    const processInfo = {
        argumentosDeEntrada: process.argv.slice(2),
        plataforma: process.platform,
        versionNode: process.versions['node'],
        memoriaTotalReservada: process.memoryUsage()['rss'],
        exPath: process.argv[1],
        processID: process.pid,
        carpetaProyecto: process.cwd()
    };

    res.status(200).json(processInfo);
})

const randomNumbersGeneratorFork = fork('function/forks.js')
router.get('/randoms',(req, res)=>{
    const cant = req.query.cant || 5000

    randomNumbersGeneratorFork.on('message', (resultado) => {
        res.status(200).json(resultado);
    })
    randomNumbersGeneratorFork.send(cant);
})

module.exports = router; 