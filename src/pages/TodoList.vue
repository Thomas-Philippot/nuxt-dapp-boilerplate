<template>
  <v-card>
    <v-card-title>
      Todo List
      <v-spacer />
      <v-text-field v-model="content" label="Task" />
      <v-btn class="mx-2" @click="addTask">Add</v-btn>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="item in tasks" :key="item.id">
          <v-list-item-content>
            {{ item.content }}
          </v-list-item-content>
          <v-list-item-action>
            <v-checkbox v-model="item.completed" :disabled="item.completed" @change="completeTask(item)" />
          </v-list-item-action>
          <v-list-item-action @click="removeTask(item)">
            <v-btn icon>
              <v-icon>fas fa-trash</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TodoList.vue",
  data () {
    return {
      tasks: [],
      content: ''
    }
  },
  computed: {
    todoList () {
      return this.$store.state.todo.contract
    }
  },
  created() {
    this.$store.dispatch('eth/loadContract', 'todo')
    this.setTask()
  },
  methods: {
    async setTask () {
      if (this.$store.state.eth.connected) {
        const taskCount = await this.todoList.taskCount().call()
        console.log(this.todoList)
        for (let i = 0; i < taskCount; i++) {
          let task = await this.todoList.tasks(i).call()
          this.tasks.push(task)
        }
      }
    },
    async addTask () {
      await this.todoList.addTask(this.content).send({ from: this.$store.state.eth.account })
      this.tasks = []
      this.content = ''
      await this.setTask()
    },
    async completeTask (task) {
      await this.todoList.completeTask(task.id).send({ from: this.$store.state.eth.account })
    },
    async removeTask (task) {
      await this.todoList.removeTask(task.id).send({ from: this.$store.state.eth.account })
      this.tasks.splice(this.tasks.indexOf(task), 1)
    }
  }
}
</script>

<style scoped>

</style>
