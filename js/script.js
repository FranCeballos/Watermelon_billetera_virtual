let infoPersonalEnLS = JSON.parse(localStorage.getItem("infoPersonal"));

let infoPersonal = {
  balance: 0,
  logueado: false,
  actividad: [],
  contactos: [],
};

infoPersonalEnLS && (infoPersonal = infoPersonalEnLS);

actualizarHTMLSaldoNombreYActividad();

function actualizarEnLocalStorageObjetoInfoPersonal() {
  let infoPersonalEnJSON = JSON.stringify(infoPersonal);
  localStorage.setItem("infoPersonal", infoPersonalEnJSON);
}

// Devuelve un objeto con cuota y precio final.
const calcularCuotaYPrecioFinal = function (precio, valorSelectorCuotas) {
  const valorCuotaYPrecioFinal = {};
  let coeficienteInteres = 1;
  let cuotas = valorSelectorCuotas;

  if (cuotas === 1) {
    coeficienteInteres = 1.05;
  } else if (cuotas === 3) {
    coeficienteInteres = 1.1;
  } else if (cuotas === 6) {
    coeficienteInteres = 1.15;
  } else if (cuotas === 12) {
    coeficienteInteres = 1.3;
  }

  valorCuotaYPrecioFinal.valorCuota =
    (precio * coeficienteInteres) / Number(cuotas);

  valorCuotaYPrecioFinal.precioFinal = precio * coeficienteInteres;

  return valorCuotaYPrecioFinal;
};

const comprobarSiElBalanceSeraPositivo = function (precio) {
  let estadoBalance = infoPersonal.balance - precio >= 0;
  return estadoBalance;
};

function actualizarHTMLSaldoNombreYActividad() {
  document.querySelector(
    ".appBalanceNumero"
  ).textContent = `$ ${infoPersonal.balance}`;
  document.querySelector(".appNombre").textContent = infoPersonal.nombre;

  const listaActividad = document.querySelector(".appActividadLista");
  listaActividad.innerHTML = "";

  infoPersonal.actividad.forEach(function (elemento) {
    const li = document.createElement("li");
    const texto = document.createTextNode(elemento);
    li.appendChild(texto);
    listaActividad.prepend(li);
  });
}

function sumarYORestarAlBalanceYActualizarHTMLSaldo(sumar, restar) {
  infoPersonal.balance = infoPersonal.balance + sumar - restar;
  actualizarHTMLSaldoNombreYActividad();
  actualizarEnLocalStorageObjetoInfoPersonal();
}

const seccionBienvenida = document.querySelector(".bienvenida");
const seccionApp = document.querySelector(".appGrid");
const botonBorrarDatos = document.querySelector(".appResetBoton");
const inputNombre = document.querySelector(".bienvenidaNombreIngresar");

if (infoPersonal.logueado) {
  seccionBienvenida.style.display = "none";
  seccionApp.style.display = "grid";
} else {
  seccionBienvenida.style.display = "flex";
  seccionApp.style.display = "none";
}

// Confirmar nombre de usuario en bienvenida
document.querySelector(".confirmarNombre").addEventListener("click", () => {
  let nombreIngresado = inputNombre.value;
  if (nombreIngresado !== "") {
    infoPersonal.nombre = nombreIngresado;
    seccionBienvenida.style.display = "none";
    seccionApp.style.display = "grid";
    document.querySelector(".appNombre").textContent = infoPersonal.nombre;
    infoPersonal.logueado = true;
    actualizarEnLocalStorageObjetoInfoPersonal();
  } else {
    document.querySelector(".nombreNoIngresado").style.display = "inline-block";
  }
});

const botonEditarNombre = document.querySelector(".appNombreEditarBoton");
const inputEditarNombre = document.querySelector(".appNombreEditarInput");
const botonConfirmarNombre = document.querySelector(".appNombreConfirmarBoton");

// Editar nombre
botonEditarNombre.addEventListener("click", () => {
  botonEditarNombre.style.display = "none";
  inputEditarNombre.style.display = "inline-block";
  botonConfirmarNombre.style.display = "inline-block";
});

