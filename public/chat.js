var audioSend = new Audio('noti.mp4');
var socket = io.connect('http://localhost:5000');

var persona = document.getElementById('persona');
var appchat = document.getElementById('app-chat');
var panelBienvenida = document.getElementById('panel-bienvenida');
var usuario = document.getElementById('usuario');
var mensaje = document.getElementById('mensaje');
var botonEnviar = document.getElementById('enviar');
var escribiendoMensaje = document.getElementById('escribiendo-mensaje');
var output = document.getElementById('output');

botonEnviar.addEventListener('click', function(){
    if(mensaje.value){
        socket.emit('chat', {
            mensaje: mensaje.value,
            usuario: usuario.value
        });
    }
    mensaje.value = '';
});

mensaje.addEventListener('keyup', function(){
    if(persona.value){
        socket.emit('typing', {
            nombre: usuario.value,
            texto: mensaje.value
        });
    }
});

socket.on('chat', function(data){
    escribiendoMensaje.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.usuario + ':</strong> ' + data.mensaje + '</p>';
    audioSend.play();
});

socket.on('typing', function(data){
    if(data.texto){
        escribiendoMensaje.innerHTML = '<p><em>' + data.nombre + ' está escribiendo un mensaje...</em></p>';
    } else {
        escribiendoMensaje.innerHTML = '';
    }
});

function ingresarAlChat(){
    if(persona.value){
        panelBienvenida.style.display = "none";
        appchat.style.display = "block";
        var nombreDeUsuario = persona.value;
        usuario.value = nombreDeUsuario;
        usuario.readOnly = true;
    }
}
