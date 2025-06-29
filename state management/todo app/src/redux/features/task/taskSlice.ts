import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { removeUser } from "../user/userSlice";


interface InitialState {
    tasks: ITask[],
    filter: 'all' | 'low' | 'high' | 'medium'
}

const initialState: InitialState = {
    tasks: [
        {
            id: "dklafffffffff",
            isCompleted: false,
            title: 'Hello',
            description: "helllllo",
            priority: 'High',
            dueDate: "2025-01-12",
            assignedTo: null
        }
    ],
    filter: 'all'

}

/* type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">;

const createTask = (taskData: DraftTask): ITask => {
    return { id: nanoid(), isCompleted: false, ...taskData }

} */


const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
            /*  const taskData = createTask(action.payload */
            const id = uuidv4();
            const taskData = {
                ...action.payload,
                id,
                isCompleted: false,
                assignedTo: action.payload.assignedTo ? action.payload.assignedTo : null
            }
            state.tasks.push(taskData)
        },
        toggleCompleteState: (state, action: PayloadAction<string>) => {
            console.log(action)
            state.tasks.forEach((task) =>
                task.id === action.payload ?
                    (task.isCompleted = !task.isCompleted) : task)
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
        },
        updateFilter: (state, action: PayloadAction<"all" | "low" | "medium" | "high">) => {
            state.filter = action.payload


        }

    },
    extraReducers: (builder) => {
        builder.addCase(removeUser, (state, action) => {
            state.tasks.forEach(task => task.assignedTo === action.payload ? task.assignedTo = null : task)
        })
    },
})

export const selectTasks = (state: RootState) => {
    const filter = state.todo.filter

    if (filter === 'low') {
        return state.todo.tasks.filter((task) => task.priority === 'Low')
    } else if (filter === 'medium') {
        return state.todo.tasks.filter((task) => task.priority === 'Medium')
    } else if (filter === 'high') {
        return state.todo.tasks.filter((task) => task.priority === 'High')
    }
    else {
        return state.todo.tasks
    }
}
export const selectFilter = (state: RootState) => {
    return state.todo.filter
}

export const { addTask, toggleCompleteState, deleteTask, updateFilter } = taskSlice.actions

export default taskSlice.reducer