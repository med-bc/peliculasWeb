package com.peliculas.backend.repository;

import com.peliculas.backend.model.Calificacion;
import com.peliculas.backend.model.TipoContenido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CalificacionRepository extends JpaRepository<Calificacion, Long> {
    Optional<Calificacion> findByUsuarioIdAndTipoContenidoAndContenidoId(Long usuarioId, TipoContenido tipoContenido, Long contenidoId);

    @Query("select avg(c.puntuacion) from Calificacion c where c.tipoContenido = :tipoContenido and c.contenidoId = :contenidoId")
    Double calcularPromedio(TipoContenido tipoContenido, Long contenidoId);

    long countByTipoContenidoAndContenidoId(TipoContenido tipoContenido, Long contenidoId);

    @Query("select c.puntuacion from Calificacion c where c.usuario.id = :usuarioId and c.tipoContenido = :tipoContenido and c.contenidoId = :contenidoId")
    Optional<Integer> findPuntuacionByUsuario(Long usuarioId, TipoContenido tipoContenido, Long contenidoId);
}
