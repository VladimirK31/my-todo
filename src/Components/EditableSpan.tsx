import { TextField } from '@mui/material'
import React, { ChangeEvent, useCallback, useState } from 'react'
type EditableSpanPropsType = {
  title: string
  callBack: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log('editable called')
  let [edit, setEdit] = useState(false)
  let [newTitle, setNewTitle] = useState(props.title)

  const onDoubleClickHandler = useCallback(() => {
    setEdit(!edit)
    props.callBack(newTitle)
  }, [])
  let onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    {
      setNewTitle(e.currentTarget.value)
    }
  }, [])
  return edit ? (
    <TextField
      variant="standard"
      value={newTitle}
      onChange={onChangeHandler}
      onBlur={onDoubleClickHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
  )
})
