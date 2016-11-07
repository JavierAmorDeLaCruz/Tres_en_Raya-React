(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Cabecera = require('./Cabecera.jsx');
var Tablero = require('./Tablero.jsx');

var JUGADORX = "jugador 1 - Las X";
var JUGADOR0 = "jugador 2 - Los 0";
var VALORES = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
var GAMESTATE = { GameInProgress: 1, GanaJugadorX: 2, GanaJugador0: 3 };

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      //Implementar aleatoriedad de inicio
      turno: JUGADORX,
      valores: VALORES,
      gameState: GAMESTATE.GameInProgress
    };
  },
  appClick: function appClick(numeroFila, numeroColumna) {
    var valores = this.state.valores;
    var nuevoValor = this.state.turno === JUGADORX ? 'X' : '0';
    valores[numeroFila][numeroColumna] = nuevoValor;
    this.checkGameStatus();
    this.setState({
      turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
      valores: this.state.valores
    });
  },
  checkGameStatus: function checkGameStatus() {
    if (this.state.gameState === GAMESTATE.GameInProgress) {
      var valores = this.state.valores;
      //HORIZONTAL
      var ganaX = valores[0][0] == 'X' && valores[0][1] == 'X' && valores[0][2] == 'X';
      ganaX = ganaX || valores[1][0] == 'X' && valores[1][1] == 'X' && valores[1][2] == 'X';
      ganaX = ganaX || valores[2][0] == 'X' && valores[2][1] == 'X' && valores[2][2] == 'X';
      var gana0 = valores[0][0] == '0' && valores[0][1] == '0' && valores[0][2] == '0';
      gana0 = gana0 || valores[1][0] == '0' && valores[1][1] == '0' && valores[1][2] == '0';
      gana0 = gana0 || valores[2][0] == '0' && valores[2][1] == '0' && valores[2][2] == '0';
      //VERTICAL
      ganaX = ganaX || valores[0][0] == 'X' && valores[1][0] == 'X' && valores[2][0] == 'X';
      ganaX = ganaX || valores[0][1] == 'X' && valores[1][1] == 'X' && valores[2][1] == 'X';
      ganaX = ganaX || valores[0][2] == 'X' && valores[1][2] == 'X' && valores[2][2] == 'X';
      gana0 = gana0 || valores[0][0] == '0' && valores[1][0] == '0' && valores[2][0] == '0';
      gana0 = gana0 || valores[0][1] == '0' && valores[1][1] == '0' && valores[2][1] == '0';
      gana0 = gana0 || valores[0][2] == '0' && valores[1][2] == '0' && valores[2][2] == '0';
      //DIAGONAl
      ganaX = ganaX || valores[0][0] == 'X' && valores[1][1] == 'X' && valores[2][2] == 'X';
      ganaX = ganaX || valores[0][2] == 'X' && valores[1][1] == 'X' && valores[2][0] == 'X';
      gana0 = gana0 || valores[0][0] == '0' && valores[1][1] == '0' && valores[2][2] == '0';
      gana0 = gana0 || valores[0][2] == '0' && valores[1][1] == '0' && valores[2][0] == '0';

      if (ganaX == true) {
        //this.state.gameState === GAMESTATE.GanaJugadorX;
        this.setState({
          gameState: GAMESTATE.GanaJugadorX
        });
        alert("Ganador: JUGADORX");
      } else if (gana0 == true) {
        // this.state.gameState === GAMESTATE.GanaJugador0;
        this.setState({
          gameState: GAMESTATE.GanaJugador0
        });
        alert("Ganador: JUGADOR0");
      }

      return;
    } else {
      return;
    }
  },
  render: function render() {
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
    return React.createElement(
      'div',
      null,
      React.createElement(Cabecera, { texto: texto }),
      React.createElement(Tablero, { valores: this.state.valores,
        manejadorTableroClick: this.appClick })
    );
  }
});

module.exports = App;

},{"./Cabecera.jsx":2,"./Tablero.jsx":4}],2:[function(require,module,exports){
"use strict";

var Cabecera = React.createClass({
	displayName: "Cabecera",

	render: function render() {
		return React.createElement(
			"header",
			{ className: "cabecera" },
			this.props.texto
		);
	}
});

module.exports = Cabecera;

},{}],3:[function(require,module,exports){
'use strict';

var casillaStyle = {
	height: '100px',
	width: '100px'
};

var Casilla = React.createClass({
	displayName: 'Casilla',

	// Manejador de clicks
	casillaClick: function casillaClick() {
		if (this.props.valor === '-') {
			this.props.manejadorClick(this.props.indiceFila, this.props.indiceColumna);
		}
	},
	render: function render() {
		return React.createElement(
			'button',
			{ style: casillaStyle, className: this.props.valor === '-' ? "clickable" : "no_clickable", onClick: this.casillaClick },
			this.props.valor
		);
	}
});

module.exports = Casilla;

},{}],4:[function(require,module,exports){
"use strict";

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
  displayName: "Tablero",

  // Manejador de Clicks
  tableroClick: function tableroClick(numeroFila, numeroColumna) {
    this.props.manejadorTableroClick(numeroFila, numeroColumna);
  },
  render: function render() {
    var Tablero = this.props.valores.map(function (valoresFila, indiceFila) {
      var fila = valoresFila.map(function (valor, indiceColumna) {
        var mykey = "" + indiceFila + indiceColumna;
        return React.createElement(Casilla, { valor: valor, indiceFila: indiceFila, indiceColumna: indiceColumna,
          key: mykey, manejadorClick: this.tableroClick });
      }, this);
      return React.createElement(
        "div",
        null,
        fila
      );
    }, this);
    return React.createElement(
      "div",
      null,
      " ",
      Tablero
    );
  }
});

module.exports = Tablero;

},{"./Casilla.jsx":3}],5:[function(require,module,exports){
"use strict";

/* Paso 2 var App = React.createClass({
	render: function() {
		return (

           <div> {this.props.valor} </div>
           
			);
	}
}); */

var App = require("./App.jsx");

/*valor="X"*/
ReactDOM.render(React.createElement(App, null), document.getElementById('contenedor'));

},{"./App.jsx":1}]},{},[5]);