botonConfirmarNombre.addEventListener("click", () => {
  infoPersonal.nombre = inputEditarNombre.value;
  actualizarEnLocalStorageObjetoInfoPersonal();
  actualizarHTMLSaldoNombreYActividad();
  botonConfirmarNombre.style.display = "none";
  inputEditarNombre.style.display = "none";
  inputEditarNombre.value = "";
  botonEditarNombre.style.display = "inline-block";
});

const inputIngresarDinero = document.querySelector(".appIngresarDineroInput");

// Ingresar dinero
document
  .querySelector(".appIngresarDineroBoton")
  .addEventListener("click", () => {
    let montoAIngresar = Number(inputIngresarDinero.value);
    sumarYORestarAlBalanceYActualizarHTMLSaldo(montoAIngresar, 0);
    actualizarEnLocalStorageObjetoInfoPersonal();
    inputIngresarDinero.value = "";

    if (montoAIngresar > 0) {
      Toastify({
        text: `Se ha confirmado el ingreso de $${montoAIngresar}`,
        duration: 5000,
      }).showToast();
      sumarActividadAlArray(`Ingreso de $${montoAIngresar}`);
      actualizarHTMLSaldoNombreYActividad();
    }
  });

// Pagar
const seccionPagarConCredito = document.querySelector(".appPagarCredito");
const seccionPagarConDebito = document.querySelector(".appPagarDebito");

function resetSeccionPagar() {
  const selectorDeTarjeta = document.querySelector("#selectorTarjeta");
  document.querySelector(".appPagarDebitoInput").value = "";
  document.querySelector(".appPagarDebitoMensajeError").textContent = "";
  document.querySelector(".appPagarDebitoResumen").textContent = "";
  selectorDeTarjeta.style.display = "inline-block";
  document.querySelector(
    ".appPagarSelectorTarjetaConfirmarBoton"
  ).style.display = "inline-block";
  seccionPagarConCredito.style.display = "none";
  seccionPagarConDebito.style.display = "none";
  selectorDeTarjeta;
  document.querySelector(".appPagarResetBoton").style.display = "none";
  selectorDeTarjeta.value = "selected";
  document.querySelector(".appPagarCreditoInput").value = "";
  document.querySelector(".appPagarCreditoResumen").textContent = "Resumen";
}

// Confirmar tarjeta a usar para pagar
const selectorDeTarjeta = document.querySelector("#selectorTarjeta");

document
  .querySelector(".appPagarSelectorTarjetaConfirmarBoton")
  .addEventListener("click", () => {
    let valorSelector = selectorDeTarjeta.value;

    if (valorSelector === "debito") {
      quitarSelectorTarjetaYMostrarBotonReset();
      seccionPagarConCredito.style.display = "none";
      seccionPagarConDebito.style.display = "flex";
    } else if (valorSelector === "credito") {
      quitarSelectorTarjetaYMostrarBotonReset();
      seccionPagarConCredito.style.display = "flex";
      seccionPagarConDebito.style.display = "none";
    } else if (valorSelector === "selected") {
      seccionPagarConCredito.style.display = "none";
      seccionPagarConDebito.style.display = "none";
    }
  });

function quitarSelectorTarjetaYMostrarBotonReset() {
  selectorDeTarjeta.style.display = "none";
  document.querySelector(
    ".appPagarSelectorTarjetaConfirmarBoton"
  ).style.display = "none";
  document.querySelector(".appPagarResetBoton").style.display = "inline-block";
}

const inputMontoAPagarConDebito = document.querySelector(
  ".appPagarDebitoInput"
);
const mensajeSaldoInsuficienteSeccionDebito = document.querySelector(
  ".appPagarDebitoMensajeError"
);

