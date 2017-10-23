import { connect } from 'react-redux'
import React, { Component } from 'react';
import { postBulletin } from './actions';

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

export default PostBulletinForm;