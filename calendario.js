var festivos = new Array("2019-1-1","2019-3-19","2019-4-19","2019-4-22","2019-4-29","2019-5-1","2019-6-24","2019-7-25","2019-8-15","2019-10-9","2019-10-12","2019-11-1","2019-12-6","2019-12-25", "2020-1-1", "2020-1-6");
var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");

var fecha_actual = new Date();
var fecha_inicio = new Date();
var fecha_temporal;
var fecha_fin = new Date();
var interval = 34*24*3600000;


function imprimeIntervalo() {
	document.getElementById("intervalo").innerHTML = "Del " + fecha_inicio.getDate() + " de " + meses[fecha_inicio.getMonth()] + " al " + fecha_fin.getDate() + " de " + meses[fecha_fin.getMonth()];
}

function sigIntervalo() {
	fecha_inicio.setTime(fecha_fin.getTime() + 1*24*3600000);
	fecha_fin.setTime(fecha_inicio.getTime() + interval);
	
	imprimeIntervalo();
	genera_tabla();
	alert(fecha_inicio.getFullYear() + "-" + (fecha_inicio.getMonth()+1) + "-" + fecha_inicio.getDate());
	
	//genera_tabla_dia(fecha_inicio.getDay(), fecha_inicio.getDate(), fecha_inicio.getMonth()+1, fecha_inicio.getFullYear());
	//alert(fecha_inicio.getFullYear() + "-" + (fecha_inicio.getMonth()+1) + "-" + fecha_inicio.getDate());
}

function inicio() {
	//fecha_actual = new Date();
	//fecha_inicio = new Date();
	//fecha_actual.setTime(fecha_actual.getTime() + (45*24*3600000));
	
	switch (fecha_actual.getDay()) {
		case 0:
			fecha_inicio.setTime(fecha_actual.getTime() - (6*24*3600000));
		break;
		
		case 1:
			fecha_inicio.setTime(fecha_actual.getTime());
		break;
		
		case 2:
			fecha_inicio.setTime(fecha_actual.getTime() - (1*24*3600000));
		break;
		
		case 3:
			fecha_inicio.setTime(fecha_actual.getTime() - (2*24*3600000));
		break;
		
		case 4:
			fecha_inicio.setTime(fecha_actual.getTime() - (3*24*3600000));
		break;
		
		case 5:
			fecha_inicio.setTime(fecha_actual.getTime() - (4*24*3600000));
		break;
		
		case 6:
			fecha_inicio.setTime(fecha_actual.getTime() - (5*24*3600000));
		break;
		
		default:
			fecha_inicio.setTime(fecha_actual.getTime());
	}
	
	//var fecha_fin = new Date();
	fecha_fin.setTime(fecha_inicio.getTime() + interval);
	
	imprimeIntervalo();
	genera_tabla();
	document.getElementById(fecha_actual.getFullYear() + '-' + (fecha_actual.getMonth()+1) + '-' + fecha_actual.getDate()).className = "seleccionado";
	//alert(fecha_actual.getFullYear() + '-' + (fecha_actual.getMonth()+1) + '-' + fecha_actual.getDate());
	genera_tabla_dia(fecha_actual.getDay(), fecha_actual.getDate(), fecha_actual.getMonth()+1, fecha_actual.getFullYear());
}

function genera_tabla() {
	fecha_temporal = new Date();
	fecha_temporal.setTime(fecha_temporal.getDate());
	fecha_temporal.setTime(fecha_temporal.getTime() - (1*24*3600000));
	
	document.getElementById("tabla").innerHTML = "";
	// Obtener la referencia del elemento body
	var body = document.getElementById("tabla");

	// Crea un elemento <table> y un elemento <tbody>
	var tabla   = document.createElement("table");
	tabla.className = "tabla_fechas";
	var tblBody = document.createElement("tbody");
	
	// Crea las celdas
	for (var i = 0; i < 5; i++) {
		// Crea las hileras de la tabla
		var hilera = document.createElement("tr");
		
		for (var j = 0; j < 7; j++) {
			// Crea un elemento <td> y un nodo de texto, haz que el nodo de
			// texto sea el contenido de <td>, ubica el elemento <td> al final
			// de la hilera de la tabla
			var celda = document.createElement("td");
			fecha_temporal.setTime(fecha_temporal.getTime() + (1*24*3600000));
			celda.setAttribute('id', fecha_temporal.getFullYear() + '-' + (fecha_temporal.getMonth()+1) + '-' + fecha_temporal.getDate());
			
			if (fecha_actual <= fecha_temporal) {
				if (j != 6) {
					if (!festivos.includes(fecha_temporal.getFullYear() + '-' + (fecha_temporal.getMonth()+1) + '-' + fecha_temporal.getDate())) {
						celda.className = "disponible";
						celda.setAttribute("onclick", "genera_tabla_dia(" + fecha_temporal.getDay() + ", " + fecha_temporal.getDate() + ", " + (fecha_temporal.getMonth()+1) + ", " + fecha_temporal.getFullYear() + ")");
					}
				}
			}
			
			if ((fecha_actual.getDate() == fecha_temporal.getDate()) && (fecha_actual.getMonth() == fecha_temporal.getMonth())) {
				celda.className = "seleccionado";
			}
			
			var textoCelda = document.createTextNode(fecha_temporal.getDate());
			celda.appendChild(textoCelda);
			hilera.appendChild(celda);
		}
		
		// agrega la hilera al final de la tabla (al final del elemento tblbody)
		tblBody.appendChild(hilera);
	}
	
	// posiciona el <tbody> debajo del elemento <table>
	tabla.appendChild(tblBody);
	// appends <table> into <body>
	body.appendChild(tabla);
}

