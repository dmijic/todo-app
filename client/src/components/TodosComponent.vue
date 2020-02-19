<template>
  <div class="container">
    <div class="row">
      <div class="col-10 offset-1">
        <p class="error" v-if="error">{{ error }}</p>

        <nav class="navbar navbar-light bg-light">
          <form class="form-inline">
            <button
              type="button"
              class="btn btn-outline-success"
              data-toggle="modal"
              data-target="#newTodoModal"
              v-on:click="clearInputs"
            >Create new todo</button>
          </form>

          <form class="form-inline">
            <button
              type="button"
              class="btn btn-outline-danger"
              data-toggle="modal"
              data-target="#deleteCheckedModal"
            >Delete checked</button>
          </form>
        </nav>

        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="clickable" id="todoID" v-on:click="sortTodos('todoID')">ID</th>
              <th
                scope="col"
                class="clickable"
                id="todoName"
                v-on:click="sortTodos('todoName')"
              >Name</th>
              <th
                scope="col"
                class="clickable"
                id="todoText"
                v-on:click="sortTodos('todoText')"
              >Text</th>
              <th
                scope="col"
                class="clickable"
                id="createdAt"
                v-on:click="sortTodos('createdAt')"
              >Created</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(todo, index) in displayedTodos"
              v-bind:item="todo"
              v-bind:index="index"
              v-bind:key="todo._id"
            >
              <td>{{ todo.todoID }}</td>
              <td>{{ todo.todoName }}</td>
              <td>{{ todo.todoText }}</td>
              <td>
                {{
                `${todo.createdAt.getDate()}/${todo.createdAt.getMonth()}/${todo.createdAt.getFullYear()} - ${todo.createdAt.getHours()}:${todo.createdAt.getMinutes()}`
                }}
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  v-on:click="detailsView(todo)"
                >Details</button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-warning"
                  data-toggle="modal"
                  data-target="#editTodoModal"
                  v-on:click="editTodoUpdateFields(todo)"
                >Edit</button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  data-toggle="modal"
                  data-target="#deleteTodoModal"
                  v-on:click="tempTodo(todo)"
                >Delete</button>
              </td>
              <td>
                <div class="custom-control custom-checkbox my-1 mr-sm-2">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    v-bind:id="todo._id"
                    v-bind:value="todo._id"
                    v-model="listToDelete"
                  />
                  <label class="custom-control-label" v-bind:for="todo._id"></label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <button type="button" class="page-link" v-on:click="page = 1">First</button>
            </li>
            <li
              class="page-item"
              v-for="pageNumber in pages"
              v-bind:item="pageNumber"
              v-bind:key="pageNumber._id"
              v-on:click="page = pageNumber"
            >
              <button type="button" class="page-link">{{ pageNumber }}</button>
            </li>

            <li class="page-item">
              <button type="button" v-on:click="page = pages.length" class="page-link">Last</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- Modal new todo-->
    <div
      class="modal fade"
      id="newTodoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="newTodoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newTodoModalLabel">New Todo</h5>
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
                  v-model="todo.todoID"
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
                  v-model="todo.todoName"
                />
              </div>
            </div>

            <div class="input-group input-group-lg">
              <div class="input-group-prepend">
                <span class="input-group-text">Text</span>
              </div>
              <textarea class="form-control" aria-label="With textarea" v-model="todo.todoText"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              v-on:click="clearInputs"
            >Cancel</button>
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="createTodo"
              data-dismiss="modal"
            >Save Todo</button>
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
    <!-- Modal delete checked todos-->
    <div
      class="modal fade"
      id="deleteCheckedModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteCheckedTodosLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteCheckedTodosLabel">Delete checked todos</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want do delete checked todos?</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              v-on:click="clearDeleteList"
            >Cancel</button>
            <button
              type="button"
              class="btn btn-danger"
              v-on:click="deleteMany"
              data-dismiss="modal"
            >Delete Todos</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoService from "../TodoService";

