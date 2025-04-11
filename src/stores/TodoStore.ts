import { defineStore } from 'pinia'

interface TodoStoreState {
    todos: TodoItems[],
    name: string
}

export interface TodoItems {
    id: number,
    title: string,
    isFav?: boolean
}

export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        todos: [] as TodoItems[],
        name: 'Yve',
        loading: false as boolean,
        limit: 5,
        page: 1
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
        async getTodo(direction: string|null) {
            this.loading = true

            if (direction === 'next') {
                this.page++
            } else if (direction === 'prev') {
                this.page--
            }

            const res = await fetch('http://localhost:3000/todos?_page='+this.page+'&_limit='+ this.limit)
            const data = await res.json()

            this.todos = data
            this.loading = false
        },
        async addTodo(todo: TodoItems) {
            this.todos.push(todo)

            const res = await fetch('http://localhost:3000/todos', {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: { 'Content-Type': 'application/json'}
            })

            if (!res.ok) {
                const errorData = await res.json()
                console.log(errorData.message || 'An error occured while adding todo')
            }
            
        },
        async deleteTodo(id: number) {
            this.todos = this.todos.filter(todo => {
                return todo.id !== id
            })

            const res = await fetch('http://localhost:3000/todos/' + id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'}
            })

            if (!res.ok) {
                const errorData = await res.json()
                console.log(errorData.message || 'An error occured while adding todo')
            }
        },
        async toggleFave(id: number) {
            const todo = this.todos.find(todo => todo.id === id)
            if (todo) {
                todo.isFav = !todo.isFav
            }

            const res = await fetch('http://localhost:3000/todos/' + id, {
                method: 'PATCH',
                body: JSON.stringify(todo),
                headers: { 'Content-Type': 'application/json'}
            })

            if (!res.ok) {
                const errorData = await res.json()
                console.log(errorData.message || 'An error occured while adding todo')
            }
        }
    }
})
