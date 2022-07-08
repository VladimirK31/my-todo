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

function AppWithReducer() {
  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
    { id: todolistID1, title: 'What to learn', filter: 'All' },
    { id: todolistID2, title: 'What to buy', filter: 'All' },
  ])

  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'HTML&CSS2', isDone: true },
      { id: v1(), title: 'JS2', isDone: true },
      { id: v1(), title: 'ReactJS2', isDone: false },
      { id: v1(), title: 'Rest API2', isDone: false },
      { id: v1(), title: 'GraphQL2', isDone: false },
    ],
  })

  const editTodolist = (todolistID: string, newTitle: string) => {
    dispatchToTodolists(ChangeTodolistNewTitleTypeAC(todolistID, newTitle))
  }

  const addTodolist = (newTitle: string) => {
    let action = AddTodolistAC(newTitle)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }

  const removeTodolist = (todolistID: string) => {
    let action = RemoveTodolistAC(todolistID)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }

  const changeFilterTodolist = (todolistID: string, value: FilterValueType) => {
    dispatchToTodolists(ChangeTodolistFilterAC(todolistID, value))
  }
  const deleteTask = (taskid: string, todolistID: string) => {
    dispatchToTasks(deleteTaskAC(taskid, todolistID))
  }
  const addTask = (title: string, taskID: string) => {
    dispatchToTasks(addTaskAC(title, taskID))
  }
  const changeStatus = (
    currentId: string,
    checkedValue: boolean,
    todolistID: string
  ) => {
    dispatchToTasks(changeTaskStatusAC(currentId, checkedValue, todolistID))
  }
  const editTask = (taskID: string, newTitle: string, todolistID: string) => {
    dispatchToTasks(changeTitleStatusAC(taskID, newTitle, todolistID))
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
            let taskForTodolist = tasks[tl.id]
            if (tl.filter === 'Active') {
              taskForTodolist = tasks[tl.id].filter((f) => f.isDone == false)
            }
            if (tl.filter === 'Completed') {
              taskForTodolist = tasks[tl.id].filter((f) => f.isDone == true)
            }
            return (
              <Grid item>
                <Paper style={{ padding: '10px' }}>
                  <Todolist
                    editTodolist={editTodolist}
                    todolistID={tl.id}
                    key={tl.id}
                    filter={tl.filter}
                    title={tl.title}
                    tasks={taskForTodolist}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    changeFilter={changeFilterTodolist}
                    changeStatus={changeStatus}
                    removeTodolist={removeTodolist}
                    editTask={editTask}
                  />
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  )
}
export default AppWithReducer
