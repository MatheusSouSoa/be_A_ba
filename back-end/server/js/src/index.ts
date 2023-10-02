import express from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'
const cors = require("cors")

AppDataSource.initialize().then(() => {
    const app = express()

    app.use(express.json())

    // Configuração personalizada do CORS para permitir solicitações do localhost:3000
    const corsOptions = {
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Permite o uso de cookies, se aplicável
    }

    app.use(cors(corsOptions))

    app.use(routes)

    console.log(`Servidor rodando em: localhost:${process.env.PORT}`)
    return app.listen(process.env.PORT)
})
