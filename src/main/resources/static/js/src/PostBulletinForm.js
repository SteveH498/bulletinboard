import { connect } from 'react-redux'
import React, { Component } from 'react';
import { postBulletin } from './actions';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Grid from 'material-ui/Grid';

class PostBulletinForm extends React.Component {

      constructor(props) {
	    super(props);  
	    // This binding is necessary to make `this` work in the callback
	    this.handleSubmit = this.handleSubmit.bind(this);
	  }	
  	  
	  handleSubmit(event){	
		  event.preventDefault();
		  let inputValue = this.input.value;
          if (!inputValue.trim()) {
            return;
          }
          this.props.dispatch(postBulletin(inputValue)); // send data to store	
          this.input.value = "";         
	  }
  
	  render() {
		    return (
			    <form onSubmit={this.handleSubmit}>	
			    	<Grid container>
				    	<Grid item xs={10}>
						 	<TextField
						      id="bulletin"
						      label="Bulletin"
						      placeholder="Enter Bulletin"	
						 	  fullWidth={true}
						 	  inputRef={ (input) => this.input = input }
						 	  onChange={this.handleChange}
						 	/>
						 </Grid>
						 <Grid item xs={2}>
						  <Button fab color="primary" aria-label="add" type="submit">
					        <AddIcon />
					      </Button>				      
					     </Grid>
				     </Grid>
				</form>	
		    );
		  }	
}

PostBulletinForm.propTypes = {
		dispatch: PropTypes.func.isRequired
}

// Connects a React component to a Redux store. 
// Inject just dispatch and don't listen to store
PostBulletinForm = connect()(PostBulletinForm);
//
export default PostBulletinForm;
