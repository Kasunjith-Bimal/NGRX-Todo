import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.html',
  styleUrls: ['./todo-item.css'],
})
export class TodoItem {
  @Input() todo?: Todo;
  @Output() update = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number | string>();

  deleteTodo() {
    if (this.todo?.id != null) {
      this.delete.emit(this.todo.id);
    }
  }

  toggleComplete() {
    if (this.todo) {
      const updated: Todo = { ...this.todo, completed: !this.todo.completed };
      this.update.emit(updated);
    }
  }
}
