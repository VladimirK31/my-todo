import axios from 'axios'

type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}
//по дефолту D={} пустой обЪект,поэтому не указываем в дженерике аргумент

export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    'API-KEY': '4888bc93-f4c8-492a-b3e0-c91f101fe285',
  },
})

export const todolistAPI = {
  updateTodolist(todolistId: string, title: string) {
    const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, {
      title: title,
    })
    return promise
  },
  getTodolist() {
    const promise = instance.get<Array<TodolistType>>(`todo-lists`)
    return promise
  },
  deleteTodolist(todolistId: string) {
    const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    return promise
  },
  createTodolist(title: string) {
    const promise = instance.post<ResponseType<{ item: TodolistType }>>(
      'todo-lists',
      {
        title,
      }
    )
    return promise
  },
}
