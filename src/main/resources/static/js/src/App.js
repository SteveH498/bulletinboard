import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducer from './reducer';
import BulletinList from './BulletinList'
import PostBulletinForm from './PostBulletinForm'

export let store = createStore(reducer, {}, applyMiddleware(
      thunkMiddleware
));


const App = () => (
	<div>
		<BulletinList/>
		<PostBulletinForm />	
	</div>
);


ReactDOM.render(
	  <Provider store={store}>
	  	<App  />
	  </Provider>,
	  document.getElementById("root")
);