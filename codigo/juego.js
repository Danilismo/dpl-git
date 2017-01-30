function Juego(dificultad)
{
    this.tableroDeJuego = new Tablero(10, dificultad);
    this.corredor = new Corredor();
    this.dificultad = dificultad;
    this.puntuacionActual = 1000;
    this.puntuacionInicial = 1000;
    
    this.actualizarPuntuacion();
    this.mostrarPuntuacionMaxima(1);
    document.getElementById("nivel").innerHTML = "Nivel: " + this.dificultad;
    this.actualizarPuntuacionMaxima();
}

Juego.prototype = {
   partidaNueva : function(reinicio)
    {
	   this.tableroDeJuego.getMazmorra().addEventListener("click", seleccionarCasilla);
       document.addEventListener("keydown", moverCelda);
       if (document.getElementById("personaje").classList[0] == null)
       if (!reinicio)
       {
            document.getElementById("personajes").addEventListener("click", seleccionarPersonaje);
       }
    },
    
    comprobarCasilla : function()
    {
        var identificador = "x" + this.corredor.getCoorX() + "y" + this.corredor.getCoorY();
        var casilla = document.getElementById(identificador);
        var celda = this.tableroDeJuego.obtenerCasilla(casilla);
        if ((celda.getTipo() == "hielo") && (juego.corredor.permitirMovimento(this.corredor.getUltimoMovimiento(), this.getTableroJuego())))
        {
            this.corredor.mover(this.corredor.getUltimoMovimiento(), this.getTableroJuego());
            this.comprobarCasilla();
        }
        else if (celda.getTipo() == "lava")
        {
            this.finPartida(false);
        }
        else if ((this.corredor.getCoorX() == (this.tableroDeJuego.tablero.length - 1))
                &&
                (this.corredor.getCoorY() == (this.tableroDeJuego.tablero.length - 1)))
        {
            if (this.getDificultad() == 3)
            {
                this.mostrarPuntuacionMaxima(0);
            }
            this.finPartida(true);
        }
    },
    
    finPartida : function(victoria)
    {
        if (victoria)
        {
            if (this.getDificultad() < 3)
            {
              document.getElementById("victoria").style.display = "flex";  
            }
            else
            {
              document.getElementById("juegoCompletado").style.display = "flex"; 
            }
        }
        else
        {
            document.getElementById("derrota").style.display = "flex";
        }
    },
    
    getTableroJuego : function()
    {
        return this.tableroDeJuego;
    },
    
    getDificultad : function()
    {
        return this.dificultad;
    },
    
    getPuntuacion : function()
    {
        return this.puntuacionActual;
    },
    
    setPuntuacion : function(puntuacion)
    {
        this.puntuacionActual = puntuacion;
    },
    
    getPuntuacionInicial : function()
    {
        return this.puntuacionInicial;
    },
    
    setPuntuacionInicial : function(puntuacion)
    {
        this.puntuacionInicial = puntuacion;
    },
    
    actualizarPuntuacion : function()
    {
        document.getElementById("puntuacionActual").innerHTML = this.puntuacionActual;
    },
    
    reducirPuntuacion : function()
    {
        this.setPuntuacion(this.getPuntuacion() - 10);
    },
    
    mostrarPuntuacionMaxima : function(opcion)
    {
        var correcto = false;
        var contador = 0;
        var nicks = localStorage["nicks"].split(";");
        var puntuaciones = localStorage["puntuaciones"].split(";");
        
        while(!correcto && contador < nicks.length)
        {
            if (nicks[contador] == localStorage["login"])
            {
                if (opcion == 1)
                {
                    document.getElementById("puntuacionMaxima").innerHTML = puntuaciones[contador];
                }
                correcto = true;
            }
            else
            {
                contador++;
            }
        }
        if ((opcion == 0) && (this.getPuntuacion() > puntuaciones[contador]))
        {
            puntuaciones[contador] = this.getPuntuacion();
            var nuevoRecord = this.comprobarPuntuacionMaxima(puntuaciones[contador]);
            if (nuevoRecord)
            {
                this.actualizarPuntuacionMaxima();
            }
            localStorage["puntuaciones"] = puntuaciones[0];
            for (var i = 1; i < puntuaciones.length; i++)
            {
                localStorage["puntuaciones"] += ";" + puntuaciones[i];
            }
        }
    },
    
    comprobarPuntuacionMaxima: function(puntuacion)
    {
        if (localStorage["puntuacionesMaximas"] != null && localStorage["puntuacionesMaximas"] != "")
        {
            var puntuacionesMaximas = localStorage["puntuacionesMaximas"].split(";");
            var encontrado = false;
            var contador = 0;
            var scoreAntiguo = puntuacion;
            
            while(!encontrado && contador < puntuacionesMaximas.length)
            {
                var score = puntuacionesMaximas[contador].split('*')[1];
                if (puntuacion > score)
                {
                    scoreAntiguo = puntuacionesMaximas[contador];
                    puntuacionesMaximas[contador] = localStorage["login"] + "*" + puntuacion;
                    encontrado = true;
                }
                else
                {
                    contador++;
                }
            }
            localStorage["puntuacionesMaximas"] = puntuacionesMaximas[0];
            for (var i = 1; i < puntuacionesMaximas.length; i++)
            {
                localStorage["puntuacionesMaximas"] += ";" + puntuacionesMaximas[i];
            }
            if (puntuacionesMaximas.length < 10)
            {
                localStorage["puntuacionesMaximas"] += ";" + scoreAntiguo;
                this.ordenarPuntuacionesMaximas();
                encontrado = true;
            }
            return encontrado;
        }
        else
        {   
            localStorage["puntuacionesMaximas"] = localStorage["login"] + "*" + puntuacion;
            return true;
        }
    },
    
    ordenarPuntuacionesMaximas : function()
    {
        var puntuacionesMaximas = localStorage["puntuacionesMaximas"].split(";");
        
        for( var i = 0; i < puntuacionesMaximas.length - 1 ; i++)
        {
            for( var j = i + 1; j < puntuacionesMaximas.length ; j++)
            {
                var score = puntuacionesMaximas[i].split("*")[1];
                var scoreAComparar = puntuacionesMaximas[j].split("*")[1];

                if (Number(score) < Number(scoreAComparar))
                {
                    var aux = puntuacionesMaximas[i];
                    puntuacionesMaximas[i] = puntuacionesMaximas[j];
                    puntuacionesMaximas[j] = aux;
                }
            }
        }
        localStorage["puntuacionesMaximas"] = puntuacionesMaximas[0];
        for (var i = 1; i < puntuacionesMaximas.length; i++)
        {
            localStorage["puntuacionesMaximas"] += ";" + puntuacionesMaximas[i];
        }
    },
    
    actualizarPuntuacionMaxima : function()
    {
        if (localStorage["puntuacionesMaximas"] != null && localStorage["puntuacionesMaximas"] != "")
        {
            var puntuacionesMaximas = localStorage["puntuacionesMaximas"].split(";");

            for( var i = 0; i < puntuacionesMaximas.length; i++)
            {
                var score = puntuacionesMaximas[i].split("*");
                document.getElementById("u" + i).children[0].innerText = score[0];
                document.getElementById("u" + i).children[1].innerText = score[1];
            }
        }
    }
}


