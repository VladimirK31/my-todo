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
import React, { useState } from 'react'
import { v1 } from 'uuid'
import './App.css'
import { FullInput } from './Components/FullInput'
import { Todolist } from './Todolist'
import Container from '@mui/material/Container'

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

function App() {
  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistID1, title: 'What to learn', filter: 'All' },
    { id: todolistID2, title: 'What to buy', filter: 'All' },
  ])

  let [tasks, setTasks] = useState({
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
  const editTask = (todolistID: string, taskID: string, newTitle: string) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map((el) =>
        el.id === taskID ? { ...el, title: newTitle } : el
      ),
    })
  }

  const editTodolist = (todolistID: string, newTitle: string) => {
    setTodolists(
      todolists.map((el) =>
        el.id === todolistID ? { ...el, title: newTitle } : el
      )
    )
  }

  const addTodolist = (newTitle: string) => {
    let newID = v1()
    let newTodolist: TodolistType = {
      id: newID,
      title: newTitle,
      filter: 'All',
    }
    setTodolists([newTodolist, ...todolists])
    setTasks({ ...tasks, [newID]: [] })
  }

  const removeTodolist = (todolistID: string) => {
    setTodolists(todolists.filter((el) => el.id !== todolistID))
    delete tasks[todolistID]
  }
  function deletTask(todolistID: string, taskid: string) {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].filter((el) => el.id !== taskid),
    })
    // let filteredTasks = tasks.filter((t) => t.id != id)
    // setTask(filteredTasks)
  }
  function changeFilter(todolistID: string, value: FilterValueType) {
    setTodolists(
      todolists.map((el) =>
        el.id === todolistID ? { ...el, filter: value } : el
      )
    )
  }
  function addTask(taskID: string, title: string) {
    let newTask = {
      id: v1(),
      title,
      isDone: false,
    }
    setTasks({ ...tasks, [taskID]: [newTask, ...tasks[taskID]] })

    // let newTasks = [task, ...tasks]
    // setTasks(newTasks)
  }
  const changeStatus = (
    todolistID: string,
    currentId: string,
    checkedValue: boolean
  ) => {
    // setTask(
    //   tasks.map((el) =>
    //     el.id === currentId ? { ...el, isDone: checkedValue } : el
    //   )
    // )
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map((el) =>
        el.id === currentId ? { ...el, isDone: checkedValue } : el
      ),
    })
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
                    deletTask={deletTask}
                    changeFilter={changeFilter}
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
export default App
