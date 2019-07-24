import { Todo, TodoService} from './../services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  todos: Todo[];

  constructor(private todoService: TodoService){}

    ngOnInit(){
      this.todoService.getTodos().subscribe(res => {
        this.todos = res;
      });
    }

    remove(item){
      this.todoService.removeTodo(item.id);
    }
}