function seleccionarPersonaje(event)
{
    document.getElementById("personaje").classList.add(event.target.id);
    document.getElementById("personajes").removeEventListener("click", seleccionarPersonaje);
    document.getElementById("Cajapersonajes").style.display = "none";
}


function seleccionarCasilla(event)
{
    var casillaSeleccionada = document.getElementsByClassName("seleccionada")[0];
    if (casillaSeleccionada != null)
    {
        casillaSeleccionada.classList.remove("seleccionada");
    }
	juego.tableroDeJuego.obtenerCasilla(event.target).seleccionar();
}

function moverCelda(event)
{
    var casillaSeleccionada = document.getElementsByClassName("seleccionada")[0];
    if (casillaSeleccionada != null)
    {
        var direccion = event.keyCode;
        var mover = false;
        switch(direccion)
        {
            case 37:
            {
                mover = juego.tableroDeJuego.moverFila("izquierda");
                if (mover)
                {
                    juego.corredor.comprobarMovimiento(1, juego.getTableroJuego());
                }
                juego.comprobarCasilla();
                break;
            }
            case 38:
            {
                mover = juego.tableroDeJuego.moverColumna("arriba");
                if (mover)
                {
                    juego.corredor.comprobarMovimiento(2, juego.getTableroJuego());
                }
                juego.comprobarCasilla();
                break;
            }
            case 39:
            {
                mover = juego.tableroDeJuego.moverFila("derecha");
                if (mover)
                {
                    juego.corredor.comprobarMovimiento(3, juego.getTableroJuego());
                }
                juego.comprobarCasilla();
                break;
            }
            case 40:
            {
                mover = juego.tableroDeJuego.moverColumna("abajo");
                if (mover)
                {
                    juego.corredor.comprobarMovimiento(4, juego.getTableroJuego());
                }
                juego.comprobarCasilla();
                break;
            }
        }
        if ((
            direccion == 37
            ||
            direccion == 38
            ||
            direccion == 39
            ||
            direccion == 40
            )
            && mover)
        {
             juego.corredor.seleccionarMovimiento(juego.getTableroJuego());
             juego.comprobarCasilla();
             juego.reducirPuntuacion();
             juego.actualizarPuntuacion();
        }
        casillaSeleccionada.classList.remove("seleccionada");
    }
}