// Actualizar string resumen pago con débito
inputMontoAPagarConDebito.addEventListener("input", (e) => {
  document.querySelector(
    ".appPagarDebitoResumen"
  ).textContent = `El total a pagar con tarjeta de débito es: $${e.target.value}`;

  if (!comprobarSiElBalanceSeraPositivo(e.target.value)) {
    mensajeSaldoInsuficienteSeccionDebito.textContent = `Saldo insuficiente 🚫`;
  } else {
    mensajeSaldoInsuficienteSeccionDebito.textContent = "";
  }
});

// Confirmar pago con débito
document.querySelector(".appPagarDebitoBoton").addEventListener("click", () => {
  let montoAPagar = Number(inputMontoAPagarConDebito.value);

  if (comprobarSiElBalanceSeraPositivo(montoAPagar)) {
    resetSeccionPagar();
    Toastify({
      text: `Se ha confirmado el pago de $${montoAPagar}`,
      duration: 5000,
    }).showToast();
    sumarActividadAlArray(`Pago de $${montoAPagar} con débito`);
    sumarYORestarAlBalanceYActualizarHTMLSaldo(0, montoAPagar);
  }
});

// Actualizar string resumen pago con crédito
const selectorDeCuotas = document.querySelector("#selectorCuotas");
const inputPagarCredito = document.querySelector(".appPagarCreditoInput");
const eleSaldoInsuficienteCredito = document.querySelector(
  ".appPagarCreditoError"
);

const cambiarStringResumenPagoConCredito = function (
  cuotas,
  valorCuotas,
  precioFinal
) {
  document.querySelector(
    ".appPagarCreditoResumen"
  ).textContent = `Pagarás ${cuotas} cuota/s de $${valorCuotas}, siendo un total de $${precioFinal}`;
};

inputPagarCredito.addEventListener("input", (e) => {
  let valorCuotaYPrecioFinal = calcularCuotaYPrecioFinal(
    Number(e.target.value),
    Number(selectorDeCuotas.value)
  );

  cambiarStringResumenPagoConCredito(
    selectorDeCuotas.value,
    valorCuotaYPrecioFinal.valorCuota.toFixed(2),
    valorCuotaYPrecioFinal.precioFinal.toFixed(2)
  );

  if (!comprobarSiElBalanceSeraPositivo(valorCuotaYPrecioFinal.precioFinal)) {
    eleSaldoInsuficienteCredito.style.display = "inline-block";
  } else {
    eleSaldoInsuficienteCredito.style.display = "none";
  }
});

selectorDeCuotas.addEventListener("change", (e) => {
  let montoIngresado = Number(inputPagarCredito.value);
  let valorCuotaYPrecioFinal = calcularCuotaYPrecioFinal(
    montoIngresado,
    Number(e.target.value)
  );

  cambiarStringResumenPagoConCredito(
    selectorDeCuotas.value,
    valorCuotaYPrecioFinal.valorCuota.toFixed(2),
    valorCuotaYPrecioFinal.precioFinal.toFixed(2)
  );
});

// Confirmar pago con crédito
document
  .querySelector(".appPagarCreditoBoton")
  .addEventListener("click", () => {
    let montoAPagar = Number(inputPagarCredito.value);
    let valorSelectorCuotas = Number(selectorDeCuotas.value);

    let costoFinal = calcularCuotaYPrecioFinal(
      montoAPagar,
      valorSelectorCuotas
    );

    if (comprobarSiElBalanceSeraPositivo(costoFinal.precioFinal)) {
      resetSeccionPagar();
      Toastify({
        text: `Se ha confirmado el pago de $${costoFinal.precioFinal.toFixed(
          2
        )}`,
        duration: 5000,
      }).showToast();
      sumarActividadAlArray(
        `Pago de $${costoFinal.precioFinal.toFixed(
          2
        )} en ${valorSelectorCuotas} cuota/s de $${costoFinal.valorCuota.toFixed(
          2
        )}`
      );
      sumarYORestarAlBalanceYActualizarHTMLSaldo(0, costoFinal.precioFinal);
    }
  });

// Resetear seccion pago
document
  .querySelector(".appPagarResetBoton")
  .addEventListener("click", resetSeccionPagar);

