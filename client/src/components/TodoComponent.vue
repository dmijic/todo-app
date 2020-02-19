<template>
  <div class="container">
    <div class="row">
      <div class="col-10 offset-1">
        <p class="error" v-if="error">{{ error }}</p>

        <nav class="navbar navbar-light bg-light">
          <form class="form-inline">
            <router-link class="btn btn-outline-success" to="/">Home</router-link>
          </form>
        </nav>

        <div class="card text-center">
          <div class="card-header">Todo ID: {{ this.todo.todoID }}</div>
          <div class="card-body">
            <h5 class="card-title">{{ this.todo.todoName }}</h5>
            <p class="card-text text-left">{{ this.todo.todoText }}</p>
          </div>

          <div class="card-body">
            <form class="form-inline float-right">
              <button
                type="button"
                class="btn btn-outline-warning ml-1 mr-1"
                data-toggle="modal"
                data-target="#editTodoModal"
                v-on:click="editTodoUpdateFields(todo)"
              >Edit</button>
              <button
                type="button"
                class="btn btn-outline-danger ml-1 mr-1"
                data-toggle="modal"
                data-target="#deleteTodoModal"
                v-on:click="tempTodo(todo)"
              >Delete</button>
            </form>
          </div>
          <div class="card-footer text-muted">
            Created:
            {{
            compDate
            }}
          </div>
        </div>
      </div>
    </div>

    <!-- Modal edit todo-->
    <div
      class="modal fade"
      id="editTodoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editTodoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editTodoModalLabel">Edit Todo</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="input-group mb-3 col-4 input-group-lg">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">ID</span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="ID"
                  aria-describedby="basic-addon1"
                  v-bind:placeholder="updatedTodo.todoID"
                  v-model="updatedTodo.todoID"
                />
              </div>
              <div class="input-group mb-3 col-8 input-group-lg">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Name</span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Name"
                  aria-describedby="basic-addon1"
                  v-bind:placeholder="updatedTodo.todoName"
                  v-model="updatedTodo.todoName"
                />
              </div>
            </div>

            <div class="input-group input-group-lg">
              <div class="input-group-prepend">
                <span class="input-group-text">Text</span>
              </div>
              <textarea
                class="form-control"
                aria-label="With textarea"
                v-bind:placeholder="updatedTodo.todoText"
                v-model="updatedTodo.todoText"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="editTodo(updatedTodo._id)"
              data-dismiss="modal"
            >Save Changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal delete todo-->
    <div
      class="modal fade"
      id="deleteTodoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteTodoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteTodoModalLabel">Delete Todo</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want do delete this todo?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button
              type="button"
              class="btn btn-danger"
              v-on:click="deleteOne(todo._id)"
              data-dismiss="modal"
            >Delete Todo</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoService from "../TodoService";

export default {
  name: "TodoComponent",
  data() {
    return {
      error: "",
      todo: {},
      updatedTodo: {
        _id: "",
        todoID: "",
        todoName: "",
        todoText: ""
      }
    };
  },
  async created() {
    try {
      this.todo = await TodoService.getTodo(this.$route.params.todoId);
      console.log(this.todo);
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async deleteOne(id) {
      await TodoService.deleteTodo(id);
      this.$router.push({ name: "todos" });
    },
    async editTodo(id) {
      await TodoService.updateTodo(id, this.updatedTodo);
      this.todo = await TodoService.getTodo(id);
    },
    editTodoUpdateFields(todo) {
      this.updatedTodo._id = todo._id;
      this.updatedTodo.todoID = todo.todoID;
      this.updatedTodo.todoName = todo.todoName;
      this.updatedTodo.todoText = todo.todoText;
    },
    tempTodo(todo) {
      this.todo._id = todo._id;
      this.todo.todoID = todo.todoID;
      this.todo.todoName = todo.todoName;
      this.todo.todoText = todo.todoText;
    }
  },
  computed: {
    compDate() {
      const date = new Date(this.todo.createdAt);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const hours = date.getHours();
      const mins = date.getMinutes();
      return `${day}/${month}/${year} - ${hours}:${mins}`;
    }
  }
};
</script>
