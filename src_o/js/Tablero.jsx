var Casilla = require('./Casilla.jsx');

/* --Paso6 var Tablero = React.createClass({
	render: function() {
           let htmlTablero = this.props.valores.map(function(valoresFila, indiceFila){
        	let fila = valoresFila.map(function(valor, indiceColumna){
        		return (
        			<span>{valor}</span>
        			)
        	});
        	return (
        	<div>{fila}</div>
        	)
        });
        return (
         <div> {htmlTablero}</div>
         );
	}
}); */
var Tablero = React.createClass({
	// Manejador de Clicks
	tableroClick: function(numeroFila,numeroColumna){
		this.props.manejadorTableroClick(numeroFila, numeroColumna);
	},
	render: function() {
           let Tablero = this.props.valores.map(function(valoresFila, indiceFila){
        	let fila = valoresFila.map(function(valor, indiceColumna){
        		let mykey = "" + indiceFila + indiceColumna;
        		return (
        			<Casilla valor={valor} indiceFila={indiceFila} indiceColumna={indiceColumna}
        			key={mykey} manejadorClick={this.tableroClick}/>
        			)
        	}, this);
        	return (
        	<div>{fila}</div>
        	)
        }, this);
        return (
         <div> {Tablero}</div>
         );
	}
});


module.exports = Tablero;