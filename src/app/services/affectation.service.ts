import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Affectation{
  utilisateur:string;
  ordinateur:string;
  heureSelected:string;
}
@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  private affectationsCollection: AngularFirestoreCollection<Affectation>;

  private affectations: Observable<Affectation[]>;

  constructor(db: AngularFirestore) {
    this.affectationsCollection = db.collection<Affectation>('affectations');

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
  getAffectationsHours(){
    return this.affectations.utilisateur;
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

}
