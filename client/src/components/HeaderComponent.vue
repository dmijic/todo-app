<template>
  <div>
    <nav class="navbar navbar-light bg-dark">
      <a class="navbar-brand" href="#">
        <img
          src="https://fatfi.sh/wp-content/uploads/2019/11/Discord-LogoWordmark-White.png"
          width="auto"
          height="40"
          alt
        />
      </a>

      <form class="form-inline">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Search by</label>
        </div>
        <select class="custom-select" id="inputGroupSelect01" v-model="searchBy">
          <option value="todoID" selected>ID</option>
          <option value="todoName">Name</option>
          <option value="todoText">Text</option>
        </select>

        <input
          class="form-control mr-sm-2"
          type="search"
          v-bind:placeholder="searchByPlaceholder"
          v-model="searchTerm"
          aria-label="Search"
        />
        <div
          class="card position-absolute"
          style="width: 24rem; top: 66px; right: 24px; z-index:1"
          v-if="searchTerm != ''"
        >
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item"
              v-for="todo in filteredTodosList"
              v-bind:item="todo"
              v-bind:index="index"
              v-bind:key="todo._id"
              v-on:click="detailsView(todo)"
            >{{todo.todoName}}</li>
          </ul>
        </div>
      </form>
    </nav>
  </div>
</template>

<script>
import TodoService from "../TodoService";
export default {
  name: "HeaderComponent",
  data() {
    return {
      todos: [],
      todo: {
        todoID: "",
        todoName: "",
        todoText: ""
      },
      searchBy: "todoID",
      searchTerm: ""
    };
  },
  async created() {
    try {
      this.todos = await TodoService.getTodos();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    detailsView(todo) {
      this.$router.push({ name: "todo", params: { todoId: todo._id } });
      this.searchTerm = "";
    }
  },
  computed: {
    filteredTodosList() {
      if (this.searchBy === "todoID") {
        return this.todos.filter(todo => {
          return todo.todoID
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        });
      } else if (this.searchBy === "todoName") {
        return this.todos.filter(todo => {
          return todo.todoName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        });
      } else {
        return this.todos.filter(todo => {
          return todo.todoText
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        });
      }
    },
    searchByPlaceholder() {
      if (this.searchBy === "todoID") {
        return "123...";
      } else if (this.searchBy === "todoName") {
        return "name...";
      } else if (this.searchBy === "todoText") {
        return "text...";
      } else {
        return "dd/mm/yyyy";
      }
    }
  },
  watch: {
    filteredTodosList() {
      this.$emit("filteredList", this.filteredTodosList);
    }
  }
};
</script>