import express from 'express'
import { AppDataSource } from './data-source'

AppDataSource.initialize().then(() => {
	const app = express()

	app.use(express.json())

    app.get("/", (req, res) => {
        return res.json("Tudo certo")
    })

    console.log(`Servidor rodando em: localhost:${process.env.PORT}`)
	return app.listen(process.env.PORT)
})