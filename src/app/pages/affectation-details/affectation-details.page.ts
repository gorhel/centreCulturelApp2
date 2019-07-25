import { Affectation, AffectationService } from './../../services/affectation.service';
import { Ordinateur, OrdinateurService } from './../../services/ordinateur.service';
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
    date: '',
    heure: ''
  };

  affectationId = null;
  //let selectOptions: Array<string> = ['Apple', 'Orange', 'Banana'];
  //selectOptions = ["Option 1", "Option 2", "Option 3"];
  selectOptions = [];
  ordinateur: Ordinateur[];

  constructor(private route: ActivatedRoute, private nav: NavController, private affectationService: AffectationService, private ordinateurService: OrdinateurService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.affectationId = this.route.snapshot.params['id'];
    if(this.affectationId){
      this.loadAffectation();
    }
    this.ordinateurService.getOrdinateurs().subscribe(res => {
      this.ordinateur = res;
    });
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

}
