import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Ordinateur{
  nomOrdinateur:string;
}
@Injectable({
  providedIn: 'root'
})
export class OrdinateurService {

  private ordinateursCollection: AngularFirestoreCollection<Ordinateur>;

  private ordinateurs: Observable<Ordinateur[]>;

  constructor(db: AngularFirestore) {
    this.ordinateursCollection = db.collection<Ordinateur>('ordinateurs');

    this.ordinateurs = this.ordinateursCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getOrdinateurs(){
    return this.ordinateurs;
  }

  getOrdinateur(id){
    return this.ordinateursCollection.doc<Ordinateur>(id).valueChanges();
  }

  updateOrdinateur(ordinateur:Ordinateur, id:string){
    return this.ordinateursCollection.doc(id).update(ordinateur);
  }

  addOrdinateur(ordinateur:Ordinateur){
    return this.ordinateursCollection.add(ordinateur);
  }
  removeOrdinateur(id){
    return this.ordinateursCollection.doc(id).delete();
  }

}
