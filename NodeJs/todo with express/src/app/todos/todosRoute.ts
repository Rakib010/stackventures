import express, { Request, Response } from "express"
import fs from "fs"
import path from "path"
import { client } from "../../config/mongodb"
import { Collection } from './../../../node_modules/mongodb/src/collection';
import { ObjectId } from "mongodb";
export const todosRouter = express.Router()

const filepath = path.join(__dirname, '../../../db/todo.json')


todosRouter.get('/todos', async (req: Request, res: Response) => {
    const db = await client.db("todosDB")
    const collection = await db.collection("todos")
    const result = await collection.find({}).toArray()
    res.send({ message: 'Get data successfully', result })
})

todosRouter.post('/make-todos', async (req: Request, res: Response) => {
    const { title, description, priority } = req.body
    const db = await client.db("todosDB")
    const collection = await db.collection("todos")
    await collection.insertOne({
        title: title,
        description: description,
        priority: priority
    })
    const result = await collection.find({}).toArray()
    res.json(result)
})

todosRouter.get('/todo/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    const db = await client.db("todosDB")
    const collection = await db.collection("todos")

    const todoId = { _id: new ObjectId(id) }
    const todos = await collection.findOne(todoId)

    res.send(todos)
})

todosRouter.delete('/delete-todo/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    const db = await client.db("todosDB")
    const collection = await db.collection("todos")

    const todoId = { _id: new ObjectId(id) }
    const todos = await collection.deleteOne(todoId)

    res.send(todos)
})

todosRouter.put('/delete-todo/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, description, priority } = req.body

    const db = await client.db("todosDB")
    const collection = await db.collection("todos")

    const filter = { _id: new ObjectId(id) }
    const updatedTodo = {
        $set:
        { title, description, priority,}
    }

    const todos = await collection.updateOne(filter, updatedTodo)

    res.send(todos)
})