// Sección Actividad
function sumarActividadAlArray(mensaje) {
  infoPersonal.actividad.push(mensaje);
  actualizarEnLocalStorageObjetoInfoPersonal();
}

// API Valor del Dolar
fetch("https://api.bluelytics.com.ar/v2/latest")
  .then((response) => response.json())
  .then((data) => {
    document.querySelector(
      ".compraDolarOficial"
    ).textContent = `$ ${data.oficial.value_buy}`;
    document.querySelector(
      ".ventaDolarOficial"
    ).textContent = `$ ${data.oficial.value_sell}`;
    document.querySelector(
      ".compraDolarBlue"
    ).textContent = `$ ${data.blue.value_buy}`;
    document.querySelector(
      ".ventaDolarBlue"
    ).textContent = `$ ${data.blue.value_sell}`;
  });

// Agendar y Trasferir a Contactos
const botonResetSeccionTransferir = document.querySelector(
  ".appTransferirResetBoton"
);
const botonElegirTransferir = document.querySelector(
  ".appTransferirElegirEleccionBoton"
);
const botonElegirAgendar = document.querySelector(
  ".appTransferirAgendarEleccionBoton"
);
const seccionElegirAgendarOTransferir = document.querySelector(
  ".appTransferirEleccion"
);
const seccionAgendarContacto = document.querySelector(".appTransferirAgendar");
const inputNombreAAgendar = document.querySelector(
  ".appTransferirAgendarInput"
);
const botonConfirmarAgendar = document.querySelector(
  ".appTransferirAgendarConfirmarBoton"
);
const botonBorrarContactos = document.querySelector(
  ".appTransferirBorrarContactosBoton"
);
const seccionRealizarTransferencia = document.querySelector(
  ".appTransferirRealizar"
);
const selectorDeContacto = document.querySelector("#selectContactos");
const inputMontoATransferir = document.querySelector(
  ".appTransferirMontoInput"
);
const botonResetCaptcha = document.querySelector(
  ".appTransferirBotonReiniciarCaptcha"
);
const inputCodigoCaptcha = document.querySelector(
  ".appTransferirInputCodigoCaptcha"
);
const seccionCaptchaEnTransferir = document.querySelector(
  ".appTransferirRealizarBox2"
);
const mensajeCaptchaIncorrecto = document.querySelector(
  ".appTransferirMensajeCaptchaError"
);
const mensajeSaldoInsuficienteAlTransferir = document.querySelector(
  ".appTransferirMensajeSaldoInsuficiente"
);

function reiniciarSeccionTransferir() {
  botonResetSeccionTransferir.style.display = "none";
  seccionElegirAgendarOTransferir.style.display = "flex";
  seccionAgendarContacto.style.display = "none";
  seccionRealizarTransferencia.style.display = "none";
  seccionCaptchaEnTransferir.style.display = "none";
  mensajeCaptchaIncorrecto.style.display = "none";
  inputNombreAAgendar.value = "";
  selectorDeContacto.value = "0";
  inputMontoATransferir.value = "";
  inputCodigoCaptcha.value = "";
  borrarOpcionesSelectContactos();
}

function borrarOpcionesSelectContactos() {
  document.querySelector(
    "#selectContactos"
  ).innerHTML = `<option value="0" selected>Seleccioná a quién transferir</option>`;
}

function actualizarSelectContactos() {
  for (i = 0; i < infoPersonal.contactos.length; i++) {
    let opcion = document.createElement("option");
    opcion.value = infoPersonal.contactos[i];
    opcion.innerHTML = infoPersonal.contactos[i];
    selectorDeContacto.appendChild(opcion);
  }
}

botonResetSeccionTransferir.addEventListener(
  "click",
  reiniciarSeccionTransferir
);

botonElegirTransferir.addEventListener("click", function () {
  botonResetSeccionTransferir.style.display = "inline-block";
  seccionElegirAgendarOTransferir.style.display = "none";
  seccionAgendarContacto.style.display = "none";
  seccionRealizarTransferencia.style.display = "flex";
  seccionCaptchaEnTransferir.style.display = "none";
  actualizarSelectContactos();
});

