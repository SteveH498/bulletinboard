// ****** Reducers ******

import {
  BULLETIN_POSTED,
  POST_BULLETIN,
  BULLETINS_FETCHED,
  FETCH_BULLETINS
} from './actions'

import { store } from './App';

const initialState = {
		bulletins: []
}

// Return the new state based on the Action pay load
export default function reducer(state = initialState, action){
	 switch (action.type) {
	    case BULLETIN_POSTED:    
	    	console.log("Bulletin posted -> Update state!");
	    	return Object.assign({}, state, {bulletins: store.getState().bulletins.concat([action.bulletin])});	
	    case BULLETINS_FETCHED:
	    	return Object.assign({}, state, {bulletins: store.getState().bulletins.concat(action.bulletins)});	
	    default:
	    	return initialState;	
	 }
}