<script setup lang="ts">
import { ref } from 'vue';
import TodoDetails from './components/TodoDetails.vue';
import TodoForm from './components/TodoForm.vue'
import { useTodoStore } from './stores/TodoStore';
import { storeToRefs } from 'pinia';

const todoStore = useTodoStore()

todoStore.getTodo('initial')

const filter = ref('all')

const { todos, loading, favs, totalCount, favCount } = storeToRefs(todoStore)

const searchTodo = () => {

}

const handleNext = () => {
  todoStore.getTodo('next')
}

const handlePrev = () => {
  todoStore.getTodo('prev')
}

</script>

<template>
  <h1> Todo List</h1>
  <div class="task-list" v-if="filter === 'all'">
    <p>You have {{ totalCount }} todos</p>
    <div v-for="todo in todos" :key="todo.id">
      <TodoDetails :todo="todo"/>
    </div>
  </div>

  <div class="task-list" v-if="filter === 'favs'">
    <p>You have {{ favCount }} fave todos</p>
    <div v-for="todo in favs" :key="todo.id">
      <TodoDetails :todo="todo"/>
    </div>
  </div>

  <button @click="todoStore.$reset">Reset state</button>
  <div class="new-task-form">
    <TodoForm />
  </div>
  <div v-if="loading" class="loading">
    Loading todos...
  </div>
  <nav class="filter">
    <button @click="filter ='all'">All Tasks</button>
    <button @click="filter ='favs'">Favs</button>
  </nav>

  <nav class="pagination">
    <button @click="handlePrev">Prev Page</button>
    <button @click="handleNext">Next Page</button>
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
