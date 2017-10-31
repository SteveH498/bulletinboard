import { connect } from 'react-redux'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchBulletins } from './actions';

import List, { ListItem, ListItemText } from 'material-ui/List';

import Grid from 'material-ui/Grid';

class BulletinList extends React.Component {	
	
	componentDidMount() {
		this.props.dispatch(fetchBulletins());		
	}
	
  render(){			  
	 const bulletinsList = this.props.bulletins.map((bulletin) =>	 	
	 	<ListItem default>
	  		<ListItemText primary={bulletin.userID} secondary={bulletin.message} key={bulletin.id} />
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


