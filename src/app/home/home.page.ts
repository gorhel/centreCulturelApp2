import { Todo, TodoService} from './../services/todo.service';
import { Ordinateur, OrdinateurService } from './../services/ordinateur.service';
import { Utilisateur, UtilisateurService } from './../services/utilisateur.service';
import { Affectation, AffectationService } from './../services/affectation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  todos: Todo[];
  ordinateurs: Ordinateur[];
  utilisateurs: Utilisateur[];
  affectations: Affectation[];
  affectationSelect = [7, 8, 9, 10, 11, 14, 15, 16, 17];

  constructor(private todoService: TodoService, private ordinateurService: OrdinateurService, private utilisateurService: UtilisateurService, private affectationService: AffectationService){}

    ngOnInit(){
      this.todoService.getTodos().subscribe(res => {
        this.todos = res;
      });
      this.ordinateurService.getOrdinateurs().subscribe(res => {
        this.ordinateurs = res;
      });
      this.utilisateurService.getUtilisateurs().subscribe(res => {
        this.utilisateurs = res;
      });
      this.affectationService.getAffectations().subscribe(res => {
        this.affectations = res;
      });
    }


    remove(item){
      this.todoService.removeTodo(item.id);
      this.ordinateurService.removeOrdinateur(item.id);
      this.utilisateurService.removeUtilisateur(item.id);
      this.affectationService.removeAffectation(item.id);
    }
}
