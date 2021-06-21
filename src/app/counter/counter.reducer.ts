import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';


export interface CounterState {
  counter: number;
  numberOfResets: number;
}

export const initialState: CounterState = {
  counter: 0,
  numberOfResets: 0
};


const _counterReducer = createReducer(
  initialState,
  on(increment, state => ({ ...state, counter: state.counter + 1 })),
  on(decrement, state => ({ ...state, counter: state.counter - 1 })),
  on(reset, state => ({ ...state, counter: 0, numberOfResets: state.numberOfResets + 1 }))
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
