package com.peliculas.backend.service;

import com.peliculas.backend.model.Serie;
import com.peliculas.backend.repository.SerieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SerieService {

    @Autowired
    private SerieRepository serieRepository;

    public List<Serie> getAllSeries() {
        return serieRepository.findAll();
    }

    public Serie getSerieById(Long id) {
        return serieRepository.findById(id).orElse(null);
    }

    public Serie saveSerie(Serie serie) {
        return serieRepository.save(serie);
    }
}