export default {
  name: "TodosComponent",
  data() {
    return {
      todos: [],
      error: "",
      page: 1,
      perPage: 5,
      pages: [],
      todo: {
        todoID: "",
        todoName: "",
        todoText: ""
      },
      updatedTodo: {
        _id: "",
        todoID: "",
        todoName: "",
        todoText: ""
      },
      listToDelete: [],
      sortBy: ""
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
    async createTodo() {
      await TodoService.insertTodo(this.todo);
      this.todos = await TodoService.getTodos();
    },
    async deleteOne(id) {
      await TodoService.deleteTodo(id);
      this.todos = await TodoService.getTodos();
    },
    async deleteMany() {
      await this.listToDelete.forEach(id => {
        TodoService.deleteTodo(id);
      });
      this.clearDeleteList();
      this.todos = await TodoService.getTodos();
    },
    async editTodo(id) {
      await TodoService.updateTodo(id, this.updatedTodo);
      this.todos = await TodoService.getTodos();
    },
    clearDeleteList() {
      this.listToDelete = [];
    },
    clearInputs() {
      this.todo.todoID = "";
      this.todo.todoName = "";
      this.todo.todoText = "";
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
    },
    setPages() {
      this.pages = [];
      let numberOfPages = Math.ceil(this.todos.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(todos) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return todos.slice(from, to);
    },
    sortTodos(criteria) {
      if (this.sortBy === criteria) {
        if (criteria === "todoID") {
          this.todos.sort((a, b) =>
            a.todoID > b.todoID ? -1 : a.todoID < b.todoID ? 1 : 0
          );
        } else if (criteria === "todoName") {
          this.todos.sort((a, b) =>
            a.todoName > b.todoName ? -1 : a.todoName < b.todoName ? 1 : 0
          );
        } else if (criteria === "todoText") {
          this.todos.sort((a, b) =>
            a.todoText > b.todoText ? -1 : a.todoText < b.todoText ? 1 : 0
          );
        } else if (criteria === "createdAt") {
          this.todos.sort((a, b) =>
            a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
          );
        }
        document
          .querySelectorAll(".clickable")
          .forEach(element =>
            element.classList.remove("clicked-asc", "clicked-desc")
          );
        document.getElementById(criteria).classList.add("clicked-desc");

        this.sortBy = "";
      } else {
        if (criteria === "todoID") {
          this.todos.sort((a, b) =>
            a.todoID < b.todoID ? -1 : a.todoID > b.todoID ? 1 : 0
          );
        } else if (criteria === "todoName") {
          this.todos.sort((a, b) =>
            a.todoName < b.todoName ? -1 : a.todoName > b.todoName ? 1 : 0
          );
        } else if (criteria === "todoText") {
          this.todos.sort((a, b) =>
            a.todoText < b.todoText ? -1 : a.todoText > b.todoText ? 1 : 0
          );
        } else if (criteria === "createdAt") {
          this.todos.sort((a, b) =>
            a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0
          );
        }
        document
          .querySelectorAll(".clickable")
          .forEach(element =>
            element.classList.remove("clicked-asc", "clicked-desc")
          );
        document.getElementById(criteria).classList.add("clicked-asc");

        this.sortBy = criteria;
      }
    },
    detailsView(todo) {
      this.$router.push({ name: "todo", params: { todoId: todo._id } });
    }
  },
  computed: {
    displayedTodos() {
      return this.paginate(this.todos);
    }
  },
  watch: {
    todos() {
      this.setPages();
    }
  },
  filters: {
    trimWords(value) {
      return (
        value
          .split(" ")
          .splice(0, 20)
          .join(" ") + "..."
      );
    }
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
  transition: all 0.4s ease;
}
.clickable:hover {
  background-color: #f8f9fa;
}
.clicked-asc:after {
  content: "\f078";
  font-family: FontAwesome;
  font-weight: normal;
  font-style: normal;
  margin: 0px 0px 0px 10px;
  text-decoration: none;
}

.clicked-desc:after {
  content: "\f077";
  font-family: FontAwesome;
  font-weight: normal;
  font-style: normal;
  margin: 0px 0px 0px 10px;
  text-decoration: none;
}
</style>
