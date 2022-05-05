import React, { ChangeEvent, useState } from 'react'
type EditableSpanPropsType = {
  title: string
  callBack: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  let [edit, setEdit] = useState(false)
  let [newTitle, setNewTitle] = useState(props.title)

  const onDoubleClickHandler = () => {
    setEdit(!edit)
    props.callBack(newTitle)
  }
  let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    {
      setNewTitle(e.currentTarget.value)
    }
  }
  return edit ? (
    <input
      value={newTitle}
      onChange={onChangeHandler}
      onBlur={onDoubleClickHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
  )
}
