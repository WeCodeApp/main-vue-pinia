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
        todos: [
            { id: 1, title: 'Buy milk', isFav: false },
            { id: 2, title: 'Read books', isFav: true }
        ],
        name: 'Yve'
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
    }
})
