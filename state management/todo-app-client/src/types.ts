export interface ITask {
    id: string
    title: string
    description: string
    dueDate: string
    isCompleted: boolean
    priority: {
        type: string,
        enum: ["Low", "Medium", "High"]
    }

    assignedTo: string | null
}

export interface IUser {
    id: string,
    name: string
}