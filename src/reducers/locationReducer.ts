import { State, Action } from '../interfaces/reducers/locationReducer.interface'
import { Reducer } from 'react'


/*
   I made this reducer just to demonstrate the usual workflow of something similar to redux but I did not do a full implementation
*/

export const initialState = {
    isLoading: false,
    error: '',
    coordinates: {
        longitude: 0,
        latitude: 0
    }
};


  
  export const locationReducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
      case "request":
        return {
          ...state,
          isLoading: true
        };
    case "success":
        return {
          ...state,
          isLoading: false,
          error: '',
          coordinates: action.coordinates
        };
    case "failure":
        return {
            ...state,
            isLoading: false,
            error: action.error
        };
      default:
        return state;
    }
  };