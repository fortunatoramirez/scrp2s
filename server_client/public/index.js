var socket = io.connect('localhost:5001', {'forceNew':true});

var alumnos = ["17211817","20212712","19212367","19212368","19212369","19212371","19212375","19212377","19212378","20211961",
               "19212384","19212386","19212387","20210781","18211544","16212301","19210606","18211548","19212402","19212405",
               "19212407","19212409","19212418","17211858","18210146","19212421","19212422","19212426","18212732","16212260",
               "20210827","19212435","19212436","20212523","19212439","20212987","19212443","19212444","19212446","19212447"];


socket.on('desde_servidor', function(data){
    //console.log(data);
    
    /*
    var cadena = data.map(function(element,index){
        return "<div>" + "<strong>" + element.nom + ": " + "</strong>" + element.msj + "</div>"
    }).join(' ');
    */
    
    //console.log(cadena);
    position = JSON.parse(data)
    document.getElementById(position.id).innerHTML = "X=<font color='blue'>"+ position.x+"</font>, Y=<font color='green'>"+position.y+"</font>";


});

/*
function enviar_mensaje()
{
    var nombre = document.getElementById('txt_nombre').value;
    var mensaje = document.getElementById('txt_mensaje').value;

    var paquete = {nom:nombre , msj:mensaje};
  
    socket.emit('id_1',paquete);
    
}

function consultar_historial()
{
    socket.emit("consultar_historial","");
}
*/

//socket.on('historial_desde_servidor', function(data){
    //console.log(data);
    
    /*
    var cadena = data.map(function(element,index){
        return "<div>" +  "<strong>" + element.id + " - " + element.nombre + ": " + "</strong>" + element.texto + "</div>"
    }).join(' ');
    */
    /*
    var encabezado = "<table><tr><th>ID</th><th>NOMBRE</th><th>MENSAJE</th></tr>";

    var cuerpo = data.map(function(element,index){
        return "<tr>" +  "<td>" + element.id + "</td>"+"<td>"+ element.nombre + "</td>" + "<td>" + element.texto + "</td>"+ "</tr>"
    }).join(' ');

    var cierre = "</table>"

    var tabla = encabezado+cuerpo+cierre;


    
    document.getElementById('div_historial').innerHTML = tabla;
    */

//});