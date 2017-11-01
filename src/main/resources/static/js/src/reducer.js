// ****** Reducers ******

import {
  BULLETIN_POSTED,
  BULLETINS_FETCHED,
  BULLETIN_DELETED
} from './actions'

import {
  store
} from './App';

const initialState = {
  bulletins: []
}

// Return the new state based on the Action pay load
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case BULLETIN_POSTED:
      console.log("Bulletin posted -> Update state!");
      return Object.assign({}, state, {
        bulletins: store.getState().bulletins.concat([action.bulletin])
      });
    case BULLETINS_FETCHED:
      return Object.assign({}, state, {
        bulletins: store.getState().bulletins.concat(action.bulletins)
      });
    case BULLETIN_DELETED:
      return Object.assign({}, state, {
        bulletins: store.getState().bulletins.filter(bulletin => bulletin.id != action.bulletinId)
      });
    default:
      return initialState;
  }
}
