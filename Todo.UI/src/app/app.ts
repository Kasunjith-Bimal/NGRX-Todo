import { Component, signal } from '@angular/core';
import { TodoList } from './todos/components/todo-list/todo-list';
import { TodoService } from './todos/services/todo-service';


@Component({
  selector: 'app-root',
  imports: [TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
 
}
