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


  ordinateurs: Ordinateur[];
  utilisateurs: Utilisateur[];
  affectations: Affectation[];
  affectationSelect = [7, 8, 9, 10, 11, 14, 15, 16, 17];

  constructor(private ordinateurService: OrdinateurService, private utilisateurService: UtilisateurService, private affectationService: AffectationService){}

    ngOnInit(){
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
      this.ordinateurService.removeOrdinateur(item.id);
      this.utilisateurService.removeUtilisateur(item.id);
      this.affectationService.removeAffectation(item.id);
    }
}
