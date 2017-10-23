import { connect } from 'react-redux'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchBulletins } from './actions';

class BulletinList  extends React.Component {	
	
	componentDidMount() {
		this.props.dispatch(fetchBulletins());		
	}
	
  render(){			  
	 const bulletinsList = this.props.bulletins.map((bulletin) =>
	  	<li key={bulletin.id}>{bulletin.message}</li>
	  );
	  return(
        <ul>
          {bulletinsList}
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

export default connect(mapStateToProps)(BulletinList);


