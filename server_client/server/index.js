var express = require('express');
var app = express();
var server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

var net = require('net');

var tcp_sockets = [];

/*https://gist.github.com/bitbandi/1c83ea416e0b6429a374*/
var tcp_server = net.createServer(function(socket) {
    socket.name = socket.remoteAddress + ":" + socket.remotePort 
    tcp_sockets.push(socket);
    // Log it to the server output
    console.log(socket.name + ' joined to broadcasr.');
    socket.write("Welcome to telnet chat!\n");
    // When client leaves
    socket.on('end', function() {
        console.log(socket.name + " left the broadcast.\n");
        // Remove client from socket array
        tcp_sockets.splice(tcp_sockets.indexOf(socket), 1);
    });
    socket.on('data',function(data){
        var response = data.toString().trim();
        console.log(response + '\r\n');
        io.sockets.emit('desde_servidor_comando', 'HI');
        // If there are no sockets, then don't broadcast any messages
        if (tcp_sockets.length === 0) {
            return;
        }
        // If there are clients remaining then broadcast message
        tcp_sockets.forEach(function(socket, index, array){
            socket.write(data);
        });

    });
    // When socket gets errors
    socket.on('error', function(error) {
        console.log('Socket got problems: ', error.message);
    });
});
// Listening for any problems with the server
tcp_server.on('error', function(error) {
    console.log("So we got problems!", error.message);
});

tcp_server.listen(5002, '127.0.0.1');


/*
var tcp_server = net.createServer(function (tcp_socket){
    tcp_socket.on('data',function(data){
        var response = data.toString().trim();
        console.log(response + '\r\n');
        io.sockets.emit('desde_servidor_comando', 'HI');
    });
});
tcp_server.listen(5002, '127.0.0.1');
*/

/*

var client = new net.Socket();
client.connect(5002, '127.0.0.1', function(){
    console.log('Connected');
    client.write('Hola desde el servidor.');
});
client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});
client.on('close', function() {
	console.log('Connection closed');
});
*/


io.on('connection', function(socket){

    socket.on('position',function(data){
        console.log(data);
        io.sockets.emit('desde_servidor',data);
    });

    socket.on('telemetria',function(data){
        console.log(data);
        io.sockets.emit('desde_servidor',data);
    });

    socket.on('ESP32',function(data){
        console.log(data);
        io.sockets.emit('desde_servidor',data);
    });

    socket.on('desde_esp32',function(data){
        console.log(data);
        //io.sockets.emit('desde_servidor',data);
    });
    socket.on('nuevo_mensaje',function(data){
        console.log(data);
        //io.sockets.emit('desde_servidor',data);
    });
});


server.listen(5001, function(){
    console.log("Servidor corriendo en el puerto 5001.")
});