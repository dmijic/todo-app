import Vue from "vue";
import Router from "vue-router";
import TodosComponent from "@/components/TodosComponent";
import TodoComponent from "@/components/TodoComponent";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "todos",
      component: TodosComponent
    },
    {
      path: "/todo",
      name: "todo",
      component: TodoComponent
    }
  ]
});
