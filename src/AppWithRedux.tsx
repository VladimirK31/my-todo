import { Menu } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { useReducer, useState } from 'react'
import { v1 } from 'uuid'
import './App.css'
import { FullInput } from './Components/FullInput'
import { Todolist } from './Todolist'
import Container from '@mui/material/Container'
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistNewTitleTypeAC,
  RemoveTodolistAC,
  todolistReducer,
} from './State/TodolistReducer'
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTitleStatusAC,
  deleteTaskAC,
  tasksReducer,
} from './State/TasksReducer '
import { useSelector } from 'react-redux'
import { AppRootStateType } from './State/Store'
import { useDispatch } from 'react-redux'
import { TodolistWithTasks } from './TodolistWithTasks'

export type TasksPropsType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValueType = 'All' | 'Active' | 'Completed'

export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}
export type TasksStateType = {
  [key: string]: TasksPropsType[]
}

function AppWithRedux() {
  let todolists = useSelector<AppRootStateType, Array<TodolistType>>(
    (state) => state.todolists
  )

  let tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  )
  let dispatch = useDispatch()

  const editTodolist = (todolistID: string, newTitle: string) => {
    dispatch(ChangeTodolistNewTitleTypeAC(todolistID, newTitle))
  }

  const addTodolist = (newTitle: string) => {
    let action = AddTodolistAC(newTitle)
    dispatch(action)
  }

  const removeTodolist = (todolistID: string) => {
    let action = RemoveTodolistAC(todolistID)
    dispatch(action)
  }

  function changeFilterTodolist(todolistID: string, value: FilterValueType) {
    dispatch(ChangeTodolistFilterAC(todolistID, value))
  }
  function deleteTask(taskid: string, todolistID: string) {
    dispatch(deleteTaskAC(taskid, todolistID))
  }
  function addTask(title: string, taskID: string) {
    dispatch(addTaskAC(title, taskID))
  }
  const changeStatus = (
    currentId: string,
    checkedValue: boolean,
    todolistID: string
  ) => {
    dispatch(changeTaskStatusAC(currentId, checkedValue, todolistID))
  }
  const editTask = (taskID: string, newTitle: string, todolistID: string) => {
    dispatch(changeTitleStatusAC(taskID, newTitle, todolistID))
  }

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <FullInput callBack={addTodolist} />
        </Grid>
        <Grid container spacing={5}>
          {todolists.map((tl) => {
            return (
              <Grid item>
                <Paper style={{ padding: '10px' }}>
                  <TodolistWithTasks key={tl.id} todolist={tl} />
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  )
}
export default AppWithRedux
