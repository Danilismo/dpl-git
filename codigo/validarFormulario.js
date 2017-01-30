function validarFormulario()
{
    this.usuario = null;
    this.password = null;
    this.confirmarPassword = null;
    this.nick = null;
}

validarFormulario.prototype = {
    
     setUsuario : function(usuario) 
    {
        this.usuario = usuario;
    },
    
    getUsuario : function()
    {
        return this.usuario;
    },
    
    setPassword : function(password) 
    {
        this.password = password;
    },
    
    getPassword : function()
    {
        return this.password;
    },
    
    setConfirmarPassword : function(confirmarPassword) 
    {
        this.confirmarPassword = confirmarPassword;
    },
    
    getConfirmarPassword : function()
    {
        return this.confirmarPassword;
    },
    
    setNick : function(nick) 
    {
        this.nick = nick;
    },
    
    getNick : function()
    {
        return this.nick;
    },
    
    validarTexto : function(texto, nombre)
    {
        if ((texto != null) && (texto != "") && !(texto.includes(";")) && !(texto.includes("*")))
        {
            return true;
        }
        else
        {
            document.getElementById("errores").innerHTML += "<p>El " + nombre + " no puede estar vacío y no puede contener el caracter ';'</p>";
            return false;
        }
    },
    
    validarPassword : function(opcion)
    {
        var correcta = false;
        var iguales = false;
        
        if ((this.getPassword() != null) && (this.getPassword() != "") && (this.getPassword().length >= 8) && (this.getPassword().length <= 16) && !(this.getPassword().includes(";")) && !(this.getPassword().includes("*")))
        {
            correcta = true;
        }
        if (this.getPassword() == this.getConfirmarPassword() || opcion)
        {
            iguales = true;
        }
        if (correcta && iguales)
        {
            return true;
        }
        else
        {
            if (!correcta)
            {
                document.getElementById("errores").innerHTML += "<p>La contraseña tiene que tener entre 8 y 16 caracteres  y no puede contener el caracter ';'</p>";
            }
            if (!iguales)
            {
                document.getElementById("errores").innerHTML += "<p>Las contraseñas deben ser iguales</p>";
            }
            return false;
        }
    },
    
     validarRegistro : function(event, boton)
    {
        document.getElementById("errores").innerHTML = "";
        event.preventDefault();
        var respuesta = false;
        
        respuesta = (this.validarTexto(this.getUsuario(), "usuario") & this.validarPassword(false) & this.validarTexto(this.getNick(), "nick"));
        
        if (!respuesta)
        {
            document.getElementById("errores").classList.remove("oculto");
        }
        else
        {
           if (localStorage.getItem("usuarios") == null || localStorage.getItem("usuarios") == "")
           {
               localStorage["usuarios"] = this.getUsuario();
               localStorage["passwords"] = this.getPassword();
               localStorage["nicks"] = this.getNick();
               localStorage["puntuaciones"] = 0;
           }
           else
           {
               localStorage["usuarios"] += ";" + this.getUsuario();
               localStorage["passwords"] += ";" + this.getPassword();
               localStorage["nicks"] += ";" + this.getNick();
               localStorage["puntuaciones"] += ";" + 0;
           }
           localStorage["login"] = this.getNick();
           document.forms[0].submit(); 
        }
        boton.disabled = false;
    },
    
    validarLogin : function(event, boton)
    {
        document.getElementById("errores").innerHTML = "";
        event.preventDefault();
        var respuesta = false;
        
        respuesta = (this.validarTexto(this.getUsuario(), "usuario") & this.validarPassword(true));
        
        if (!respuesta)
        {
            document.getElementById("errores").classList.remove("oculto");
        }
        else
        {
           if (localStorage.getItem("usuarios") != null)
           {
               var usuarios = localStorage["usuarios"].split(";");
               var passwords = localStorage["passwords"].split(";");
               var correcto = false;
               var contador = 0;
               
               while (!correcto && contador < usuarios.length)
               {
                    if(usuarios[contador] == this.getUsuario() && passwords[contador] == this.getPassword())
                    {
                        correcto = true;
                    }
                    else
                    {
                        contador++;
                    }
               }
               if (correcto)
               {
                  var nicks = localStorage["nicks"].split(";");
                  localStorage["login"] = nicks[contador];
                  document.forms[0].submit(); 
               }
               else
               {
                   document.getElementById("errores").classList.remove("oculto");
                   document.getElementById("errores").innerHTML += "<p>No existe ningún usuario con ese nombre y contraseña</p>";
               }
           }
           else
           {
               document.getElementById("errores").classList.remove("oculto");
               document.getElementById("errores").innerHTML += "<p>No existe ningún usuario con ese nombre y contraseña</p>";
           }
        }
        boton.disabled = false;
    }
}