function nuevoJuego(dificultad, reinicio)
{  
    var juego = new Juego(dificultad);
    juego.partidaNueva(reinicio);
    return juego;
}

function reiniciar(reinicio, siguienteNivel)
{
    if (reinicio)
    {
        var nivel = juego.getDificultad();
        var personaje = document.getElementById("personaje").classList[0];
        var puntuacion = juego.getPuntuacionInicial();
    }
    else
    {
        if (siguienteNivel)
        {
            var nivel = juego.getDificultad() + 1;
            var personaje = document.getElementById("personaje").classList[0];
            var puntuacion = juego.getPuntuacion() + 1000;
        }
        else
        {
            var nivel = 1;
        }
    }
    
    document.getElementById("victoria").style.display = "none";
    document.getElementById("derrota").style.display = "none";
    document.getElementById("juegoCompletado").style.display = "none";
    juego.tableroDeJuego.getMazmorra().removeEventListener("click", seleccionarCasilla);
    document.removeEventListener("keydown", moverCelda);
    juego.tableroDeJuego.getMazmorra().parentNode.removeChild(juego.tableroDeJuego.getMazmorra());
    juego.corredor.getCasilla().parentNode.removeChild(juego.corredor.getCasilla());
    
    var otroJuego = nuevoJuego(nivel, reinicio);
    if (reinicio || siguienteNivel)
    {
        document.getElementById("personaje").classList.add(personaje);
        otroJuego.setPuntuacionInicial(puntuacion);
        otroJuego.setPuntuacion(otroJuego.getPuntuacionInicial());
        otroJuego.actualizarPuntuacion();
    }
    else
    {
        document.getElementById("Cajapersonajes").style.display = "flex";
    }
    return otroJuego;
}

function cargarLogin()
{
    if (localStorage.getItem("login") == null)
    {
        document.getElementById("usuario").innerHTML += " no identificado";
    }
    else
    {
        document.getElementById("usuario").innerHTML += " " + localStorage["login"];
    }
}

(function() {
  document.addEventListener("DOMContentLoaded", cargarLogin);
})()