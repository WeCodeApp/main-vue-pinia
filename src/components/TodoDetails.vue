<template>
    <div class="task">
        <h3>{{props.todo.title}}</h3>
        <div class="icons">
            <i 
            class="material-icons"
            @click="handleDelete"
            > delete </i>
            <i 
            class="material-icons"
            :class="{ active: props.todo.isFav }"
            @click="todoStore.toggleFave(props.todo.id)"
            > favorites </i>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTodoStore, type TodoItems } from '@/stores/TodoStore';

const props = defineProps<{
    todo: TodoItems
}>()

const handleDelete = () => {
    if (confirm("Are you sure to delete?") == true) {
        todoStore.deleteTodo(props.todo.id)
    }
}

const todoStore = useTodoStore()
</script>
