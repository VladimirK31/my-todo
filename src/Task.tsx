import { Delete } from '@mui/icons-material'
import { Checkbox, IconButton } from '@mui/material'
import React, { useCallback } from 'react'
import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { TasksPropsType } from './App'
import { TodolistType } from './AppWithRedux'
import { EditableSpan } from './Components/EditableSpan'
import { deleteTaskAC } from './State/TasksReducer '

type TasksPropsTypeForTAsks = {
  t: TasksPropsType
  changeStatusHandler: (checkedValue: boolean, tID: string) => void
  editTaskHandler: (tID: string, newTitle: string) => void
  todolist: TodolistType
}

export const Tasks = React.memo((props: TasksPropsTypeForTAsks) => {
  console.log('tasks called')

  const dispatch = useDispatch()

  const onClickHandler = () =>
    dispatch(deleteTaskAC(props.t.id, props.todolist.id))
  const onchangeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      props.changeStatusHandler(e.currentTarget.checked, props.t.id),
    [props.t.id]
  )
  return (
    <div key={props.t.id} className={props.t.isDone ? 'is-done' : ''}>
      <Checkbox onChange={onchangeStatusHandler} checked={props.t.isDone} />

      <EditableSpan
        title={props.t.title}
        callBack={(newTitle: string) =>
          props.editTaskHandler(props.t.id, newTitle)
        }
      />
      <IconButton onClick={onClickHandler} size="small">
        <Delete fontSize="small" />
      </IconButton>
    </div>
  )
})
