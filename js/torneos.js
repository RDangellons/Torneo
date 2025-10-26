// Array donde se guardan los jugadores
let jugadores = [];
let contador = 1;

// Cuando se envía el formulario
document.getElementById("formInscripcion").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const gamerTag = document.getElementById("gamerTag").value.trim();
  const torneo = document.getElementById("torneoSelect").value;

  if (!nombre || !gamerTag || !torneo) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Crear jugador
  jugadores.push({
    id: contador++,
    nombre,
    gamerTag,
    torneo,
    puntos: Math.floor(Math.random() * 10) + 1 // puntos aleatorios
  });

  actualizarTabla();
  this.reset();
  alert("¡Jugador inscrito con éxito!");
});

function actualizarTabla() {
  const tablaBody = document.getElementById("tablaBody");
  tablaBody.innerHTML = "";

  jugadores.forEach((jugador, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${jugador.nombre}</td>
      <td>${jugador.gamerTag}</td>
      <td>${jugador.torneo}</td>
      <td>${jugador.puntos}</td>
    `;
    tablaBody.appendChild(fila);
  });
}

