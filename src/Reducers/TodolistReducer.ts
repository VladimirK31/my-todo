import { v1 } from 'uuid'
import { FilterValueType, TodolistType } from '../App'

export type RemoveTodolistAT = {
  type: 'REMOVE-TODOLIST'
  id: string
}
export type AddTodolistAT = {
  type: 'ADD-TODOLIST'
  title: string
}

export type ChangeTodolistNewTitleTypeAT = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  newTitle: string
}

export type ChangeTodolistFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER'
  value: FilterValueType
  id: string
}

export type AllActionType =
  | RemoveTodolistAT
  | AddTodolistAT
  | ChangeTodolistNewTitleTypeAT
  | ChangeTodolistFilterAT

export const todolistReducer = (
  todolists: Array<TodolistType>,
  action: AllActionType
): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todolists.filter((el) => el.id !== action.id)

    case 'ADD-TODOLIST':
      let newID = v1()
      let newTodolist: TodolistType = {
        id: newID,
        title: action.title,
        filter: 'All',
      }
      return [...todolists, newTodolist]

    case 'CHANGE-TODOLIST-TITLE':
      return todolists.map((el) =>
        el.id === action.id ? { ...el, title: action.newTitle } : el
      )
    case 'CHANGE-TODOLIST-FILTER':
      return todolists.map((el) =>
        el.id === action.id ? { ...el, filter: action.value } : el
      )
    default:
      return todolists
  }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => {
  return {
    type: 'REMOVE-TODOLIST',
    id: id,
  }
}
export const AddTodolistAC = (title: string): AddTodolistAT => {
  return {
    type: 'ADD-TODOLIST',
    title: title,
  }
}
export const ChangeTodolistNewTitleTypeAC = (
  id: string,
  newTitle: string
): ChangeTodolistNewTitleTypeAT => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    newTitle,
  }
}
export const ChangeTodolistFilterAC = (
  id: string,
  value: FilterValueType
): ChangeTodolistFilterAT => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    value,
  }
}
