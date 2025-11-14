import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as TodoActions from '../actions/todo.actions';
import { TodoService } from '../../services/todo-service';

@Injectable()
export class TodoEffects {
  // declare properties (no initializers that reference `this`)
  loadTodos$ : any;
  addTodo$ : any;
  updateTodo$ : any;
  deleteTodo$ : any;

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {
    // initialize effects here so `this.actions$` is defined
    this.loadTodos$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TodoActions.loadTodos),
        mergeMap(() =>
          this.todoService.getTodos().pipe(
            map((todos) => TodoActions.loadTodosSuccess({ todos })),
            catchError((error) =>
              of(TodoActions.loadTodosFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.addTodo$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TodoActions.addTodo),
        mergeMap(({ todo }) =>
          this.todoService.addTodo(todo).pipe(
            map((newTodo) => TodoActions.addTodoSuccess({ todo: newTodo })),
            catchError((error) =>
              of(TodoActions.addTodoFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.updateTodo$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TodoActions.updateTodo),
        mergeMap(({ todo }) =>
          this.todoService.updateTodo(todo).pipe(
            map(() => TodoActions.updateTodoSuccess({ todo })),
            catchError((error) =>
              of(TodoActions.updateTodoFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.deleteTodo$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TodoActions.deleteTodo),
        mergeMap(({ id }) =>
          this.todoService.deleteTodo(Number(id)).pipe(
            map(() => TodoActions.deleteTodoSuccess({ id })),
            catchError((error) =>
              of(TodoActions.deleteTodoFailure({ error: error.message }))
            )
          )
        )
      )
    );
  }
}






