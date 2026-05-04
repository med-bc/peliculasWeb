package com.peliculas.backend.dto;

import com.peliculas.backend.model.TipoContenido;

public class CalificacionRequest {
    private Long usuarioId;
    private TipoContenido tipoContenido;
    private Long contenidoId;
    private Integer puntuacion;

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public TipoContenido getTipoContenido() {
        return tipoContenido;
    }

    public void setTipoContenido(TipoContenido tipoContenido) {
        this.tipoContenido = tipoContenido;
    }

    public Long getContenidoId() {
        return contenidoId;
    }

    public void setContenidoId(Long contenidoId) {
        this.contenidoId = contenidoId;
    }

    public Integer getPuntuacion() {
        return puntuacion;
    }

    public void setPuntuacion(Integer puntuacion) {
        this.puntuacion = puntuacion;
    }
}
