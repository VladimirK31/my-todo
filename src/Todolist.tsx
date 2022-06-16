import { Delete } from '@mui/icons-material'
import { Button, Checkbox, IconButton } from '@mui/material'

import React, { ChangeEvent } from 'react'
import { FilterValueType, TasksPropsType } from './App'
import './App.css'
import { EditableSpan } from './Components/EditableSpan'
import { FullInput } from './Components/FullInput'

export type TodolistPropsType = {
  todolistID: string
  filter: FilterValueType
  title: string
  tasks: TasksPropsType[]
  deleteTask: (todolistID: string, taskid: string) => void
  changeFilter: (todolistID: string, value: FilterValueType) => void
  addTask: (taskID: string, title: string) => void
  changeStatus: (
    todolistID: string,
    currentId: string,
    checkedValue: boolean
  ) => void
  removeTodolist: (todolistID: string) => void
  editTodolist: (todolistID: string, newTitle: string) => void
  editTask: (todolistID: string, taskID: string, newTitle: string) => void
}

export function Todolist(props: TodolistPropsType) {
  // let [title, setTitle] = useState('')
  // const [error, setError] = useState<string | null>(null)
  // let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   {
  //     setTitle(e.currentTarget.value)
  //   }
  // }
  // let addTask = () => {
  //   if (title.trim() !== '') {
  //     props.addTask(props.todolistID, title.trim())
  //     setTitle('')
  //   } else {
  //     setError('Title is required')
  //   }
  // }
  let changeFilterAll = () => {
    props.changeFilter(props.todolistID, 'All')
  }
  let changeFilterActive = () => {
    props.changeFilter(props.todolistID, 'Active')
  }
  let changeFilterCompleted = () => {
    props.changeFilter(props.todolistID, 'Completed')
  }
  // let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  //   setError(null)
  //   if (e.charCode === 13) {
  //     addTask()
  //   }
  // }
  const changeStatusHandler = (tID: string, checkedValue: boolean) => {
    props.changeStatus(props.todolistID, tID, checkedValue)
  }
  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistID)
  }

  const addTskHandler = (title: string) => {
    props.addTask(props.todolistID, title)
  }

  const editTodolistHandler = (newTitle: string) => {
    props.editTodolist(props.todolistID, newTitle)
  }
  const editTaskHandler = (tID: string, newTitle: string) => {
    props.editTask(props.todolistID, tID, newTitle)
  }
  return (
    <div>
      <h3>
        <EditableSpan title={props.title} callBack={editTodolistHandler} />
        <IconButton onClick={removeTodolistHandler}>
          <Delete />
        </IconButton>
      </h3>
      <FullInput callBack={addTskHandler} />
      {/* <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button className={'buttonInput'} onClick={addTask}>
          +
        </button>
        {error && <div className="error-message">{error} </div>}
      </div> */}
      <div>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.deleteTask(props.todolistID, t.id)
          const onchangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeStatusHandler(t.id, e.currentTarget.checked)
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
        variant={props.filter === 'All' ? 'contained' : 'text'}
        onClick={changeFilterAll}
      >
        All
      </Button>
      <Button
        variant={props.filter === 'Active' ? 'contained' : 'text'}
        onClick={changeFilterActive}
      >
        Active
      </Button>
      <Button
        variant={props.filter === 'Completed' ? 'contained' : 'text'}
        onClick={changeFilterCompleted}
      >
        Completed
      </Button>
    </div>
  )
}
