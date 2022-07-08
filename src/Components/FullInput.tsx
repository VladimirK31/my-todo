import { AddBox } from '@mui/icons-material'
import { Icon, IconButton, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import React, { ChangeEvent, useState, KeyboardEvent } from 'react'

type FullInputPropsType = {
  callBack: (title: string) => void
}

export const FullInput = React.memo((props: FullInputPropsType) => {
  console.log('FullInput')

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
    if (error !== null) {
      setError(null)
    }

    if (e.charCode === 13) {
      addTask()
    }
  }
  return (
    <div>
      <TextField
        label={'Type value'}
        variant={'outlined'}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTask}>
        <AddBox color="primary" />
      </IconButton>
    </div>
  )
})
