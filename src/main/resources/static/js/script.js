const CONSTANTS = {
    API: "/bulletinboard/api/v1"
}



class BulletinList  extends React.Component {
	
	  constructor(props) {
		    super(props);

		    this.state = {
		      bulletins: [],
		    };
		  }

		  componentDidMount() {
		    fetch(CONSTANTS.API + "/bulletins")
		      .then(response => response.json())
		      .then(data => this.setState({ bulletins: data }))
		      .catch((error) => {
		          console.error(error);
		        });		
		  }	
		  		  
		  render(){			  
			 const bulletinsList = this.state.bulletins.map((bulletin) =>
			  	<li>{bulletin.message}</li>
			  );
			  return(
		        <ul>
		          <li>{bulletinsList}</li>
		        </ul>			  
			  );
		  }
}


class PostBulletinForm extends React.Component {

		constructor(props) {
		    super(props);
		    this.state = {bulletin: ''};
	
		    this.handleChange = this.handleChange.bind(this);
		    this.handleSubmit = this.handleSubmit.bind(this);
		  }
	
		  handleChange(event) {
			  this.setState({bulletin: event.target.value});
		  }
	
		  handleSubmit(event) {
				  
			  fetch(CONSTANTS.API + "/bulletin", {
				  method: 'POST',
				  headers: {
				    'Accept': 'application/json',
				    'Content-Type': 'application/json',
				  },
				  body: JSON.stringify({
					  message: this.state.bulletin
				   
				  })
				}).then((response) => response.json())
			      .then((responseJson) => {
			          console.log(responseJson)
			        })
			        .catch((error) => {
			          console.error(error);
			        });		  
			  
			  
			    console.log('A bulletin was submitted: ' + this.state.bulletin);
			    event.preventDefault();
		  }
	
		render() {
			return (			
			<form onSubmit={this.handleSubmit}>
			  <label>
			    Bulletin:
			    <input type="text" name="bulletin" value={this.state.bulletin} onChange={this.handleChange}/>
			  </label>
			  <input type="submit" value="Submit" />
			</form>				
		);
		}
	
}



const App = () => (
		<div>
			<BulletinList />
			<PostBulletinForm />	
		</div>
	);



ReactDOM.render(
		  <App  />,
		  document.getElementById("root")
	);



