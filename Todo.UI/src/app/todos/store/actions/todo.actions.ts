

import { createAction, props } from '@ngrx/store';
import { Todo } from '../../models/todo.model';


export const loadTodos = createAction('[Todo Page] Load Todos');
export const loadTodosSuccess = createAction('[Todo API] Load Todos Success', props<{ todos: Todo[] }>());
export const loadTodosFailure = createAction('[Todo API] Load Todos Failure', props<{ error: string }>());
export const addTodo = createAction('[Todo Page] Add Todo', props<{ todo: Todo }>());
export const addTodoSuccess = createAction('[Todo API] Add Todo Success', props<{ todo: Todo }>());
export const addTodoFailure = createAction('[Todo API] Add Todo Failure', props<{ error: string }>());
export const updateTodo = createAction('[Todo Page] Update Todo', props<{ todo: Todo }>());
export const updateTodoSuccess = createAction('[Todo API] Update Todo Success', props<{ todo: Todo }>());
export const updateTodoFailure = createAction('[Todo API] Update Todo Failure', props<{ error: string }>());
export const deleteTodo = createAction('[Todo Page] Delete Todo', props<{ id: number }>());
export const deleteTodoSuccess = createAction('[Todo API] Delete Todo Success', props<{ id: number }>());
export const deleteTodoFailure = createAction('[Todo API] Delete Todo Failure', props<{ error: string }>());

