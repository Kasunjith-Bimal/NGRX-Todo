import { Todo } from "../../models/todo.model";
import { createReducer, on } from "@ngrx/store";
import * as TodoActions from "../actions/todo.actions";

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export const initialTodoState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const todoReducer = createReducer(
  initialTodoState,
  //load todos
  on(TodoActions.loadTodos, state => ({ ...state, loading: true, error: null })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({ ...state, todos, loading: false })),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({ ...state, loading: false, error })),
  //add todo
  on(TodoActions.addTodoSuccess, (state, { todo }) => ({ ...state, todos: [...state.todos, todo] })),
  //update todo
  on(TodoActions.updateTodoSuccess, (state, { todo }) => ({...state, todos: state.todos.map(t => t.id === todo.id ? todo : t) })),
  //delete todo
  on(TodoActions.deleteTodoSuccess, (state, { id }) => ({ ...state, todos: state.todos.filter(t => t.id !== id) })),
);


