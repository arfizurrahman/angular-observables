import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumbers = Observable.interval(1000)
    .map(
      (data: number) => {
        return data*2;
      }
    );
    this.numberObsSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    const customObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(()=>{
        observer.next("first package");
      },2000);
      setTimeout(()=>{
        observer.next("second package");
      },4000);
      setTimeout(()=>{
        //  observer.error("This does not work");
        observer.complete();
      },5000);
      setTimeout(()=>{
        observer.next("third package");
      },6000);
    });

    this.customObsSubscription = customObservable.subscribe(
      (data: string)=>{ console.log(data)},
       (errorMsg: string)=>{ console.log(errorMsg)},
       ()=>{ console.log('completed')}
    );
  }

  ngOnDestroy() {
    this.numberObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }
}
 