import axios from "axios";

const url = "api/todos/";

class TodoService {
  //Create
  static insertTodo(todo) {
    return axios.post(url, {
      todoID: todo.todoID,
      todoName: todo.todoName,
      todoText: todo.todoText
    });
  }

  //Read
  static getTodos() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(todo => ({
            ...todo,
            createdAt: new Date(todo.createdAt)
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  //Read one
  static getTodo(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}${id}`);
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  //Update
  static updateTodo(id, todo) {
    return axios.put(`${url}${id}`, {
      todoID: todo.todoID,
      todoName: todo.todoName,
      todoText: todo.todoText
    });
  }

  //Delete
  static deleteTodo(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default TodoService;
