import { defineStore } from 'pinia'

interface TodoStoreState {
    todos: TodoItems[],
    name: string
}

export interface TodoItems {
    id: number,
    title: string,
    isFav: boolean
}

export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        todos: [] as TodoItems[],
        name: 'Yve',
        loading: false as boolean
    }),
    getters: {
        favs(): TodoItems[] {
            return this.todos.filter(todo => todo.isFav)
        },
        favCount(): number {
            return this.todos.reduce((prev, curr) => {
                return curr.isFav ? prev+1 : prev
            }, 0)
        },
        totalCount: (state: TodoStoreState) => {
            return state.todos.length
        }
    },
    actions: {
        async getTodo() {
            this.loading = true
            const res = await fetch('http://localhost:3000/todos')
            const data = await res.json()

            this.todos = data
            this.loading = false
        },
        addTodo(todo: TodoItems) {
            this.todos.push(todo)
        },
        deleteTodo(id: number) {
            this.todos = this.todos.filter(todo => {
                return todo.id !== id
            })
        },
        toggleFave(id: number) {
            const todo = this.todos.find(todo => todo.id === id)
            if (todo) {
                todo.isFav = !todo.isFav
            }
        }
    }
})
