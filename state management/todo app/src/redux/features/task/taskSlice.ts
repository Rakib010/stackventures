import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice } from "@reduxjs/toolkit";


interface InitialState {
    tasks: ITask[],
    filter: 'low' | 'high' | 'medium'
}


const initialState: InitialState = {
    tasks: [
        {
            id: 'dflgfhello',
            title: "Name dew",
            description: 'Create home page',
            dueDate: "2025-11",
            isCompleted: false,
            priority: "High"
        },
        {
            id: 'helldsfkfdso',
            title: "Name dew",
            description: 'Create home page',
            dueDate: "2025-11",
            isCompleted: false,
            priority: "Medium"
        },
    ],
    filter: 'low'

}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},

})

export const selectTasks = (state: RootState) => {
    return state.todo.tasks
}
export const selectFilter = (state: RootState) => {
    return state.todo.filter
}

export default taskSlice.reducer