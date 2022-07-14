let infoPersonalEnLS = JSON.parse(localStorage.getItem("infoPersonal"));

console.log(infoPersonalEnLS);

let infoPersonal = {
  balance: 0,
  logueado: false,
};

infoPersonalEnLS && (infoPersonal = infoPersonalEnLS);

actualizarHTMLSaldoYNombre();

console.log(infoPersonal);

const actualizarEnLocalStorageObjetoInfoPersonal = function () {
  let infoPersonalEnJSON = JSON.stringify(infoPersonal);
  localStorage.setItem("infoPersonal", infoPersonalEnJSON);
};

// Devuelve un objeto con cuota y precio final.
const calcularCuotaYPrecioFinal = function (precio, valorSelectorCuotas) {
  const valorCuotaYPrecioFinal = {};
  let coeficienteInteres = 1;
  let cuotas = valorSelectorCuotas;

  console.log(valorSelectorCuotas);
  if (cuotas === 1) {
    coeficienteInteres = 1.05;
  } else if (cuotas === 3) {
    coeficienteInteres = 1.1;
  } else if (cuotas === 6) {
    coeficienteInteres = 1.15;
  } else if (cuotas === 12) {
    coeficienteInteres = 1.3;
  }

  console.log(precio, coeficienteInteres, cuotas);

  valorCuotaYPrecioFinal.valorCuota =
    (precio * coeficienteInteres) / Number(cuotas);

  valorCuotaYPrecioFinal.precioFinal = precio * coeficienteInteres;

  return valorCuotaYPrecioFinal;
};

// Comprueba si después de restar un monto al balance el valor será negativo.
const comprobarSiElBalanceSeraPositivo = function (precio) {
  let estadoBalance = infoPersonal.balance - precio >= 0;
  return estadoBalance;
};

function actualizarHTMLSaldoYNombre() {
  document.querySelector(
    ".appBalanceNumero"
  ).textContent = `$ ${infoPersonal.balance}`;
  document.querySelector(".appNombre").textContent = infoPersonal.nombre;
}

const sumarYORestarAlBalanceYActualizarHTMLSaldo = function (sumar, restar) {
  infoPersonal.balance = infoPersonal.balance + sumar - restar;
  actualizarHTMLSaldoYNombre();
  actualizarEnLocalStorageObjetoInfoPersonal();
  console.log(infoPersonal);
};

const selectorDeTarjeta = document.querySelector("#selectorTarjeta");

const quitarSelectorTarjetaYMostrarBotonReset = function () {
  selectorDeTarjeta.style.display = "none";
  document.querySelector(
    ".appPagarSelectorTarjetaConfirmarBoton"
  ).style.display = "none";
  document.querySelector(".appPagarResetBoton").style.display = "inline-block";
};

const seccionPagarConCredito = document.querySelector(".appPagarCredito");
const seccionPagarConDebito = document.querySelector(".appPagarDebito");

const resetSeccionPagar = function () {
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
};

const cambiarStringResumenPagoConCredito = function (
  cuotas,
  valorCuotas,
  precioFinal
) {
  document.querySelector(
    ".appPagarCreditoResumen"
  ).textContent = `Pagarás ${cuotas} cuota/s de $${valorCuotas}, siendo un total de $${precioFinal}`;
};

const elementoMensajeConfirmacionPago = document.querySelector(
  ".appPagarMensajeConfirmacion"
);

const mostrarMensajeConfirmacionPago = function (string) {
  elementoMensajeConfirmacionPago.style.display = "inline-block";
  elementoMensajeConfirmacionPago.textContent = string;
};

const seccionBienvenida = document.querySelector(".bienvenida");
const seccionApp = document.querySelector(".appGrid");

if (infoPersonal.logueado) {
  seccionBienvenida.style.display = "none";
  seccionApp.style.display = "grid";
} else {
  seccionBienvenida.style.display = "flex";
  seccionApp.style.display = "none";
}

