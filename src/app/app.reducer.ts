export interface AppState {
  isLoading: boolean;
}

const initialState: AppState = {
  isLoading: false
};

export function appReducer(state: AppState = initialState, action): AppState {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'STOP_LOADING':
      return {
        ...state,
        isLoading: false
      };
    default:
      return {
        ...state
      };
  }
}
