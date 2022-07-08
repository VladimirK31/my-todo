import { Delete } from '@mui/icons-material'
import { Button, Checkbox, IconButton } from '@mui/material'

import React, { ChangeEvent, useCallback } from 'react'
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
import { Tasks } from './Task'

export type TodolistPropsType = {
  todolist: TodolistType
}

export const TodolistWithTasks = React.memo(
  ({ todolist }: TodolistPropsType) => {
    console.log('todolist called')

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

    let changeFilterAll = useCallback(() => {
      dispatch(ChangeTodolistFilterAC(todolist.id, 'All'))
    }, [todolist.id, dispatch])
    let changeFilterActive = useCallback(() => {
      dispatch(ChangeTodolistFilterAC(todolist.id, 'Active'))
    }, [todolist.id, dispatch])
    let changeFilterCompleted = useCallback(() => {
      dispatch(ChangeTodolistFilterAC(todolist.id, 'Completed'))
    }, [todolist.id, dispatch])

    const changeStatusHandler = useCallback(
      (checkedValue: boolean, tID: string) => {
        dispatch(changeTaskStatusAC(tID, checkedValue, todolist.id))
      },
      [todolist.id, dispatch]
    )
    const removeTodolistHandler = useCallback(() => {
      let action = RemoveTodolistAC(todolist.id)
      dispatch(action)
    }, [todolist.id, dispatch])

    const addTskHandler = useCallback(
      (title: string) => {
        dispatch(addTaskAC(title, todolist.id))
      },
      [todolist.id, dispatch]
    )

    const editTodolistHandler = useCallback(
      (newTitle: string) => {
        dispatch(ChangeTodolistNewTitleTypeAC(todolist.id, newTitle))
      },
      [todolist.id, dispatch]
    )
    const editTaskHandler = useCallback(
      (tID: string, newTitle: string) => {
        dispatch(changeTitleStatusAC(tID, newTitle, todolist.id))
      },
      [todolist.id, dispatch]
    )

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
          {tasks.map((t) => (
            <Tasks
              key={t.id}
              todolist={todolist}
              t={t}
              changeStatusHandler={changeStatusHandler}
              editTaskHandler={editTaskHandler}
            />
          ))}
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
)
