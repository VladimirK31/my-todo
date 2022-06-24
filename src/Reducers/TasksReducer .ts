import { v1 } from 'uuid'
import { TasksStateType } from '../App'
import { AddTodolistAT, RemoveTodolistAT } from './TodolistReducer'

export type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleStatusAT = ReturnType<typeof changeTitleStatusAC>

export type AllActionType =
  | DeleteTaskAT
  | AddTaskAT
  | ChangeTaskStatusAT
  | ChangeTitleStatusAT
  | AddTodolistAT
  | RemoveTodolistAT

export const tasksReducer = (
  tasks: TasksStateType,
  action: AllActionType
): TasksStateType => {
  switch (action.type) {
    case 'DELETE-TASK': {
      return {
        ...tasks,
        [action.todolistId]: tasks[action.todolistId].filter(
          (t) => t.id !== action.taskId
        ),
      }
    }

    case 'ADD-TASK': {
      return {
        ...tasks,
        [action.todolistId]: [
          { id: v1(), title: action.title, isDone: false },
          ...tasks[action.todolistId],
        ],
      }
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...tasks,
        [action.todolistId]: tasks[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, isDone: action.isDone } : t
        ),
      }
    }
    case 'CHANGE-TITLE-STATUS': {
      return {
        ...tasks,
        [action.todolistId]: tasks[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, title: action.title } : t
        ),
      }
    }
    case 'ADD-TODOLIST': {
      return {
        ...tasks,
        [action.todolistId]: [],
      }
    }
    case 'REMOVE-TODOLIST': {
      let copyTasks = { ...tasks }
      delete copyTasks[action.id]
      return copyTasks
    }

    default:
      return tasks
  }
}

export const deleteTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: 'DELETE-TASK',
    taskId,
    todolistId,
  } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: 'ADD-TASK',
    title,
    todolistId,
  } as const
}
export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    taskId,
    isDone,
    todolistId,
  } as const
}
export const changeTitleStatusAC = (
  taskId: string,
  title: string,
  todolistId: string
) => {
  return {
    type: 'CHANGE-TITLE-STATUS',
    taskId,
    title,
    todolistId,
  } as const
}
