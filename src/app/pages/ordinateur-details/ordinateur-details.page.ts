import { Ordinateur, OrdinateurService } from './../../services/ordinateur.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-ordinateur-details',
  templateUrl: './ordinateur-details.page.html',
  styleUrls: ['./ordinateur-details.page.scss'],
})
export class OrdinateurDetailsPage implements OnInit {

  ordinateur: Ordinateur = {
    nomOrdinateur:''
  };

  ordinateurId = null;

  constructor(private route: ActivatedRoute, private nav: NavController, private ordinateurService: OrdinateurService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.ordinateurId = this.route.snapshot.params['id'];
    if(this.ordinateurId){
      this.loadOrdinateur();
    }
  }

  async loadOrdinateur(){
    const loading = await this.loadingController.create({
      message: 'Chargement de la liste des ordinateurs'
    });
    await loading.present();

    this.ordinateurService.getOrdinateur(this.ordinateurId).subscribe(res =>{
      loading.dismiss();
      this.ordinateur = res;
    });
  }

  async saveOrdinateur(){
    const loading = await this.loadingController.create({
      message: 'Sauvegarde ...'
    });
    await loading.present();

    if(this.ordinateurId){
      this.ordinateurService.updateOrdinateur(this.ordinateur, this.ordinateurId).then(() => {
        loading.dismiss();
        this.nav.back('home');
      });
    } else {
      this.ordinateurService.addOrdinateur(this.ordinateur).then(()=> {
        loading.dismiss();
        this.nav.back('home');
      });
    }
  }

}
