const Cabecera = require('./Cabecera.jsx');
const Tablero = require('./Tablero.jsx');

const JUGADORX = "jugador 1 - Las X";
const JUGADOR0 = "jugador 2 - Los 0";
const VALORES = [['-','-','-'],['-','-','-'],['-','-','-']];

var App = React.createClass({
	getInitialState: function() {
		return {
			//Implementar aleatoriedad de inicio
			turno: JUGADORX,
			valores: VALORES
		};
	},
	appClick: function(numeroFila, numeroColumna){
		let valores = this.state.valores;
		let nuevoValor = this.state.turno === JUGADORX ? 'X' : '0';
		valores[numeroFila][numeroColumna] = nuevoValor;
        this.setState({
        	turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
        	valores: this.state.valores
        });
	},
	render: function() {
		var texto = "Turno del " + this.state.turno;
		/* --Paso4-- var htmlTablero = [];
		for (var i=0; i< this.state.valores.length; i++){
			var htmlFila = [];
			for (var a=0; a< this.state.valores[i].length; a++){
				htmlFila.push(<span>{this.state.valores[i][a]}</span>);
			}
			htmlTablero.push(<div>{htmlFila}</div>); */
        /* --Paso5-- let htmlTablero = this.state.valores.map(function(valoresFila, indiceFila){
        	let fila = valoresFila.map(function(valor, indiceColumna){
        		return (
        			<span>{valor}</span>
        			)
        	});
        	return (
        	<div>{fila}</div>
        	)
        });
		} */
		return (
          <div>
             <Cabecera texto={texto}/>
             <Tablero valores={this.state.valores}
                manejadorTableroClick={this.appClick}/>
          </div>
		)
	}
});

module.exports = App;