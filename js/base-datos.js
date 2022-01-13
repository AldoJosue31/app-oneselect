var Datastore = require('nedb');

let bd = new Datastore({
    filename: 'db/ordenes.db',
     autoload: true
    });

exports.agregarOrden = function(fecha, hora, nombres, apellidos, orden, total){
    var pedido = {
        fecha: fecha,
        hora: hora,
        nombres: nombres,
        apellidos: apellidos,
        orden: orden,
        total : total,
    };

    bd.insert(pedido, function(error, nuevoObjeto){

    });
};
exports.obtenerOrdenes = function(operacion) {
    bd.find({}, function(error, ordenes){
        if(ordenes){
            operacion(ordenes);
        }
    });
};

exports.eliminarOrden = function(id) {
    bd.remove({_id: id},  {}, function(error, numeroRegistrosEliminados){

    });
};
