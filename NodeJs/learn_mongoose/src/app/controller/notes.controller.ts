import { Note } from "../model/notes.model"
import express, { Request, Response } from "express"


export const notesRoutes = express.Router()


notesRoutes.post('/create-note', async (req: Request, res: Response) => {
    const body = req.body

    // notes Routes approach - 1 of creating a data 
    // const myNote = new Note({
    //     title: "Learning Mongoose",
    // })
    // await myNote.save() 
   
    // approach - 2 
    const note = await Note.create(body)

    res.status(201).json({
        success: true,
        message: "Note created successfully",
        note
    })
})
notesRoutes.get('/', async (req: Request, res: Response) => {
    const notes = await Note.find().populate("userId")

    res.status(201).json({
        success: true,
        message: "Notes get successfully",
        notes
    })
})
notesRoutes.get('/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    const notes = await Note.findById(noteId)
    //const notes = await Note.findOne({ _id: noteId })
    //const notes = await Note.findOne({"title": "Learning Mongoose"})


    res.status(201).json({
        success: true,
        message: "get single note",
        notes
    })
})
notesRoutes.patch('/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    const updatedBody = req.body

    const notes = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true })
    // const notes = await Note.findOneAndUpdate({ _id: noteId }, updatedBody, { new: true })
    //const notes = await Note.updateOne({ _id: noteId }, updatedBody, { new: true })

    res.status(201).json({
        success: true,
        message: "Updated successfully ",
        notes
    })
})
notesRoutes.delete('/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId

    const notes = await Note.findByIdAndDelete(noteId)
    //const notes = await Note.findOneAndDelete({ _id: noteId })
    //const notes = await Note.deleteOne({ _id: noteId })

    res.status(201).json({
        success: true,
        message: "Deleted successfully ",
        notes
    })
})