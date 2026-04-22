document.addEventListener("DOMContentLoaded", function () {

  //CARRUSELES SWIPER
  const swiperEstrenos = new Swiper(".swiper-estrenos", {
    slidesPerView: 5,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      320: { slidesPerView: 1.5 },
      480: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 5 }
    },
    on: {
      slideChange: function () {
        const btn = document.querySelector(".estreno-boton");
        if (btn) btn.style.display = this.isEnd ? "block" : "none";
      }
    }
  });

  const swiperRecomendadas = new Swiper(".swiper-recomendadas", {
    slidesPerView: 5,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      320: { slidesPerView: 1.5 },
      480: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 5 }
    },
    on: {
      slideChange: function () {
        const btn = document.querySelector(".recomendadas-boton");
        if (btn) btn.style.display = this.isEnd ? "block" : "none";
      }
    }
  });

//TRAILER BOTON
  const verTrailerBtn = document.querySelector(".btn-sinopsis");
  const closeButton = document.querySelector(".close-btn");

  if (verTrailerBtn) {
    verTrailerBtn.addEventListener("click", function () {
      const sinopsis = document.querySelector(".sinopsis");
      if (!sinopsis) return;

      sinopsis.style.display = "flex";

      const video = document.getElementById("trailerVideo");
      if (video) {
        video.currentTime = 0;
        video.play();
      }
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      const sinopsis = document.querySelector(".sinopsis");
      if (!sinopsis) return;

      sinopsis.style.display = "none";

      const video = document.getElementById("trailerVideo");
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }

  //VER MAS PELICULAS 
  const contenedor = document.getElementById("contenedor-peliculas-accion");
  const botonVerMas = document.getElementById("btn-ver-mas-accion");

  if (contenedor && botonVerMas) {
    const peliculas = [
      { titulo: "Acción 1", imagen: "IMAGENES/pelicula1.jpg" },
      { titulo: "Acción 2", imagen: "IMAGENES/pelicula2.jpg" }
    ];

    let cantidadMostrada = 0;
    const cantidadPorCarga = 4;

    function mostrarPeliculas() {
      const fin = Math.min(cantidadMostrada + cantidadPorCarga, peliculas.length);
      for (let i = cantidadMostrada; i < fin; i++) {
        const peli = peliculas[i];
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <img src="${peli.imagen}" alt="${peli.titulo}">
          <h3>${peli.titulo}</h3>
        `;
        contenedor.appendChild(div);
      }
      cantidadMostrada = fin;
      if (cantidadMostrada >= peliculas.length) {
        botonVerMas.style.display = "none";
      }
    }

    botonVerMas.addEventListener("click", mostrarPeliculas);
    mostrarPeliculas();
  }

  //BUSCAODR
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const term = searchInput.value.trim();
        if (term) {
          window.location.href = `resultados.html?q=${encodeURIComponent(term)}`;
        }
      }
    });
  }
//REGISTRO Y LOGIN 
  function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
  }
  window.abrirRegistro = () => {
    document.getElementById("modalRegistro").style.display = "flex";
  };

  window.abrirLogin = () => {
    document.getElementById("modalLogin").style.display = "flex";
  };

  window.registrarUsuario = () => {
    const usuario = document.getElementById("regUsuario").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!usuario || !password) {
      alert("Completa usuario y contraseña para registrarte");
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    if (usuarios[usuario]) {
      alert("El usuario ya existe");
      return;
    }

    usuarios[usuario] = password;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Registro exitoso. Ahora inicia sesión.");

    document.getElementById("regUsuario").value = "";
    document.getElementById("regPassword").value = "";
    cerrarModal("modalRegistro");
  };

  window.iniciarSesion = () => {
    const usuario = document.getElementById("loginUsuario").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    if (usuarios[usuario] && usuarios[usuario] === password) {
      localStorage.setItem("usuarioActual", usuario);
      mostrarUsuario(usuario);
      cerrarModal("modalLogin");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  function mostrarUsuario(usuario) {
    document.getElementById("btn-registrarse").style.display = "none";
    document.getElementById("btn-iniciarSesion").style.display = "none";

    const container = document.getElementById("userMenuContainer");
    container.innerHTML = `
      <div class="user-dropdown">
        <button id="userButton">${usuario} ▼</button>
        <div id="userDropdownContent" class="dropdown-content" style="display:none;">
          <a href="#">Perfil</a>
          <a href="#">Mis peliculas</a>
          <a href="#">Mis series</a>
          <a href="#" onclick="cerrarSesion()">Cerrar sesión</a>
        </div>
      </div>
    `;

    document.getElementById("userButton").addEventListener("click", () => {
      const dropdown = document.getElementById("userDropdownContent");
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });
  }

  window.cerrarSesion = () => {
    localStorage.removeItem("usuarioActual");
    document.getElementById("userMenuContainer").innerHTML = "";
    document.getElementById("btn-registrarse").style.display = "inline-block";
    document.getElementById("btn-iniciarSesion").style.display = "inline-block";
  };

  if (localStorage.getItem("usuarioActual")) {
    mostrarUsuario(localStorage.getItem("usuarioActual"));
  }

  // Cierre modal al hacer clic fuera
  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });
//DETALLES DE LAS PELICULAS 
  const peliculasInfo = {
    "Demon Slayer": {
      sinopsis: "El Cuerpo de Cazadores de Demonios se enfrenta a los Doce Kizuki restantes antes de enfrentarse a Muzan en el Castillo del Infinito para derrotarlo de una vez por todas..",
      imagen: "imagenes/Demon slayer.jpeg"
    },
    "Los 4 Fantásticos": {
      sinopsis: "Cuatro científicos obtienen superpoderes y luchan contra el mal.",
      imagen: "imagenes/los 4.png"
    },
    "Better Man": {
      sinopsis: "Biografía musical del cantante Robbie Williams.",
      imagen: "imagenes/betterman.png"
    },
    "Flow": {
      sinopsis: "Una comedia dramática urbana...",
      imagen: "imagenes/flow.png"
    },
    "Minecraft": {
      sinopsis: "Una aventura épica inspirada en el videojuego más vendido del mundo.",
      imagen: "imagenes/MINECRAFT.png"
    },
    "Conclave": {
      sinopsis: "Un thriller político ambientado en la elección de un nuevo Papa.",
      imagen: "imagenes/conclave.png"
    }
  };
// Abrir detalle de pelicula
  window.abrirDetalle = (titulo) => {
    const datos = peliculasInfo[titulo];
    if (!datos) return;

    document.getElementById("detalle-img").src = datos.imagen;
    document.getElementById("detalle-titulo").textContent = titulo;
    document.getElementById("detalle-sinopsis").textContent = datos.sinopsis;
    document.getElementById("detalle-overlay").style.display = "flex";
  };

  window.cerrarDetalle = () => {
    document.getElementById("detalle-overlay").style.display = "none";
  };

  document.querySelectorAll(".swiper-slide").forEach(slide => {
    slide.addEventListener("click", () => {
      const titulo = slide.querySelector(".titulo-pelicula")?.textContent.trim();
      if (titulo) abrirDetalle(titulo);
    });
  });

  // Ocultar overlay al inicio
  document.getElementById("detalle-overlay").style.display = "none";

});
