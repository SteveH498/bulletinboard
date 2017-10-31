import { connect } from 'react-redux'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchBulletins } from './actions';

import List, { ListItem, ListItemText,  ListItemSecondaryAction } from 'material-ui/List';

import Grid from 'material-ui/Grid';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';

class BulletinList extends React.Component {	

    constructor(props) {
	    super(props);  
	    // This binding is necessary to make `this` work in the callback
	    this.handleDelete = this.handleDelete.bind(this);
	  }	
	
	componentDidMount() {
		this.props.dispatch(fetchBulletins());		
	}
	
	handleDelete(event){
		console.log("Delet Bulletin");
	}
	
  render(){			  
	 const bulletinsList = this.props.bulletins.map((bulletin) =>	 	
	 	<ListItem key={bulletin.id} default>
	  		<ListItemText primary={bulletin.userID} secondary={bulletin.message}  />
	  		<ListItemSecondaryAction>
	            <IconButton aria-label="Delete" onClick={this.handleDelete}>
	              <DeleteIcon />
	            </IconButton>
          </ListItemSecondaryAction>
	  	</ListItem>		
	  );
	  return(
		<Grid container>
			<Grid item xs={12}>
	        	<List>
	        	{bulletinsList}
	        	</List>	
	        </Grid>
	     </Grid>
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

export default connect(mapStateToProps)(BulletinList);


