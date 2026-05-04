package com.peliculas.backend.repository;

import com.peliculas.backend.model.Favorito;
import com.peliculas.backend.model.TipoContenido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    Optional<Favorito> findByUsuarioIdAndTipoContenidoAndContenidoId(Long usuarioId, TipoContenido tipoContenido, Long contenidoId);

    List<Favorito> findByUsuarioIdOrderByFechaCreacionDesc(Long usuarioId);

    List<Favorito> findByUsuarioIdAndTipoContenidoOrderByFechaCreacionDesc(Long usuarioId, TipoContenido tipoContenido);
}
