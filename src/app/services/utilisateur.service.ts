import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Utilisateur{
  nom:string;
  prenom:string;
}
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private utilisateursCollection: AngularFirestoreCollection<Utilisateur>;

  private utilisateurs: Observable<Utilisateur[]>;

  constructor(db: AngularFirestore) {
    this.utilisateursCollection = db.collection<Utilisateur>('utilisateurs');

    this.utilisateurs = this.utilisateursCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    )
  }

  getUtilisateurs(){
    return this.utilisateurs;
  }

  getUtilisateur(id){
    return this.utilisateursCollection.doc<Utilisateur>(id).valueChanges();
  }

  updateUtilisateur(utilisateur:Utilisateur, id:string){
    return this.utilisateursCollection.doc(id).update(utilisateur);
  }

  addUtilisateur(utilisateur:Utilisateur){
    return this.utilisateursCollection.add(utilisateur);
  }
  removeUtilisateur(id){
    return this.utilisateursCollection.doc(id).delete();
  }

}
