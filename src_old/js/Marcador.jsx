const PANEL_STYLE = {
    float: 'left',
    marginLeft: '10px',
    marginTop: '10px',
    width: '110px'
};

var React = require('react');
var ReactDOM = require('react-dom');

import { Panel } from 'react-bootstrap';

var Marcador = React.createClass({
    render: function() {
        let marcador = this.props.jugadores.map(function(jugador) {
            let myKey = jugador.name;
            return(
                <Panel style={PANEL_STYLE} key={myKey} header={jugador.name}>
                    {jugador.points}
                </Panel>
            );
        }, this);
        return(<div>{marcador}</div>);
    }
});

module.exports = Marcador;