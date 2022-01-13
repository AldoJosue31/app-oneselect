const baseDatos = require('./js/base-datos');

const btnHam = document.getElementById('hamburgesa');
const btnTor = document.getElementById('torta');
const btnHD = document.getElementById('hotdog');

const total = document.getElementById('total');
var totalnumero = 0;

let comidaSeleccionada;
var indice = 1;

const comidas = [
        {
            id: 1,
            producto: ' | Hamburgesa | ',
            precio: '30'
        },
        {
            id: 2,
            producto: ' | Torta | ',
            precio: '30'
        },
        {
            id: 3,
            producto: ' | Hot Dog | ',
            precio: '30'
        },
    ];

function AgregarHamburguesa() {
    comidaSeleccionada = comidas.find(item => item.id == 1);
    document.getElementById('orden').value += indice;
    document.getElementById('orden').value += comidaSeleccionada.producto;
    totalnumero = totalnumero + 20;
    total.innerText = totalnumero;
    indice = indice + 1;
};

function AgregarTorta() {
    comidaSeleccionada = comidas.find(item => item.id == 2);
    document.getElementById('orden').value += indice;
    document.getElementById('orden').value += comidaSeleccionada.producto;
    totalnumero = totalnumero + 25;
    total.innerText = totalnumero;
    indice = indice + 1;
};

function AgregarHotDog() {
    comidaSeleccionada = comidas.find(item => item.id == 3);
    document.getElementById('orden').value += indice;
    document.getElementById('orden').value += comidaSeleccionada.producto;
    totalnumero = totalnumero + 30;
    total.innerText = totalnumero;
    indice = indice + 1;
};




var hoy = new Date();
class GestorOrdenes {
    constructor() {
        this.frmNuevoRegistro = document.getElementById('frmNuevoRegistro');
        this.registros = document.getElementById('registros');
        this.fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
        this.hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        this.nombres = document.getElementById('nombres');
        this.apellidos = document.getElementById('apellidos');
        this.orden = document.getElementById('orden');
        this.total = totalnumero;
        this.btnCrearRegistro = document.getElementById('btnCrearRegistro');

        this.cargarRegistrosOrden();
        this.agregarEventListeners();
    }

    agregarEventListeners() {
        this.frmNuevoRegistro.addEventListener('submit', this.crearRegistroOrden.bind(this));
    }

    reset() {
        indice = 1;
        totalnumero = 0;
        total.innerText = totalnumero;
    }

    crearRegistroOrden(evento) {
        evento.preventDefault();

        baseDatos.agregarOrden(this.fecha,this.hora,this.nombres.value, this.apellidos.value, this.orden.value, this.total);

        this.nombres.value = '';
        this.apellidos.value = '';
        this.orden.value = '';
        this.total = '';

        this.cargarRegistrosOrden();
        this.reset();
    }

    generarHtmlRegistroOrden(orden){
        return `<tr>
            <td><p class="text-light">${orden.fecha}</td>
            <td><p class="text-light">${orden.hora}</td>
            <td><p class="text-light">${orden.nombres}</td>
            <td><p class="text-light">${orden.apellidos}</td>
            <td><p class="text-light">${orden.orden}</td>
            <td><p class="text-light">${orden.total}</td>
            <td><input type="button" class="btn btn-danger btn-sm" onclick="gestorOrdenes.eliminarRegistroOrden('${orden._id}');" value="Eliminar"></td>
        </tr>`;
    }

    cargarRegistrosOrden() {
        baseDatos.obtenerOrdenes((ordenes) => {
            let html = ordenes.map(this.generarHtmlRegistroOrden).join('');

            this.registros.innerHTML = html;
        });
    }

    eliminarRegistroOrden(id) {
        baseDatos.eliminarOrden(id);

        this.cargarRegistrosOrden();
    }
}


let gestorOrdenes = new GestorOrdenes();