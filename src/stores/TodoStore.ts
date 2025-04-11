import { defineStore } from 'pinia'

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
        }
    }
})
