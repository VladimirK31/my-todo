import React, { ChangeEvent, useState, KeyboardEvent } from 'react'

type FullInputPropsType = {
  callBack: (title: string) => void
}

export const FullInput = (props: FullInputPropsType) => {
  let [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    {
      setTitle(e.currentTarget.value)
    }
  }
  let addTask = () => {
    if (title.trim() !== '') {
      props.callBack(title.trim())
      setTitle('')
    } else {
      setError('Title is required')
    }
  }
  let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      addTask()
    }
  }
  return (
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
  )
}
