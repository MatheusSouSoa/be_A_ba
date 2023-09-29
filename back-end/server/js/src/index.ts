import express from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'

AppDataSource.initialize().then(() => {
	const app = express()

	app.use(express.json())

    app.use(routes)    

    console.log(`Servidor rodando em: localhost:${process.env.PORT}`)
	return app.listen(process.env.PORT)
})