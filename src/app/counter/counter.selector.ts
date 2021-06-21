import { CounterState } from './counter.reducer';

import { createSelector } from '@ngrx/store';
export interface AppState {
    count: CounterState;
}

export const selectCount = (state: AppState) => state.count;

export const selectCounter = createSelector(
    selectCount,
    (state: CounterState) => state.counter
);

export const selectNumberOfResets = createSelector(
    selectCount,
    (state: CounterState) => state.numberOfResets
);
