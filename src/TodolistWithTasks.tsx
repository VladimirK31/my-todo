import { Delete } from '@mui/icons-material'
import { Button, Checkbox, IconButton } from '@mui/material'

import React, { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { FilterValueType, TasksPropsType, TasksStateType } from './App'
import './App.css'
import { TodolistType } from './AppWithRedux'
import { EditableSpan } from './Components/EditableSpan'
import { FullInput } from './Components/FullInput'
import { AppRootStateType } from './State/Store'
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTitleStatusAC,
  deleteTaskAC,
} from './State/TasksReducer '
import {
  ChangeTodolistFilterAC,
  ChangeTodolistNewTitleTypeAC,
  RemoveTodolistAC,
} from './State/TodolistReducer'

export type TodolistPropsType = {
  todolist: TodolistType
}

export function TodolistWithTasks({ todolist }: TodolistPropsType) {
  let tasks = useSelector<AppRootStateType, Array<TasksPropsType>>(
    (state) => state.tasks[todolist.id]
  )

  if (todolist.filter === 'Active') {
    tasks = tasks.filter((f) => f.isDone == false)
  }
  if (todolist.filter === 'Completed') {
    tasks = tasks.filter((f) => f.isDone == true)
  }
  const dispatch = useDispatch()

  let changeFilterAll = () => {
    dispatch(ChangeTodolistFilterAC(todolist.id, 'All'))
  }
  let changeFilterActive = () => {
    dispatch(ChangeTodolistFilterAC(todolist.id, 'Active'))
  }
  let changeFilterCompleted = () => {
    dispatch(ChangeTodolistFilterAC(todolist.id, 'Completed'))
  }

  const changeStatusHandler = (checkedValue: boolean, tID: string) => {
    dispatch(changeTaskStatusAC(tID, checkedValue, todolist.id))
  }
  const removeTodolistHandler = () => {
    let action = RemoveTodolistAC(todolist.id)
    dispatch(action)
  }

  const addTskHandler = (title: string) => {
    dispatch(addTaskAC(title, todolist.id))
  }

  const editTodolistHandler = (newTitle: string) => {
    dispatch(ChangeTodolistNewTitleTypeAC(todolist.id, newTitle))
  }
  const editTaskHandler = (tID: string, newTitle: string) => {
    dispatch(changeTitleStatusAC(tID, newTitle, todolist.id))
  }
  return (
    <div>
      <h3>
        <EditableSpan title={todolist.title} callBack={editTodolistHandler} />
        <IconButton onClick={removeTodolistHandler}>
          <Delete />
        </IconButton>
      </h3>
      <FullInput callBack={addTskHandler} />

      <div>
        {tasks.map((t) => {
          const onClickHandler = () => dispatch(deleteTaskAC(t.id, todolist.id))
          const onchangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeStatusHandler(e.currentTarget.checked, t.id)
          return (
            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
              <Checkbox onChange={onchangeStatusHandler} checked={t.isDone} />

              <EditableSpan
                title={t.title}
                callBack={(newTitle: string) => editTaskHandler(t.id, newTitle)}
              />
              <IconButton onClick={onClickHandler} size="small">
                <Delete fontSize="small" />
              </IconButton>
            </div>
          )
        })}
      </div>
      <Button
        variant={todolist.filter === 'All' ? 'contained' : 'text'}
        onClick={changeFilterAll}
      >
        All
      </Button>
      <Button
        variant={todolist.filter === 'Active' ? 'contained' : 'text'}
        onClick={changeFilterActive}
      >
        Active
      </Button>
      <Button
        variant={todolist.filter === 'Completed' ? 'contained' : 'text'}
        onClick={changeFilterCompleted}
      >
        Completed
      </Button>
    </div>
  )
}
