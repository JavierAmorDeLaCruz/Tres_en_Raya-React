const Cabecera = require('./Cabecera.jsx');
const Tablero = require('./Tablero.jsx');

const JUGADORX = "jugador 1 - Las X";
const JUGADOR0 = "jugador 2 - Los 0";
const VALORES = [['-','-','-'],['-','-','-'],['-','-','-']];
const GAMESTATE = {GameInProgress:1, GanaJugadorX:2, GanaJugador0:3};

var App = React.createClass({
	getInitialState: function() {
		return {
			//Implementar aleatoriedad de inicio
			turno: JUGADORX,
			valores: VALORES,
			gameState: GAMESTATE.GameInProgress
		};
	},
	appClick: function(numeroFila, numeroColumna){
	let valores = this.state.valores;
	let nuevoValor = this.state.turno === JUGADORX ? 'X' : '0';
	valores[numeroFila][numeroColumna] = nuevoValor;
	this.checkGameStatus();
      this.setState({
      	turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
        valores: this.state.valores,
       });
	},
	checkGameStatus: function(){
      if(this.state.gameState === GAMESTATE.GameInProgress){
      let valores = this.state.valores;
        //HORIZONTAL
        var ganaX=(valores[0][0] == 'X' && valores[0][1] == 'X' && valores[0][2]=='X');
        ganaX=ganaX || (valores[1][0] == 'X' && valores[1][1] == 'X' && valores[1][2]=='X');
        ganaX=ganaX || (valores[2][0] == 'X' && valores[2][1] == 'X' && valores[2][2]=='X');
        var gana0=(valores[0][0] == '0' && valores[0][1] == '0' && valores[0][2]=='0');
        gana0=gana0 || (valores[1][0] == '0' && valores[1][1] == '0' && valores[1][2]=='0');
        gana0=gana0 || (valores[2][0] == '0' && valores[2][1] == '0' && valores[2][2]=='0');
        //VERTICAL
        ganaX=ganaX || (valores[0][0] == 'X' && valores[1][0] == 'X' && valores[2][0]=='X');
        ganaX=ganaX || (valores[0][1] == 'X' && valores[1][1] == 'X' && valores[2][1]=='X');
        ganaX=ganaX || (valores[0][2] == 'X' && valores[1][2] == 'X' && valores[2][2]=='X');
        gana0=gana0 || (valores[0][0] == '0' && valores[1][0] == '0' && valores[2][0]=='0');
        gana0=gana0 || (valores[0][1] == '0' && valores[1][1] == '0' && valores[2][1]=='0');
        gana0=gana0 || (valores[0][2] == '0' && valores[1][2] == '0' && valores[2][2]=='0');
        //DIAGONAl
        ganaX=ganaX || (valores[0][0] == 'X' && valores[1][1] == 'X' && valores[2][2]=='X');
        ganaX=ganaX || (valores[0][2] == 'X' && valores[1][1] == 'X' && valores[2][0]=='X');
        gana0=gana0 || (valores[0][0] == '0' && valores[1][1] == '0' && valores[2][2]=='0');
        gana0=gana0 || (valores[0][2] == '0' && valores[1][1] == '0' && valores[2][0]=='0');
       

      if (ganaX == true){
        //this.state.gameState === GAMESTATE.GanaJugadorX;
        this.setState({
           gameState: GAMESTATE.GanaJugadorX
        });
       	alert("Ganador: JUGADORX");


       }
      else if (gana0 == true){
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