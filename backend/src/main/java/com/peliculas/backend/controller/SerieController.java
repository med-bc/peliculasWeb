package com.peliculas.backend.controller;

import com.peliculas.backend.model.Serie;
import com.peliculas.backend.service.SerieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/series")
@CrossOrigin(origins = "http://localhost:4200") // Para Angular
public class SerieController {

    @Autowired
    private SerieService serieService;

    @GetMapping
    public List<Serie> getAllSeries() {
        return serieService.getAllSeries();
    }

    @GetMapping("/{id}")
    public Serie getSerieById(@PathVariable Long id) {
        return serieService.getSerieById(id);
    }

    @PostMapping
    public Serie createSerie(@RequestBody Serie serie) {
        return serieService.saveSerie(serie);
    }
}