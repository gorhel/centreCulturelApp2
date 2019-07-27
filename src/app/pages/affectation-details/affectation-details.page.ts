import { Affectation, AffectationService } from './../../services/affectation.service';
import { Ordinateur, OrdinateurService } from './../../services/ordinateur.service';
import { Utilisateur, UtilisateurService } from './../../services/utilisateur.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-affectation-details',
  templateUrl: './affectation-details.page.html',
  styleUrls: ['./affectation-details.page.scss'],
})
export class AffectationDetailsPage implements OnInit {

  affectation: Affectation = {
    utilisateur: '',
    ordinateur: '',
    heureSelected:''
  };

  affectationId = null;
  ordinateur: Ordinateur[];
  utilisateur: Utilisateur[];
  affectation: Affectation[];
  affectations: Affectation[];
  affectationSelect = [7, 8, 9, 10, 11, 14, 15, 16, 17];
  public emptyHours = [7];

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private affectationService: AffectationService,
    private ordinateurService: OrdinateurService,
    private utilisateurService: UtilisateurService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.affectationId = this.route.snapshot.params['id'];
    if(this.affectationId){
      this.loadAffectation();
    }
    this.ordinateurService.getOrdinateurs().subscribe(res => {
      this.ordinateur = res;
    });
    this.utilisateurService.getUtilisateurs().subscribe(res => {
      this.utilisateur = res;
    });
    this.affectationService.getAffectations().subscribe(res => {
      this.affectations = res;
    });
    /*
    this.affectationService.getAffectations().subscribe(res => {
      this.affectation = res;
    });*/
  }

  async loadAffectation(){
    const loading = await this.loadingController.create({
      message: 'Chargement de la liste des affectations'
    });
    await loading.present();

    this.affectationService.getAffectation(this.affectationId).subscribe(res =>{
      loading.dismiss();
      this.affectation = res;
    });
  }

  async saveAffectation(){
    const loading = await this.loadingController.create({
      message: 'Sauvegarde ...'
    });
    await loading.present();

    if(this.affectationId){
      this.affectationService.updateAffectation(this.affectation, this.affectationId).then(() => {
        loading.dismiss();
        //this.nav.back('home');
      });
    } else {
      this.affectationService.addAffectation(this.affectation).then(()=> {
        loading.dismiss();
        //this.nav.back('home');
      });
    }
  }

   getAffectationsHours(){
    const i;
    this.affectations.forEach(function (value) {
      console.log(value);
    });
    const emptyHours = this.affectation.heureSelected;
    //savoir si emptyHours existe dans affectationSelect
    console.log("avant le slice", this.affectationSelect);
    for (i=0; i < this.emptyHours.length ; i++ ){
      if(this.affectationSelect.indexOf(this.emptyHours[i])){
        this.affectationSelect.splice(this.affectationSelect.indexOf(this.emptyHours[i]), 1);
      }
    }
    /*
    console.log("index de la recherche", this.affectationSelect.indexOf(this.emptyHours[0]));
    console.log("valeur de la recherche qui sera enlevée de la liste", this.emptyHours);
    //this.emptyHours = this.affectationSelect;
    console.log("avant le slice", this.emptyHours);
    this.affectationSelect.splice(this.affectationSelect.indexOf(this.emptyHours[0]), 1);
    console.log("apres le slice", this.emptyHours);*/
    console.log("apres le slice", this.affectationSelect);
    console.log("apres le slice", this.emptyHours);
    return this.emptyHours;
  }


}
