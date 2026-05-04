const peliculas = [
  { nombre: "Demon Slayer", imagen: "imagenes/Demon slayer.jpeg" },
  { nombre: "Los 4 Fantásticos", imagen: "imagenes/los 4.png" },
  { nombre: "Better Man", imagen: "imagenes/betterman.png" },
  { nombre: "Flow", imagen: "imagenes/flow.png" },
  { nombre: "Minecraft", imagen: "imagenes/MINECRAFT.png" },
  { nombre: "Conclave", imagen: "imagenes/conclave.png" },
  { nombre: "Destino Final", imagen: "imagenes/destino final.png" },
  { nombre: "Capitan america", imagen: "imagenes/Capitan america.png" },
  { nombre: "Estado Electrico", imagen: "imagenes/estado electrico.png" },
  { nombre: "Mickey : 17", imagen: "imagenes/Mickey 17.png" },
  { nombre: "Breaking Bad", imagen: "imagenes/Breaking bad.png" },
  { nombre: "Parasitos", imagen: "imagenes/Parasitos.png" },
  { nombre: "The Walking dead", imagen: "imagenes/The Walking dead.png" },
  { nombre: "EL hoyo", imagen: "imagenes/El hoyo.png" },
  { nombre: "Better Call Saul", imagen: "imagenes/better call saul.png" },
  { nombre: "Shrek 1", imagen: "imagenes/shrek.png" },
  { nombre: "MrRobot", imagen: "imagenes/Mr Robot.png" },
  { nombre: "Rec 1", imagen: "imagenes/rec.png" },
  { nombre: "Juego de tronos", imagen: "imagenes/juego de tronos.png" },
  { nombre: "El viaje de CHihiro", imagen: "imagenes/Chihiroo.png" }
];

// Función para leer parámetros de URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const term = getQueryParam('q')?.toLowerCase() || '';
const resultadosContainer = document.getElementById('resultados-container');

function mostrarResultados(termino) {
  const resultados = peliculas.filter(p =>
    p.nombre.toLowerCase().includes(termino)
  );

  if (resultados.length === 0) {
    resultadosContainer.innerHTML = `<p>No se encontraron resultados para "<strong>${termino}</strong>".</p>`;
  } else {
    resultadosContainer.innerHTML = resultados.map(p => `
      <div class="resultado-item">
        <img src="${p.imagen}" alt="${p.nombre}" style="width:350px; height:auto;" />
        <p>${p.nombre}</p>
      </div>
    `).join('');
  }
}

// Mostrar resultados al cargar la página
mostrarResultados(term);

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

searchInput.value = term; 

searchBtn.addEventListener('click', () => {
  const nuevoTerm = searchInput.value.trim();
  if (nuevoTerm) {
    window.location.href = `resultados.html?q=${encodeURIComponent(nuevoTerm)}`;
  }
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

