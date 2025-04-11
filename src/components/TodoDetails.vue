<template>
    <div class="task">
        <h3>{{props.todo.title}}</h3>
    </div>
</template>

<script setup lang="ts">
import type { TodoItems } from '@/stores/TodoStore';

const props = defineProps<{
    todo: TodoItems
}>()
</script>
