function Celda()
{
	this.casilla = document.createElement("td");
	this.casilla.setAttribute("class", "celda");
    this.tipo = null;
}


Celda.prototype = {

	setCasilla : function(elemento)
	{
		this.casilla = elemento;	
	},

	getCasilla : function()
	{
		return this.casilla;
	},
    
    setTipo : function(tipo)
	{
		this.tipo = tipo;	
	},

	getTipo : function()
	{
		return this.tipo;
	},

	seleccionar : function()
	{
        if (document.getElementsByClassName("seleccionada")[0] == null)
        {
		  this.casilla.classList.add("seleccionada");
        }
	}
}