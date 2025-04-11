<script setup lang="ts">
import { ref } from 'vue';
import TodoDetails from './components/TodoDetails.vue';
import TodoForm from './components/TodoForm.vue'
import { useTodoStore } from './stores/TodoStore';

const todoStore = useTodoStore()

todoStore.getTodo()

const filter = ref('all')

</script>

<template>
  <h1> Todo List</h1>
  <div class="task-list" v-if="filter === 'all'">
    <p>You have {{ todoStore.totalCount }} todos</p>
    <div v-for="todo in todoStore.todos" :key="todo.id">
      <TodoDetails :todo="todo"/>
    </div>
  </div>

  <div class="task-list" v-if="filter === 'favs'">
    <p>You have {{ todoStore.favCount }} fave todos</p>
    <div v-for="todo in todoStore.favs" :key="todo.id">
      <TodoDetails :todo="todo"/>
    </div>
  </div>
  <div class="new-task-form">
    <TodoForm />
  </div>
  <div v-if="todoStore.loading" class="loading">
    Loading todos...
  </div>
  <nav class="filter">
    <button @click="filter ='all'">All Tasks</button>
    <button @click="filter ='favs'">Favs</button>
  </nav>
  
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
