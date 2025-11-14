import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoState } from "../reducers/todo.reducer";

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);

export const selectToDosLoading = createSelector(
  selectTodoState,
  (state: TodoState) => state.loading
);


export const selectToDosError = createSelector(
  selectTodoState,
  (state: TodoState) => state.error
);

export const selectTodoCount = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos.length
);

export const selectCompletedTodosCout  = createSelector(
    selectTodoState,
    (state: TodoState) => state.todos.filter(todo => todo.completed).length
);



