import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Affectation{
  idAffectation:string;
  utilisateur:string;
  ordinateur:string;
  date:string;
  heure:string;
}
@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  private affectationsCollection: AngularFirestoreCollection<Affectation>;

  private affectations: Observable<Affectation[]>;

  constructor(db: AngularFirestore) {
    this.affectationsCollection = db.collection<Affectation>('Affectations');

    this.affectations = this.affectationsCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    )
  }

  getAffectations(){
    return this.affectations;
  }

  getAffectation(id){
    return this.affectationsCollection.doc<Affectation>(id).valueChanges();
  }

  updateAffectation(affectation:Affectation, id:string){
    return this.affectationsCollection.doc(id).update(affectation);
  }

  addAffectation(affectation:Affectation){
    return this.affectationsCollection.add(affectation);
  }
  removeAffectation(id){
    return this.affectationsCollection.doc(id).delete();
  }
  checkAndExcludeDateFromAffectation(){}

}