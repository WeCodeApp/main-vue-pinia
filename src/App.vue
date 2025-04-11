<script setup lang="ts">
import TodoDetails from './components/TodoDetails.vue';
import { useTodoStore } from './stores/TodoStore';

const todoStore = useTodoStore()
</script>

<template>
  <h1> Todo List</h1>
  <div class="task-list">
    <p>All Task</p>
    <div v-for="todo in todoStore.todos" :key="todo.id">
      <TodoDetails :todo="todo"/>
    </div>
  </div>

  <div class="task-list">
    <p>Fav Task</p>
    <div v-for="todo in todoStore.favs" :key="todo.id">
      <TodoDetails :todo="todo"/>
    </div>
  </div>
  
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
