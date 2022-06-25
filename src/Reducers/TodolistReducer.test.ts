import { v1 } from 'uuid'
import { FilterValueType, TodolistType } from '../App'
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistNewTitleTypeAC,
  RemoveTodolistAC,
  todolistReducer,
} from './TodolistReducer'
let todolistId1: string
let todolistId2: string

let startState: Array<TodolistType>

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'All' },
    { id: todolistId2, title: 'What to buy', filter: 'All' },
  ]
})

test('correct todolist should be removed', () => {
  const endState = todolistReducer(startState, RemoveTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  let newTodolistTitle = 'New Todolist'

  const endState = todolistReducer(startState, AddTodolistAC(newTodolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist'

  const endState = todolistReducer(
    startState,
    ChangeTodolistNewTitleTypeAC(todolistId2, newTodolistTitle)
  )

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValueType = 'Completed'

  const endState = todolistReducer(
    startState,
    ChangeTodolistFilterAC(todolistId2, newFilter)
  )

  expect(endState[0].filter).toBe('All')
  expect(endState[1].filter).toBe(newFilter)
})
