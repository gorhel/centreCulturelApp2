import { Todo, TodoService } from './../../services/todo.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})

export class TodoDetailsPage implements OnInit {

  todo: Todo = {
    task: '',
    createdAt: new Date().getTime(),
    priority: '',
    dateUse: '',
    ordinateurT: ''
  };

  todoId = null;
  today: number = Date.now();
  //todayDateVal = new Date().getTime();
  todayDateVal = new DatePipe('en-US');
  openHours = "7, 8,9, 10, 11, 14, 15, 16, 17";
  openMonths = "7, 8, 9, 10";

  constructor(private route: ActivatedRoute, private nav: NavController, private todoService: TodoService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId)  {
      this.loadTodo();
      console.log(this.todo.createdAt);
    }
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Chargement..'
    });
    await loading.present();

    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
      console.log('L\'heure choisie par l\'utilisateur '+ this.todo.dateUse);
    });
    this.checkAndExcludeDate();
  }

  async saveTodo() {

    const loading = await this.loadingController.create({
      message: 'Sauvegarde..'
    });
    await loading.present();

    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.back('home');
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.back('home');
      });
    }
  }

  async checkAndExcludeDate(){
    //const listedesAffectations = this.todoService.getTodos();
    //console.log(listedesAffectations[0]);
    console.log('Today '+ this.today);
    console.log('les heures d\'ouvertures '+ this.openHours);
    console.log('L\'heure choisie par l\'utilisateur '+ this.todo.ordinateurT);
    return this.openHours;
  }

}
