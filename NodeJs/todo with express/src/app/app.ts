import express, { Application, NextFunction, Request, Response } from 'express'
import { todosRouter } from './todos/todosRoute'
import { error } from 'console'
const app: Application = express()

//json data parse kore object nie jay (middleware)
app.use(express.json())

app.use('/', todosRouter)


/* app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Todos App')
}) */

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log({
        url: req.url,
        method: req.method,
        header: req.header
    })
    next()
},
    (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send("welcome to Todo App")
        } catch (error) {
            next(error)
        }
    }
)

app.get('/error', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send('Welcome to error er duniya')
    } catch (error) {
        next(error)
    }
})

// upor er jodi kono error na dhuko tahole eita dora porbe 
app.use((req, res, next) => {
    res.status(404).json({ message: "Route Not Found" })
})


// global error handling 
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        console.log("error", error)
        res.status(500).json({ message: "Something went wrong", error })
    }
})


export default app;


/*
* server - server handing like - starting,closing error handling of server, only related to server 
* app file - routing,handle,middleware,route related error
* app folder - app business logic handing like create read update delete, database related works  
*/