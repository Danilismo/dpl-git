function Corredor(posicion)
{
    this.casilla = document.createElement("div");
    this.ultimoMovimiento = null;
    this.coorX = 0;
    this.coorY = 0;
    
    this.casilla.setAttribute("id", "personaje");
    this.casilla.style.top = "0%";
    this.casilla.style.left = "0%";
    document.getElementById("tablero").appendChild(this.casilla);
}


Corredor.prototype = {
    
    setPersonaje : function(personaje)
	{
		this.personaje = personaje;	
	},

	getPersonaje : function()
	{
		return this.personaje;
	},
    
    setCasilla : function(elemento)
	{
		this.casilla = elemento;	
	},

	getCasilla : function()
	{
		return this.casilla;
	},
    
    setUltimoMovimiento : function(movimiento)
	{
		this.ultimoMovimiento = movimiento;	
	},

	getUltimoMovimiento : function()
	{
		return this.ultimoMovimiento;
	},
    
    setCoorX : function(x)
    {
        this.coorX = x;
    },
    
    getCoorX : function()
    {
        return this.coorX;
    },
    
    setCoorY : function(y)
    {
        this.coorY = y;
    },
    
    getCoorY : function()
    {
        return this.coorY;
    },
    
    permitirMovimento : function(movimiento, tableroJuego)
    { 
        var tipo = "muro";
        
        switch(movimiento)
        {
            case 1:
            {
                if(this.getCoorY() > 0)
                {
                    tipo = tableroJuego.tablero[this.getCoorX()][this.getCoorY() - 1].getTipo();
                }
                break;
            }
            case 2:
            {
                if (this.getCoorX() > 0)
                {
                    tipo = tableroJuego.tablero[this.getCoorX() - 1][this.getCoorY()].getTipo();
                }
                break;
            }
            case 3:
            case 5:
            {
                if (this.getCoorY() < 9)
                {
                    tipo = tableroJuego.tablero[this.getCoorX()][this.getCoorY() + 1].getTipo();
                }
                break;
            }
            case 4:
            case 6:
            {
                if (this.getCoorX() < 9)
                {
                    tipo = tableroJuego.tablero[this.getCoorX() + 1][this.getCoorY()].getTipo();
                }
                break;
            }     
        }
        if (tipo != "muro")
        {
            if (
                ((movimiento == 1) && (this.getUltimoMovimiento() != 3) && (this.getCoorY() != 0))

                ||
                (((movimiento == 3) || (movimiento == 5)) && (this.getUltimoMovimiento() != 1) && (this.getCoorY() != 9))
                ||
                ((movimiento == 2) && (this.getUltimoMovimiento() != 4) && (this.getCoorX() != 0))
                ||
                (((movimiento == 4) || (movimiento == 6)) && (this.getUltimoMovimiento() != 2) && (this.getCoorX() != 9))
               )
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            this.setUltimoMovimiento(null);
            return false;
        }
    },
    
    obtenerPosicion : function(pos)
    {
        var posicion = pos;
        posicion = posicion.split("%");
        posicion = Number(posicion[0]);
        return posicion;
    },
    
    mover : function(direccion, tableroJuego)
    {
        var direccion = direccion;
       
        if (this.permitirMovimento(direccion, tableroJuego))
        {  
            switch(direccion)
            {
                case 1:
                {
                    var posicion = this.obtenerPosicion(this.casilla.style.left);
                    this.getCasilla().style.left = (posicion - 10) + "%";
                    this.setUltimoMovimiento(1);
                    this.setCoorY(this.getCoorY() - 1);
                    break;
                }
                case 2:
                {
                    var posicion = this.obtenerPosicion(this.casilla.style.top);
                    this.getCasilla().style.top = (posicion - 10) + "%";
                    this.setUltimoMovimiento(2);
                    this.setCoorX(this.getCoorX() - 1);
                    break;
                }
                case 3:
                {
                    var posicion = this.obtenerPosicion(this.casilla.style.left);
                    this.getCasilla().style.left = (posicion + 10) + "%";
                    this.setUltimoMovimiento(3);
                    this.setCoorY(this.getCoorY() + 1);
                     break;
                }
                case 4:
                {
                    var posicion = this.obtenerPosicion(this.casilla.style.top);
                    this.getCasilla().style.top = (posicion + 10) + "%";
                    this.setUltimoMovimiento(4);
                    this.setCoorX(this.getCoorX() + 1);
                    break;
                }
            }
        }  
    },
    
    comprobarMovimiento : function(direccion, tableroJuego)
    {
       var casillaSeleccionada = document.getElementsByClassName("seleccionada")[0];
       var identificador = casillaSeleccionada.id;
       identificador = identificador.split("");
       var x = identificador[1];
       var y = identificador[3];
        
       switch(direccion)
        {
            case 1:
            {
                if (x == this.coorX)
                {
                    this.mover(1, tableroJuego);
                }
                break;
            }
            case 2:
            {
                if (y == this.coorY)
                {
                    this.mover(2, tableroJuego);
                }
                break;
            }
            case 3:
            {
                if (x == this.coorX)
                {
                    this.mover(3, tableroJuego);
                }
                break;
            }
            case 4:
            {
                if (y == this.coorY)
                {
                    this.mover(4, tableroJuego);
                }
                break;
            }
        } 
    },
    
    seleccionarMovimiento : function(tableroJuego)
    {
        var correcto = false;
        
        while (!correcto)
        {
            var direccion = Math.floor((Math.random() * 6) + 1);
            var correcto = this.permitirMovimento(direccion, tableroJuego);
        }
        
        switch(direccion)
        {
            case 1:
            {
                this.mover(1, tableroJuego);
                break;
            }
            case 2:
            {
                this.mover(2, tableroJuego);
                break;
            }
            case 3:
            case 5:
            {
                this.mover(3, tableroJuego);
                break;
            }
            case 4:
            case 6:
            {
                this.mover(4, tableroJuego);
                break;
            }
        }
    }
}