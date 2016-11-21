/* Paso 2 var App = React.createClass({
	render: function() {
		return (

           <div> {this.props.valor} </div>
           
			);
	}
}); */

const App = require("./App.jsx");

/*valor="X"*/
ReactDOM.render(<App />, document.getElementById('contenedor'));