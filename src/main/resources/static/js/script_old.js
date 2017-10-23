const CONSTANTS = {
    API: "/bulletinboard/api/v1"
}


// ****** Action creators ******
const BULLETIN_POSTED = "BULLETIN_POSTED";

function bulletinPosted(json){
	return {type: BULLETIN_POSTED, bulletin: json };
}

const POST_BULLETIN = "POST_BULLETIN";

function postBulletin(message) {
	  // Thunk middleware knows how to handle functions.
	  // It passes the dispatch method as an argument to the function,
	  // thus making it able to dispatch actions itself.
	  return function (dispatch) {  
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


const BULLETINS_FETCHED = "BULLETINS_FETCHED";

function bulletinsFetched(json){
	console.log(json);
	return {type: BULLETINS_FETCHED, bulletins: json };
}

const FETCH_BULLETINS = "FETCH_BULLETINS";

function fetchBulletins() {
	  // Thunk middleware knows how to handle functions.
	  // It passes the dispatch method as an argument to the function,
	  // thus making it able to dispatch actions itself.
	
	  return function (dispatch) {  
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





// ****** Reducers ******
const initialState = {
		bulletins: []
}

// Return the new state based on the Action pay load
function reducer(state = initialState, action){
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



// ****** UI Components ******
var connect = ReactRedux.connect; // ES5 (UMD build)

let PostBulletinForm = ({ dispatch }) => {			
		let input	
		return (			
		<form onSubmit={e => {
	          e.preventDefault()
	          if (!input.value.trim()) {
	            return
	          }
	          dispatch(postBulletin(input.value)) // send data to store
	          input.value = ''
	        }}>
		  <label>
		    Bulletin:
		    <input type="text" ref={node => {
	            input = node
	          }} />
		  </label>
		  <input type="submit" value="Submit" />
		</form>				
	);		
};

// Connects a React component to a Redux store. 
// Inject just dispatch and don't listen to store
PostBulletinForm = connect()(PostBulletinForm);




class BulletinList  extends React.Component {	
	
	componentDidMount() {
		this.props.dispatch(fetchBulletins());		
	}
	
  render(){			  
	 const bulletinsList = this.props.bulletins.map((bulletin) =>
	  	<li>{bulletin.message}</li>
	  );
	  return(
        <ul>
          <li>{bulletinsList}</li>
        </ul>			  
	  );
  }
}


BulletinList.propTypes = {
	bulletins: PropTypes.array.isRequired,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		bulletins: state.bulletins
	}
}

BulletinList = connect(mapStateToProps)(BulletinList)


// ****** Main App Container ******
var createStore = Redux.createStore; // ES5 (UMD build)
var applyMiddleware = Redux.applyMiddleware; // ES5 (UMD build)
var thunkMiddleware = ReduxThunk.default; // ES5 (UMD build)

let store = createStore(reducer, {}, applyMiddleware(
      thunkMiddleware
));

const App = () => (
	<div>
		<BulletinList/>
		<PostBulletinForm />	
	</div>
);


ReactDOM.render(
	  <ReactRedux.Provider store={store}>
	  	<App  />
	  </ReactRedux.Provider>,
	  document.getElementById("root")
);
