var React = require('react');
var ReactDOM = require('react-dom');

import { Button } from 'react-bootstrap';

const CASILLA_STYLE = {
    height: '100px',
    width: '100px'
};

let Casilla = React.createClass({
    casillaClick: function () {
        if(this.props.valor === "-" && !this.props.fin) {
            this.props.manejadorClick(this.props.indiceFila, this.props.indiceColumna);
        }
    },
    
    render: function() {
        return (
            <Button bsStyle="primary" style={CASILLA_STYLE} className={this.props.valor === "-"? "clickable" : "no_clickable"} onClick={this.casillaClick}>
                {this.props.valor}
            </Button>
        )
    }
});

module.exports = Casilla;
