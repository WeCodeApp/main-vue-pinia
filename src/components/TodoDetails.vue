<template>
    <div class="task">
        <h3>{{props.todo.title}}</h3>
        <div class="icons">
            <i class="material-icons"> delete </i>
            <i class="material-icons"> favorites </i>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TodoItems } from '@/stores/TodoStore';

const props = defineProps<{
    todo: TodoItems
}>()
</script>
