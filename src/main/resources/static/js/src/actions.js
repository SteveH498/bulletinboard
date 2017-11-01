const CONSTANTS = {
  API: "/bulletinboard/api/v1"
}


// ****** Action creators ******
export const BULLETIN_POSTED = "BULLETIN_POSTED";
export const POST_BULLETIN = "POST_BULLETIN";
export const BULLETINS_FETCHED = "BULLETINS_FETCHED";
export const FETCH_BULLETINS = "FETCH_BULLETINS";
export const BULLETIN_DELETED = "BULLETIN_DELETED";
export const DELETE_BULLETIN = "DELETE_BULLETIN";


export function bulletinDeleted(id) {
  return {
    type: BULLETIN_DELETED,
    bulletinId: id
  };
}

export function deleteBulletin(id) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return function(dispatch) {
    return fetch(CONSTANTS.API + "/bulletin/" + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(
      // Here, we update the app state with the results of the API call.
      response => dispatch(bulletinDeleted(id)),
      // Do not use catch, because that will also catch
      // any errors in the dispatch and resulting render,
      // causing a loop of 'Unexpected batch number' errors.
      // https://github.com/facebook/react/issues/6895
      error => console.log('An error occured.', error)
    );
  }

}

export function bulletinPosted(json) {
  return {
    type: BULLETIN_POSTED,
    bulletin: json
  };
}

export function postBulletin(message) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return function(dispatch) {
    return fetch(CONSTANTS.API + "/bulletin", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message
        })
      }).then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occured.', error)
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(bulletinPosted(json))
      )
  }
}


export function bulletinsFetched(json) {
  console.log(json);
  return {
    type: BULLETINS_FETCHED,
    bulletins: json
  };
}



export function fetchBulletins() {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function(dispatch) {
    return fetch(CONSTANTS.API + "/bulletins", {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }).then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occured.', error)
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(bulletinsFetched(json))
      )
  }
}
