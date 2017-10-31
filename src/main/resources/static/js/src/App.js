import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducer from './reducer';
import BulletinList from './BulletinList'
import PostBulletinForm from './PostBulletinForm'

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

export let store = createStore(reducer, {}, applyMiddleware(
      thunkMiddleware
));


const MainView = () => (
	<div>
		<AppBar position="static" color="primary">
		  <Toolbar>
	        <Typography type="title" color="inherit">
	          Bulletin Board
	        </Typography>
	      </Toolbar>
	    </AppBar>
		<BulletinList/>
		<PostBulletinForm />
	</div>
); 

const App = () => (
	 <Provider store={store}>
	 	<MainView/>
	</Provider>	
);


ReactDOM.render(	 
	  <App  />,
	  document.getElementById("root")
);