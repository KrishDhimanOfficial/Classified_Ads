import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import config from './config/config.js'
import cluster from 'cluster'
import numCPUs from 'os'
import connectDB from './config/dbconnection.js'
import superAdminRoutes from './routes/superAdmin.routes.js'

dotenv.config()
const app = express()

if (cluster.isPrimary) {
    for (let i = 0; i < numCPUs.availableParallelism(); ++i)  cluster.fork()
    console.log(`Primary ${process.pid} is running`)
    cluster.on('exit', (worker, code, signal) => console.log(`worker ${worker.process.pid} died`))
} else {
    connectDB() // Connection To The Database

    // middlewares
    app.use(cors(
        {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        }
    ))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/uploads', express.static('uploads'))
    app.use('/assets', express.static('assets'))

    // view Engine
    app.set('views', app.use('/views', express.static('views')))
    app.set('view engine', 'ejs')
    app.set('views', 'views')

    // Routes
    app.use('/admin', superAdminRoutes)
    app.use('/*', (req, res) => res.render('404'))

    app.listen(config.port, () => {
        try {
            console.log(`Running on http://localhost:${config.port}`)
        } catch (error) {
            console.log('Server crash : ' + error.message)
        }
    })
}