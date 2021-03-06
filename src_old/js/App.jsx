var React = require('react');
var ReactDOM = require('react-dom');

import { PageHeader } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const Cabecera = require("./Cabecera.jsx");
const Tablero = require("./Tablero.jsx");
const Marcador = require("./Marcador.jsx");

let JUGADORX = {name: "JUGADORX", text: "jugador 1 - las X", points: 0};
let JUGADOR0 = {name: "JUGADOR0", text: "jugador 0 - los 0", points: 0};
const VALORES = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
let jugadores = [JUGADOR0, JUGADORX];

var horizontal = function(valores, numeroFila) {
    return valores[numeroFila][0] === valores[numeroFila][1] && valores[numeroFila][0] === valores[numeroFila][2];
};

var vertical = function(valores, numeroColumna) {
    return valores[0][numeroColumna] === valores[1][numeroColumna] && valores[0][numeroColumna] === valores[2][numeroColumna];
};

var diagonal = function(valores) {
    let diagonal1 = [[valores[0][0], valores[1][1], valores[2][2]], ['-', '-', '-']];
    let diagonal2 = [[valores[0][2], valores[1][1], valores[2][0]], ['-', '-', '-']];

    return (diagonal1[0].indexOf('-') < 0 && horizontal(diagonal1, 0)) || (diagonal2[0].indexOf('-') < 0 && horizontal(diagonal2, 0));
};

var App = React.createClass({
    getInitialState: function() {
        return {
            turno: JUGADORX,
            valores: VALORES,
            fin: false
        };
    },

    ganador: function(valores, numeroFila, numeroColumna) {
        if(horizontal(valores, numeroFila) || vertical(valores, numeroColumna) || diagonal(valores)) {
            alert("El ganador es el " + this.state.turno.name);
            this.setState({
                turno: "Juego acabado",
                fin: true
            });
        }
    },

    appClick: function(numeroFila, numeroColumna) {
        let valores = this.state.valores;
        let nuevoValor = (this.state.turno === JUGADORX) ? 'X' : '0';
        valores[numeroFila][numeroColumna] = nuevoValor;
        this.state.turno.points++;
        this.setState({
            turno: (this.state.turno === JUGADORX) ? JUGADOR0 : JUGADORX,
            valores: this.state.valores
        });
        this.ganador(valores, numeroFila, numeroColumna);
    },

    reiniciar: function() {
        JUGADORX.points = 0;
        JUGADOR0.points = 0;
        this.setState({
            turno: JUGADORX,
            valores: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
            fin: false
        });
    },

    render: function() {
        var texto = this.state.turno.text ? "Turno del " + this.state.turno.text : "" + this.state.turno;
        return (
            <div>
                <PageHeader>Tres En Raya <small>IWEB</small></PageHeader>
                <Cabecera texto={texto}/>
                <Tablero valores={this.state.valores} manejadorTableroClick={this.appClick} fin={this.state.fin} style={{width: '300px', marginLeft: '10px'}}/>
                <Button bsStyle="success" style={{marginLeft: '10px', marginTop: '10px'}} onClick={this.reiniciar}>Reiniciar partida</Button>
                <Marcador jugadores={jugadores}/>
            </div>
        )
    }
});

module.exports = App;
