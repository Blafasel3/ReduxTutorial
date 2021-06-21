import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, increment, reset } from './counter.actions';
import { selectCounter, selectNumberOfResets } from './counter.selector';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
})
export class CounterComponent {
    count$: Observable<number>;
    numberOfResets$: Observable<number>;
    
    constructor(private store: Store<{}>) {
        this.count$ = store.select(selectCounter);
        this.numberOfResets$ = store.select(selectNumberOfResets);
    }

    increment() {
        this.store.dispatch(increment());
    }

    decrement() {
        this.store.dispatch(decrement());
    }

    reset() {
        this.store.dispatch(reset());
    }
}