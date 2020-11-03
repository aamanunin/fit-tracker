import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';


export interface State {
  ui: fromUi.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.reducer
};

export const getUiState = createFeatureSelector('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
