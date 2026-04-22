package com.peliculas.backend;

import com.peliculas.backend.model.Pelicula;
import com.peliculas.backend.model.Serie;
import com.peliculas.backend.repository.PeliculaRepository;
import com.peliculas.backend.repository.SerieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private PeliculaRepository peliculaRepository;

    @Autowired
    private SerieRepository serieRepository;

    @Override
    public void run(String... args) throws Exception {
        // Insertar películas de ejemplo
        if (peliculaRepository.count() == 0) {
            peliculaRepository.save(new Pelicula(null, "Demon Slayer", "/assets/Demon slayer.jpeg", "Descripción", "Anime", 2020));
            peliculaRepository.save(new Pelicula(null, "Los 4 Fantásticos", "/assets/los 4.png", "Descripción", "Acción", 2024));
            peliculaRepository.save(new Pelicula(null, "Better Man", "/assets/betterman.png", "Descripción", "Drama", 2024));
            peliculaRepository.save(new Pelicula(null, "Flow", "/assets/flow.png", "Descripción", "Animación", 2024));
            peliculaRepository.save(new Pelicula(null, "Minecraft", "/assets/MINECRAFT.png", "Descripción", "Aventura", 2024));
            peliculaRepository.save(new Pelicula(null, "Conclave", "/assets/conclave.png", "Descripción", "Drama", 2024));
            peliculaRepository.save(new Pelicula(null, "Destino Final", "/assets/destino final.png", "Descripción", "Terror", 2024));
            peliculaRepository.save(new Pelicula(null, "Capitán América", "/assets/Capitan america.png", "Descripción", "Acción", 2024));
            peliculaRepository.save(new Pelicula(null, "Estado Eléctrico", "/assets/estado electrico.png", "Descripción", "Thriller", 2024));
            peliculaRepository.save(new Pelicula(null, "Mickey 17", "/assets/Mickey 17.png", "Descripción", "Ciencia Ficción", 2024));
        }

        // Insertar series de ejemplo
        if (serieRepository.count() == 0) {
            serieRepository.save(new Serie(null, "Breaking Bad", "/assets/Breaking bad.png", "Descripción", "Drama", 2008, 5));
            serieRepository.save(new Serie(null, "Parasitos", "/assets/Parasitos.png", "Descripción", "Thriller", 2024, 1));
            serieRepository.save(new Serie(null, "The Walking Dead", "/assets/The Walking dead.png", "Descripción", "Terror", 2010, 11));
            serieRepository.save(new Serie(null, "El Hoyo", "/assets/El hoyo.png", "Descripción", "Terror", 2019, 1));
            serieRepository.save(new Serie(null, "Better Call Saul", "/assets/better call saul.png", "Descripción", "Drama", 2015, 6));
            serieRepository.save(new Serie(null, "Shrek", "/assets/shrek.png", "Descripción", "Animación", 2001, 1));
            serieRepository.save(new Serie(null, "Mr. Robot", "/assets/Mr Robot.png", "Descripción", "Thriller", 2015, 4));
            serieRepository.save(new Serie(null, "Rec", "/assets/rec.png", "Descripción", "Terror", 2007, 1));
            serieRepository.save(new Serie(null, "Juego de Tronos", "/assets/juego de tronos.png", "Descripción", "Fantasía", 2011, 8));
            serieRepository.save(new Serie(null, "El Viaje de Chihiro", "/assets/Chihiroo.png", "Descripción", "Animación", 2001, 1));
        }
    }
}