botonElegirAgendar.addEventListener("click", function () {
  botonResetSeccionTransferir.style.display = "inline-block";
  seccionElegirAgendarOTransferir.style.display = "none";
  seccionAgendarContacto.style.display = "flex";
  seccionRealizarTransferencia.style.display = "none";
});

botonBorrarContactos.addEventListener("click", function () {
  infoPersonal.contactos = [];
  actualizarEnLocalStorageObjetoInfoPersonal();
  Toastify({
    text: `Se han borrado todos los contactos`,
    duration: 5000,
  }).showToast();
});

botonConfirmarAgendar.addEventListener("click", function () {
  let nombreAAgendar = inputNombreAAgendar.value;

  if (nombreAAgendar !== "") {
    infoPersonal.contactos.push(nombreAAgendar);
    Toastify({
      text: `Se ha agendado a ${nombreAAgendar}`,
      duration: 5000,
    }).showToast();
    actualizarEnLocalStorageObjetoInfoPersonal();
    inputNombreAAgendar.value = "";
  }
});

function generarNumero6DigitosAlAzar() {
  let numeroCaptcha = "";
  for (i = 1; i <= 6; i++) {
    numeroCaptcha += String(Math.round(Math.random() * 9));
  }
  infoPersonal.numeroCaptcha = numeroCaptcha;
  actualizarEnLocalStorageObjetoInfoPersonal();
  document.querySelector(".appTransferirCodigo").textContent = numeroCaptcha;
  return numeroCaptcha;
}

selectorDeContacto.addEventListener("change", function () {
  let contactoSeleccionado = selectorDeContacto.value;
  if (contactoSeleccionado === "0") {
    seccionCaptchaEnTransferir.style.display = "none";
  } else {
    seccionCaptchaEnTransferir.style.display = "flex";
  }

  generarNumero6DigitosAlAzar();
});

botonResetCaptcha.addEventListener("click", generarNumero6DigitosAlAzar);

document
  .querySelector(".appTransferirBotonConfirmarTrasferencia")
  .addEventListener("click", function () {
    let montoATransferir = Number(inputMontoATransferir.value);
    let contactoSeleccionado = selectorDeContacto.value;

    if (
      comprobarSiElBalanceSeraPositivo(montoATransferir) &&
      inputCodigoCaptcha.value === infoPersonal.numeroCaptcha
    ) {
      reiniciarSeccionTransferir();
      Toastify({
        text: `Se han transferido $${montoATransferir} a ${contactoSeleccionado}`,
        duration: 5000,
      }).showToast();
      sumarActividadAlArray(
        `Transferencia de $${montoATransferir} a ${contactoSeleccionado}`
      );
      sumarYORestarAlBalanceYActualizarHTMLSaldo(0, montoATransferir);
    } else if (inputCodigoCaptcha.value !== infoPersonal.numeroCaptcha) {
      mensajeCaptchaIncorrecto.style.display = "inline-block";
      inputCodigoCaptcha.value = "";
    }

    generarNumero6DigitosAlAzar();
  });

inputMontoATransferir.addEventListener("input", function (e) {
  if (comprobarSiElBalanceSeraPositivo(e.target.value)) {
    mensajeSaldoInsuficienteAlTransferir.style.display = "none";
  } else {
    mensajeSaldoInsuficienteAlTransferir.style.display = "inline-block";
  }
});

// Reiniciar App
botonBorrarDatos.addEventListener("click", function () {
  localStorage.clear();
  infoPersonal.balance = 0;
  infoPersonal.actividad = [];
  infoPersonal.contactos = [];
  infoPersonal.logueado = false;
  infoPersonal.nombre = "";
  seccionApp.style.display = "none";
  seccionBienvenida.style.display = "flex";
  inputNombre.value = "";
  console.log(infoPersonal);
  actualizarHTMLSaldoNombreYActividad();
  reiniciarSeccionTransferir();
});
