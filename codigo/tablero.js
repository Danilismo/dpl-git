function Tablero(dimensiones, nivel)
{
	this.tablero = [];
	this.mazmorra = document.createElement("table");
	this.mazmorra.setAttribute("id", "tablero");

	for (var i = 0; i < dimensiones; i++)
	{
		var filaHtml = document.createElement("tr");
		var filaArray = [];
		for (var j = 0; j < dimensiones; j++)
		{
			var celda = new Celda();
			celda.getCasilla().setAttribute("id", "x" + i + "y" + j);
			filaHtml.appendChild(celda.getCasilla());
			filaArray.push(celda);
		}
		this.tablero.push(filaArray);
		this.mazmorra.appendChild(filaHtml);
	}
    var hola = document.getElementsByTagName("section")[0];
	document.getElementsByTagName("section")[0].insertBefore(this.mazmorra, document.getElementById("informacion"));
    this.generarTipoCasillas(nivel);
}


Tablero.prototype = {

	getMazmorra : function()
	{
		return this.mazmorra;
	},
    
    getTablero : function()
    {
      return this.tablero;  
    },

	obtenerCasilla : function(casillaABuscar)
	{
		var identificador = casillaABuscar.id;
        var hola = this;
		
		identificador = identificador.split("");
		var coorX = identificador[1];
		var coorY = identificador[3];

		return this.tablero[coorX][coorY];
	},
    
    moverFila : function(direccion)
    {
        var casillaSeleccionada = document.getElementsByClassName("seleccionada")[0];
        var casillaAMover;
        var padre;
        var identificador = casillaSeleccionada.id;
        identificador = identificador.split("");
        var coorX = identificador[1];

        if (Number(coorX) != (this.tablero.length - 1))
        {
            if (direccion == "izquierda")
            {
                var coorY = 0;
                var aux = this.tablero[coorX][coorY];

                casillaAMover = casillaSeleccionada.parentNode.firstChild;
                padre = casillaAMover.parentNode;
                padre.removeChild(casillaAMover);
                padre.appendChild(casillaAMover);
                this.tablero[coorX].shift(this.tablero[coorX][coorY]);
                this.tablero[coorX].push(aux);
            }
            else
            {
                var coorY = this.tablero[coorX].length - 1;
                var aux = this.tablero[coorX][coorY];

                casillaAMover = casillaSeleccionada.parentNode.lastChild;
                padre = casillaAMover.parentNode;
                padre.removeChild(casillaAMover);
                padre.insertBefore(casillaAMover, padre.firstChild);
                this.tablero[coorX].pop(this.tablero[coorX][coorY]);
                this.tablero[coorX].unshift(aux);
            }
            this.resetearIdFila(coorX);
            return true;
        }
        else
        {
            return false;
        }
    },
    
    moverColumna : function(direccion)
    {
        var casillaSeleccionada = document.getElementsByClassName("seleccionada")[0];
        var casillaAMover;
        var padre;
        var casillaAuxiliar;
        var identificador = casillaSeleccionada.id;
        identificador = identificador.split("");
        var coorX;
        var coorY = identificador[3];
        var aux;
        var auxDom;

        if (Number(coorY) != (this.tablero.length - 1))
        {
            if (direccion == "arriba")
            {
                coorX = 0;
                aux = this.tablero[coorX][coorY].getCasilla();
                auxTipo = this.tablero[coorX][coorY].getTipo();
                //Comienzo de la parte de mover el DOM hacia arriba
                casillaAuxiliar = this.mazmorra.children[0].children[coorY];
                casillaAuxiliar.parentNode.removeChild(casillaAuxiliar);
                for(var i = 1; i < this.tablero.length; i++)
                {
                    casillaAMover = this.mazmorra.children[i].children[coorY];
                    this.mazmorra.children[i - 1].children[coorY].parentNode.insertBefore(casillaAMover, this.mazmorra.children[i - 1].children[coorY]); 
                }
                this.mazmorra.children[this.tablero.length - 1].children[coorY].parentNode.insertBefore(casillaAuxiliar, this.mazmorra.children[this.tablero.length - 1].children[coorY]);
                //Fin de la parte de mover el DOM hacia arriba
                for (var i = 1; i < this.tablero.length; i++)
                {
                    this.tablero[i - 1][coorY].setTipo(this.tablero[i][coorY].getTipo());
                    this.tablero[i -1][coorY].setCasilla(this.tablero[i][coorY].getCasilla());
                }
                this.tablero[this.tablero.length - 1][coorY].setCasilla(aux);
                this.tablero[this.tablero.length - 1][coorY].setTipo(auxTipo);
            }
            else
            {
                coorX = this.tablero.length - 1;
                aux = this.tablero[coorX][coorY].getCasilla();
                auxTipo = this.tablero[coorX][coorY].getTipo();
                //Comienzo de la parte de mover el DOM hacia abajo
                casillaAuxiliar = this.mazmorra.children[this.tablero.length - 1].children[coorY];
                casillaAuxiliar.parentNode.removeChild(casillaAuxiliar);
                for(var i = this.tablero.length - 2; i > -1; i--)
                {
                    casillaAMover = this.mazmorra.children[i].children[coorY];
                    this.mazmorra.children[i + 1].children[coorY].parentNode.insertBefore(casillaAMover, this.mazmorra.children[i + 1].children[coorY]);
                }
                this.mazmorra.children[0].children[coorY].parentNode.insertBefore(casillaAuxiliar, this.mazmorra.children[0].children[coorY]);
                //Fin de la parte de mover el DOM hacia abajo
                for (var i = this.tablero.length - 1; i > 0; i--)
                {
                    this.tablero[i][coorY].setTipo(this.tablero[i - 1][coorY].getTipo());
                    this.tablero[i][coorY].setCasilla(this.tablero[i - 1][coorY].getCasilla());
                }
                this.tablero[0][coorY].setCasilla(aux);
                this.tablero[0][coorY].setTipo(auxTipo);
            }
            this.resetearIdColumna(coorY);
            return true;
        }
        else
        {
            return false;
        }
        
    },
    
    resetearIdFila : function(fila)
    {
        for(var i = 0; i < this.tablero[fila].length; i++)
        {
             this.tablero[fila][i].getCasilla().removeAttribute("id");
            this.tablero[fila][i].getCasilla().setAttribute("id", "x" + fila + "y" + i);
        }
    },
    
    resetearIdColumna : function(columna)
    {
        for(var i = 0; i < this.tablero.length; i++)
        {
            this.tablero[i][columna].getCasilla().removeAttribute("id");
            this.tablero[i][columna].getCasilla().setAttribute("id", "x" + i + "y" + columna);
        }
    },
    
    generarTipoCasillas : function(nivel)
    {
        switch(nivel)
        {
                
            case 1:
            {
                var numPasillos = 50;
                var numLava = 10;
                var numHielo = 25;
                var numMuro = 15;
                break;
            }
            case 2:
            {
                var numPasillos = 40;
                var numLava = 12;
                var numHielo = 28;
                var numMuro = 20;
                break;
            }
            case 3:
            {
                var numPasillos = 35;
                var numLava = 14;
                var numHielo = 31;
                var numMuro = 20;
                break;
            }
            
        }
        
        for(var i = 0; i < this.tablero.length; i++)
        {
            for(var j = 0; j < this.tablero[i].length; j++)
            {
                 var tipoAleatorio = Math.floor((Math.random() * 5) + 1);
                 switch(tipoAleatorio)
                 {
                     case 1:
                     case 5:
                     {
                        if (numPasillos > 0)
                        {
                            this.tablero[i][j].setTipo("pasillo");
                            this.tablero[i][j].getCasilla().classList.add("pasillo");
                            numPasillos--;
                        }
                        else
                        {
                            j--;
                        }
                        break;
                     }
                     case 2:
                     {
                         if ((numLava > 0) && (i != 0) && (i !=1))
                        {
                            this.tablero[i][j].setTipo("lava");
                            this.tablero[i][j].getCasilla().classList.add("lava");
                            numLava--;
                        }
                        else
                        {
                            j--;
                        }
                        break;
                     }
                     case 3:
                     {
                         if (numHielo > 0)
                        {
                            this.tablero[i][j].setTipo("hielo");
                            this.tablero[i][j].getCasilla().classList.add("hielo");
                            numHielo--;
                        }
                        else
                        {
                            j--;
                        }
                        break;
                     }
                     case 4:
                     {
                         if ((numMuro > 0) && (i != 0) && (i !=1)) 
                        {
                            this.tablero[i][j].setTipo("muro");
                            this.tablero[i][j].getCasilla().classList.add("muro");
                            numMuro--;
                        }
                        else
                        {
                            j--;
                        }
                        break;
                     }
                 }
            }   
        }
        this.tablero[0][0].setTipo("inicio");
        this.tablero[0][0].getCasilla().classList.add("inicio");
        this.tablero[this.tablero.length - 1][this.tablero.length - 1].setTipo("salida");
        this.tablero[this.tablero.length - 1][this.tablero.length - 1].getCasilla().classList.add("salida");
    }
}