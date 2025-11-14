import { Actions } from '@ngrx/effects';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoItem } from '../todo-item/todo-item';
import { TodoService } from '../../services/todo-service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as TodoSelectors from '../../store/selectors/todo.selectors';
import * as TodoActions from '../../store/actions/todo.actions';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItem],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.css'],
})
export class TodoList implements OnInit {
  public newTodo = '';
  public todos: Todo[] = [];
  todos$? : Observable<Todo[]>;
  loading$? : Observable<boolean>;
  error$? : Observable<string |null>;

  constructor(private todoService: TodoService,private store : Store) {
    this.todos$ = this.store.select(TodoSelectors.selectAllTodos);
    this.loading$ = this.store.select(TodoSelectors.selectToDosLoading);
    this.error$ = this.store.select(TodoSelectors.selectToDosError);
  }

  ngOnInit(): void {
   //this.getTodos();
   this.store.dispatch(TodoActions.loadTodos());
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }


  
  trackByTodoId(index: number, todo: Todo) {
    return todo.id;
  }

  onDelete(id: number | string) {
  //  this.todoService.deleteTodo(Number(id)).subscribe(() => {
  //     this.todos = this.todos.filter(t => t.id !== id);
  //   }); 

  this.store.dispatch(TodoActions.deleteTodo({id: Number(id)}));
  }

  onUpdate(updated: Todo) {
    // this.todoService.updateTodo(updated).subscribe(() => { 
    //   this.todos = this.todos.map(t => t.id === updated.id ? updated : t);
    // });          
   this.store.dispatch(TodoActions.updateTodo({todo: updated}));
  }

  addTodo() {
    const title = this.newTodo?.trim();
    if (!title) return;
    const todo: Todo = { id: 0, title, completed: false };
    // this.todoService.addTodo(todo).subscribe((todo) => { 
    //    this.todos = [...this.todos, todo];
    // });
    this.store.dispatch(TodoActions.addTodo({todo}));
    this.newTodo = '';
    
  }
}
