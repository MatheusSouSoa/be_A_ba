import express from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'
const cors = require("cors")

AppDataSource.initialize().then(() => {
    const app = express()

    app.use(express.json())

    const corsOptions = {
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, 
    }

    app.use(cors(corsOptions))

    app.use(routes)

    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`)
    return app.listen(process.env.PORT)
})