// Confirmar nombre de usuario en bienvenida
document.querySelector(".confirmarNombre").addEventListener("click", () => {
  let nombreIngresado = document.querySelector(
    ".bienvenidaNombreIngresar"
  ).value;
  console.log(nombreIngresado);
  if (nombreIngresado !== "") {
    infoPersonal.nombre = nombreIngresado;
    seccionBienvenida.style.display = "none";
    seccionApp.style.display = "grid";
    document.querySelector(".appNombre").textContent = infoPersonal.nombre;
    infoPersonal.logueado = true;
    actualizarEnLocalStorageObjetoInfoPersonal();
    console.log(infoPersonal);
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
  actualizarHTMLSaldoYNombre();
  botonConfirmarNombre.style.display = "none";
  inputEditarNombre.style.display = "none";
  inputEditarNombre.value = "";
  botonEditarNombre.style.display = "inline-block";
  console.log(infoPersonal);
});

const inputIngresarDinero = document.querySelector(".appIngresarDineroInput");

// Confirmar el ingreso de dinero
document
  .querySelector(".appIngresarDineroBoton")
  .addEventListener("click", () => {
    let montoAIngresar = Number(inputIngresarDinero.value);
    sumarYORestarAlBalanceYActualizarHTMLSaldo(montoAIngresar, 0);
    actualizarEnLocalStorageObjetoInfoPersonal();
    inputIngresarDinero.value = "";
  });

// Confirmar tarjeta a usar para pagar
document
  .querySelector(".appPagarSelectorTarjetaConfirmarBoton")
  .addEventListener("click", () => {
    document.querySelector(".appPagarMensajeConfirmacion").style.display =
      "none";

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

const inputPagarDebito = document.querySelector(".appPagarDebitoInput");

// Actualizar string resumen pago con débito
inputPagarDebito.addEventListener("input", (e) => {
  document.querySelector(
    ".appPagarDebitoResumen"
  ).textContent = `El total a pagar con tarjeta de débito es: $${e.target.value}`;
});

// Confirmar pago con débito
document.querySelector(".appPagarDebitoBoton").addEventListener("click", () => {
  let montoAPagar = Number(inputPagarDebito.value);

  console.log(montoAPagar, comprobarSiElBalanceSeraPositivo(montoAPagar));

  if (comprobarSiElBalanceSeraPositivo(montoAPagar)) {
    sumarYORestarAlBalanceYActualizarHTMLSaldo(0, montoAPagar);
    resetSeccionPagar();
    mostrarMensajeConfirmacionPago(
      `Se ha confirmado el pago de $${montoAPagar}`
    );
  } else {
    document.querySelector(
      ".appPagarDebitoMensajeError"
    ).textContent = `Saldo insuficiente 🚫`;
  }
});

const selectorDeCuotas = document.querySelector("#selectorCuotas");
const inputPagarCredito = document.querySelector(".appPagarCreditoInput");

// Actualizar string resumen pago con crédito
inputPagarCredito.addEventListener("input", (e) => {
  let valorSelectorCuota = selectorDeCuotas.value;

  let valorCuotaYPrecioFinal = calcularCuotaYPrecioFinal(
    Number(e.target.value),
    Number(valorSelectorCuota)
  );

  console.log(valorCuotaYPrecioFinal);

  cambiarStringResumenPagoConCredito(
    valorSelectorCuota,
    valorCuotaYPrecioFinal.valorCuota,
    valorCuotaYPrecioFinal.precioFinal
  );
});

selectorDeCuotas.addEventListener("change", (e) => {
  let montoIngresado = Number(inputPagarCredito.value);

  let valorCuotaYPrecioFinal = calcularCuotaYPrecioFinal(
    montoIngresado,
    Number(e.target.value)
  );

  document.querySelector(".appPagarCreditoResumen").textContent = `Pagarás ${
    selectorDeCuotas.value
  } cuota/s de $${valorCuotaYPrecioFinal.valorCuota.toFixed(
    2
  )}, siendo un total de $${valorCuotaYPrecioFinal.precioFinal.toFixed(2)}`;
});

// Resetear seccion pago
document
  .querySelector(".appPagarResetBoton")
  .addEventListener("click", resetSeccionPagar);

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

    console.log(costoFinal);

    if (comprobarSiElBalanceSeraPositivo(costoFinal.precioFinal)) {
      sumarYORestarAlBalanceYActualizarHTMLSaldo(0, costoFinal.precioFinal);
      resetSeccionPagar();
      mostrarMensajeConfirmacionPago(
        `Se ha confirmado el pago de $${costoFinal.precioFinal}`
      );
    } else {
      document.querySelector(".appPagarCreditoError").style.display =
        "inline-block";
    }
  });
