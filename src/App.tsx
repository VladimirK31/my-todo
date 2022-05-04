import React, { useState } from 'react'
import { v1 } from 'uuid'
import './App.css'
import { Todolist } from './Todolist'

export type TasksPropsType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValueType = 'All' | 'Active' | 'Complited'

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
  const removeTodolist = (todolistID: string) => {
    setTodolists(todolists.filter((el) => el.id !== todolistID))
    delete tasks[todolistID]
  }
  // let [tasks, setTask] = useState([
  //   { id: v1(), title: 'CSS&HTML', isDone: true },
  //   { id: v1(), title: 'REACT', isDone: false },
  //   { id: v1(), title: 'JS', isDone: true },
  //   { id: v1(), title: 'Rest API', isDone: false },
  //   { id: v1(), title: 'GraphQL', isDone: false },
  // ])

  // let [todolist, setTodolist] = useState<Array<TodolistType>>([
  //   { id: v1(), title: 'What to learn', filter: 'All' },
  //   { id: v1(), title: 'What to buy', filter: 'All' },
  // ])
  function deletTask(todolistID: string, taskid: string) {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].filter((el) => el.id !== taskid),
    })
    // let filteredTasks = tasks.filter((t) => t.id != id)
    // setTask(filteredTasks)
  }
  // let [filter, setFilter] = useState<FilterValueType>('All')
  // let taskForTodolist = tasks
  // if (filter === 'Active') {
  //   taskForTodolist = tasks.filter((f) => f.isDone == false)
  // }
  // if (filter === 'Complited') {
  //   taskForTodolist = tasks.filter((f) => f.isDone == true)
  // }
  function changeFilter(todolistID: string, value: FilterValueType) {
    setTodolists(
      todolists.map((el) =>
        el.id === todolistID ? { ...el, filter: value } : el
      )
    )
  }
  function addTask(todolistID: string, title: string) {
    let newTask = {
      id: v1(),
      title,
      isDone: false,
    }
    setTasks({ ...tasks, [todolistID]: [newTask, ...tasks[todolistID]] })

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
      {todolists.map((tl) => {
        let taskForTodolist = tasks[tl.id]
        if (tl.filter === 'Active') {
          taskForTodolist = tasks[tl.id].filter((f) => f.isDone == false)
        }
        if (tl.filter === 'Complited') {
          taskForTodolist = tasks[tl.id].filter((f) => f.isDone == true)
        }
        return (
          <Todolist
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
          />
        )
      })}
    </div>
  )
}
export default App
