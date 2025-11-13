import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoItem } from '../todo-item/todo-item';
import { TodoService } from '../../services/todo-service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItem],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.css'],
})
export class TodoList implements OnInit {
  
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
   this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }
  public newTodo = '';
  public todos: Todo[] = [];

  
  trackByTodoId(index: number, todo: Todo) {
    return todo.id;
  }

  onDelete(id: number | string) {
   this.todoService.deleteTodo(Number(id)).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== id);
    }); 
  }

  onUpdate(updated: Todo) {
    this.todoService.updateTodo(updated).subscribe(() => { 
      this.todos = this.todos.map(t => t.id === updated.id ? updated : t);
    });          
   
  }

  addTodo() {
    const title = this.newTodo?.trim();
    if (!title) return;
    const todo: Todo = { id: 0, title, completed: false };
    this.todoService.addTodo(todo).subscribe((todo) => { 
       this.todos = [...this.todos, todo];
    });
    this.newTodo = '';
    
  }
}
