import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { FilterValueType, TasksPropsType } from './App'
import './App.css'

export type TodolistPropsType = {
  todolistID: string
  filter: FilterValueType
  title: string
  tasks: TasksPropsType[]
  deletTask: (todolistID: string, taskid: string) => void
  changeFilter: (todolistID: string, value: FilterValueType) => void
  addTask: (todolistID: string, title: string) => void
  changeStatus: (
    todolistID: string,
    currentId: string,
    checkedValue: boolean
  ) => void
  removeTodolist: (todolistID: string) => void
}

export function Todolist(props: TodolistPropsType) {
  let [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    {
      setTitle(e.currentTarget.value)
    }
  }
  let addTask = () => {
    if (title.trim() !== '') {
      props.addTask(props.todolistID, title.trim())
      setTitle('')
    } else {
      setError('Title is required')
    }
  }
  let changeFilterAll = () => {
    props.changeFilter(props.todolistID, 'All')
  }
  let changeFilterActive = () => {
    props.changeFilter(props.todolistID, 'Active')
  }
  let changeFilterComplited = () => {
    props.changeFilter(props.todolistID, 'Complited')
  }
  let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      addTask()
    }
  }
  const changeStatusHandler = (tID: string, checkedValue: boolean) => {
    props.changeStatus(props.todolistID, tID, checkedValue)
  }
  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistID)
  }

  return (
    <div className={'todo'}>
      <h3 className={'title'}>
        {props.title}
        <button className={'buttonTasks'} onClick={removeTodolistHandler}>
          X
        </button>
      </h3>

      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button className={'buttonInput'} onClick={addTask}>
          +
        </button>
        {error && <div className="error-message">{error} </div>}
      </div>
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
              {t.title}
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
