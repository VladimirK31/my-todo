import { Delete } from '@mui/icons-material'
import { Button, Checkbox, IconButton } from '@mui/material'

import React, { ChangeEvent, useCallback } from 'react'
import { FilterValueType, TasksPropsType } from './App'
import './App.css'
import { EditableSpan } from './Components/EditableSpan'
import { FullInput } from './Components/FullInput'

export type TodolistPropsType = {
  todolistID: string
  filter: FilterValueType
  title: string
  tasks: TasksPropsType[]
  deleteTask: (taskid: string, todolistID: string) => void
  changeFilter: (todolistID: string, value: FilterValueType) => void
  addTask: (title: string, taskID: string) => void
  changeStatus: (
    currentId: string,
    checkedValue: boolean,
    todolistID: string
  ) => void
  removeTodolist: (todolistID: string) => void
  editTodolist: (todolistID: string, newTitle: string) => void
  editTask: (taskID: string, newTitle: string, todolistID: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
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
  const changeStatusHandler = (checkedValue: boolean, tID: string) => {
    props.changeStatus(tID, checkedValue, props.todolistID)
  }
  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistID)
  }

  const addTskHandler = useCallback((title: string) => {
    props.addTask(title, props.todolistID)
  }, [])

  const editTodolistHandler = (newTitle: string) => {
    props.editTodolist(props.todolistID, newTitle)
  }
  const editTaskHandler = (tID: string, newTitle: string) => {
    props.editTask(tID, newTitle, props.todolistID)
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
          const onClickHandler = () => props.deleteTask(t.id, props.todolistID)
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
})
