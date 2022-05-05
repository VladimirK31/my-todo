import { stringify } from 'querystring'
import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { FilterValueType, TasksPropsType } from './App'
import './App.css'
import { EditableSpan } from './Components/EditableSpan'
import { FullInput } from './Components/FullInput'

export type TodolistPropsType = {
  todolistID: string
  filter: FilterValueType
  title: string
  tasks: TasksPropsType[]
  deletTask: (todolistID: string, taskid: string) => void
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
  let changeFilterComplited = () => {
    props.changeFilter(props.todolistID, 'Complited')
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
    <div className={'todo'}>
      <h3 className={'title'}>
        <EditableSpan title={props.title} callBack={editTodolistHandler} />
        <button className={'buttonTasks'} onClick={removeTodolistHandler}>
          X
        </button>
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
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.deletTask(props.todolistID, t.id)
          const onchangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeStatusHandler(t.id, e.currentTarget.checked)
          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <input
                className={'checkbox'}
                type="checkbox"
                onChange={onchangeStatusHandler}
                checked={t.isDone}
              />

              <EditableSpan
                title={t.title}
                callBack={(newTitle: string) => editTaskHandler(t.id, newTitle)}
              />
              <button className={'buttonTasks'} onClick={onClickHandler}>
                x
              </button>
            </li>
          )
        })}
      </ul>
      <button
        className={props.filter === 'All' ? 'active-filter' : 'filterbutton'}
        onClick={changeFilterAll}
      >
        All
      </button>
      <button
        className={props.filter === 'Active' ? 'active-filter' : 'filterbutton'}
        onClick={changeFilterActive}
      >
        Active
      </button>
      <button
        className={
          props.filter === 'Complited' ? 'active-filter' : 'filterbutton'
        }
        onClick={changeFilterComplited}
      >
        Complited
      </button>
    </div>
  )
}
