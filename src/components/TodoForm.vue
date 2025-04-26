<template>
    <form @submit.prevent="handleSubmit">
        <input
        type="text"
        placeholder="I want to..."
        v-model="newTask"
        >
    </form>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/TodoStore';
import { ref } from 'vue';

const newTask = ref('')
const todoStore = useTodoStore()

const handleSubmit = () => {
    if (newTask.value.length > 0) {
        todoStore.addTodo({
            title: newTask.value,
            isFav: false,
            id: Math.floor(Math.random() * 10000)
        })
        newTask.value = ''
    }
}
</script>
