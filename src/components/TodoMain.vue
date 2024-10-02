<script setup>
import { ref } from 'vue'
import IconTrash from './icons/IconTrash.vue'
import IconEdit from './icons/IconEdit.vue'

let todo = ref('')
let todos = ref([])
const editingTodo = ref(null)

const addEditTodo = () => {
  if (!editingTodo.value) {
    // Add todo.
    todos.value.push({ id: new Date().getTime(), text: todo.value })
    todo.value = ''
  } else {
    // Edit todo.
    todos.value = todos.value.map((todoItem) => {
      if (todoItem.id === editingTodo.value.id) {
        return { ...todoItem, text: todo.value }
      }
      return todoItem
    })
    editingTodo.value = null
    todo.value = ''
  }
}

const removeTodo = (todo) => {
  todos.value = todos.value.filter((todoItem) => todoItem !== todo)
}

const onEdit = (todoObj) => {
  todo.value = todoObj.text
  editingTodo.value = todoObj
}
</script>

<template>
  <h1 class="font-semibold text-2xl text-center">Todo List</h1>
  <div class="mx-auto w-fit mt-5 p-3">
    <div class="flex gap-2 items-center">
      <input
        type="text"
        class="border border-dashed h-10 text-xl font-medium p-1 rounded-lg outline-dashed"
        v-model="todo"
      />
      <button v-if="!editingTodo" class="btn" @click="addEditTodo">Add</button>
      <button v-else class="btn" @click="addEditTodo">Edit</button>
    </div>
    <div class="mt-5">
      <ul class="list-disc font-medium text-2xl flex flex-col gap-2">
        <li v-for="todo in todos" :key="todo.id">
          <div class="flex items-center justify-between w-full">
            <p>{{ todo.text }}</p>
            <div class="flex gap-2">
              <div
                class="w-10 p-2 rounded-lg bg-red-500 cursor-pointer hover:bg-red-400 flex justify-center items-center"
                @click="removeTodo(todo)"
              >
                <IconTrash />
              </div>
              <div
                class="w-10 p-2 rounded-lg bg-green-500 cursor-pointer hover:bg-green-400 flex justify-center items-center"
                @click="onEdit(todo)"
              >
                <IconEdit />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