function genera_tabla_dia(dia_sem, dia_mes, mes, anyo) {
	if (document.getElementsByClassName("seleccionado").length > 0) {
		document.getElementsByClassName("seleccionado")[0].className = "disponible";
	}
	
	//alert(anyo + '-' + mes + '-' + dia_mes);
	document.getElementById(anyo + '-' + mes + '-' + dia_mes).className = "seleccionado";
	//alert(fecha_inicio.getFullYear() + "-" + (fecha_inicio.getMonth()+1) + "-" + fecha_inicio.getDate());
	
	//Declaración del array de 7 posiciones
	var horario_dia = new Array(7);
	
	//Bucle para meter en cada posición del array de 7 otro array de 11
	for(var i=0; i<7; i++) {
		horario_dia[i] = new Array(11);
	}
	
	//Bucle para meter en cada posición del array de 11 otro array de 4
	for(var i=0; i<7; i++) {
		for(var j=0; j<11; j++) {
			horario_dia[i][j] = new Array(4);
		}
	}
	
	//Bucle para meter en cada posición del array de 4 otro array de 2
	for(var i=0; i<7; i++) {
		for(var j=0; j<11; j++) {
			for(var k=0; k<4; k++) {
				horario_dia[i][j][k] = new Array(2);
			}
		}
	}
	
	//Bucle que recorre el primer array
	for(var i=0; i<7; i++) {
		//Bucle que recorre el array que está en la posición i
		for(var j=0; j<11; j++) {
			//Bucle que recorre el array que está en la posición j
			for(var k=0; k<4; k++) {
				//Bucle que recorre el array que está en la posición k
				for(var m=0; m<2; m++) {
					horario_dia[i][j][k][0] = j + 9 + ":" + (k * 15);
			
					if (j==0) {
						horario_dia[i][j][k][0] = "0" + horario_dia[i][j][k][0];
					}
					
					if (k==0) {
						horario_dia[i][j][k][0] = horario_dia[i][j][k][0] + "0";
					}
					
					//Domingo
					if (i==0) {
						horario_dia[i][j][k][1] = 0;
					}
					//Lunes - Jueves
					else if (i>=1 && i<=4) {
						if (((j==0) && (k==0 || k==1)) || ((j==5 || j==6))) {
							horario_dia[i][j][k][1] = 0;
						}
						else {
							horario_dia[i][j][k][1] = 1;
						}
					}
					//Viernes
					else if (i==5) {
						if (j==0 && (k==0 || k==1)) {
							horario_dia[i][j][k][1] = 0;
						}
						else {
							horario_dia[i][j][k][1] = 1;
						}
					}
					//Sabado
					else if (i==6) {
						if ((j==0 && (k==0 || k==1)) || j>=6) {
							horario_dia[i][j][k][1] = 0;
						}
						else {
							horario_dia[i][j][k][1] = 1;
						}
					}
				}
			}
		}
	}
	
	// Obtener la referencia del elemento body
	//var body = document.getElementsByTagName("body")[0];
	var body = document.getElementById("seleccion_horas");
	body.innerHTML = "";
	
	// Crea un elemento <table> y un elemento <tbody>
	var tabla   = document.createElement("table");
	tabla.className = "tabla_horarios";
	var tblBody = document.createElement("tbody");
	
	// Crea las celdas
	for (var i = 0; i < 11; i++) {
		// Crea las hileras de la tabla
		var hilera = document.createElement("tr");
		
		for (var j = 0; j < 4; j++) {
			// Crea un elemento <td> y un nodo de texto, haz que el nodo de
			// texto sea el contenido de <td>, ubica el elemento <td> al final
			// de la hilera de la tabla
			var celda = document.createElement("td");
			
			if (horario_dia[dia_sem][i][j][1] == 1) {
				celda.className = "disponible";
			}
			
			var textoCelda = document.createTextNode(horario_dia[dia_sem][i][j][0]);
			celda.appendChild(textoCelda);
			hilera.appendChild(celda);
		}
		
		// agrega la hilera al final de la tabla (al final del elemento tblbody)
		tblBody.appendChild(hilera);
	}
	
	// posiciona el <tbody> debajo del elemento <table>
	tabla.appendChild(tblBody);
	// appends <table> into <body>
	body.appendChild(tabla);
}

window.onload = inicio;