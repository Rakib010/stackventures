import express, { Application, Request, Response } from 'express';
import { notesRoutes } from './app/controller/notes.controller';
import { userRoutes } from './app/controller/user.controller';

const app: Application = express()

app.use(express.json())

app.use('/notes', notesRoutes)
app.use('/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to Mongoose App")
})

export default app