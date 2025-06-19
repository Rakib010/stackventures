import { Request, Response } from "express"
import { Mango } from "./mango.model"

// post method 
const createMango = async (req: Request, res: Response) => {
    try {
        const body = req.body;

        const mango = await Mango.create(body);

        res.status(201).json({
            success: true,
            message: "Mango created successfully",
            mango,
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Failed to create Mango",
            error: error.message || "Something went wrong",
            errors: error.errors || null,
        });
    }
};
// get method 
const getMango = async (req: Request, res: Response) => {
    try {
        const mango = await Mango.find();

        res.status(201).json({
            success: true,
            message: "Mango retrieved successfully",
            mango,
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Failed to create Mango",
            error: error.message || "Something went wrong",
            errors: error.errors || null,
        });
    }
};
// get single data by params
const getMangoById = async (req: Request, res: Response) => {
    try {
        const mangoId = req.params.id
        const mango = await Mango.findById(mangoId);

        res.status(201).json({
            success: true,
            message: "Mango get successfully",
            mango,
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Failed to create Mango",
            error: error.message || "Something went wrong",
            errors: error.errors || null,
        });
    }
};
// updated method
const updateMango = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const mango = await Mango.findByIdAndUpdate(id, req.body,
            { new: true, runValidators: true }
        );
        res.status(201).json({
            success: true,
            message: "Mango updated successfully",
            mango,
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Failed to create Mango",
            error: error.message || "Something went wrong",
            errors: error.errors || null,
        });
    }
};
// delete method
const deleteMango = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const mango = await Mango.findByIdAndDelete(id);

        res.status(201).json({
            success: true,
            message: "Mango Delete successfully",
            mango,
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Failed to create Mango",
            error: error.message || "Something went wrong",
            errors: error.errors || null,
        });
    }
};




export const mangoController = {
    createMango,
    getMango,
    getMangoById,
    updateMango,
    deleteMango,
}