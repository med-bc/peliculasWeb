package com.peliculas.backend.controller;

import com.peliculas.backend.dto.*;
import com.peliculas.backend.model.Favorito;
import com.peliculas.backend.model.Resena;
import com.peliculas.backend.model.TipoContenido;
import com.peliculas.backend.service.SocialService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/social")
@CrossOrigin(origins = "http://localhost:4200")
public class SocialController {

    private final SocialService socialService;

    public SocialController(SocialService socialService) {
        this.socialService = socialService;
    }

    @GetMapping("/resenas")
    public List<ResenaResponse> listarResenas(
            @RequestParam TipoContenido tipoContenido,
            @RequestParam Long contenidoId
    ) {
        return socialService.listarResenas(tipoContenido, contenidoId)
                .stream()
                .map(ResenaResponse::fromEntity)
                .toList();
    }

    @GetMapping("/resenas/usuario/{usuarioId}")
    public List<ResenaResponse> listarResenasUsuario(@PathVariable Long usuarioId) {
        return socialService.listarResenasUsuario(usuarioId)
                .stream()
                .map(ResenaResponse::fromEntity)
                .toList();
    }

    @PostMapping("/resenas")
    public ResenaResponse crearResena(@RequestBody ResenaRequest request) {
        Resena resena = socialService.crearResena(request);
        return ResenaResponse.fromEntity(resena);
    }

    @DeleteMapping("/resenas/{resenaId}")
    public void eliminarResena(@PathVariable Long resenaId, @RequestParam Long usuarioId) {
        socialService.eliminarResena(resenaId, usuarioId);
    }

    @PostMapping("/calificaciones")
    public CalificacionResumenResponse calificar(@RequestBody CalificacionRequest request) {
        return socialService.calificar(request);
    }

    @GetMapping("/calificaciones/resumen")
    public CalificacionResumenResponse obtenerResumen(
            @RequestParam TipoContenido tipoContenido,
            @RequestParam Long contenidoId,
            @RequestParam(required = false) Long usuarioId
    ) {
        return socialService.obtenerResumenCalificacion(tipoContenido, contenidoId, usuarioId);
    }

    @PostMapping("/favoritos/toggle")
    public Map<String, Boolean> alternarFavorito(@RequestBody FavoritoRequest request) {
        boolean favorito = socialService.alternarFavorito(request);
        return Map.of("favorito", favorito);
    }

    @GetMapping("/favoritos")
    public List<Favorito> listarFavoritos(
            @RequestParam Long usuarioId,
            @RequestParam(required = false) TipoContenido tipoContenido
    ) {
        return socialService.listarFavoritos(usuarioId, tipoContenido);
    }

    @GetMapping("/favoritos/existe")
    public Map<String, Boolean> esFavorito(
            @RequestParam Long usuarioId,
            @RequestParam TipoContenido tipoContenido,
            @RequestParam Long contenidoId
    ) {
        return Map.of("favorito", socialService.esFavorito(usuarioId, tipoContenido, contenidoId));
    }
}
