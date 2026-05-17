package com.peliculas.backend.dto;

import com.peliculas.backend.model.Resena;
import com.peliculas.backend.model.TipoContenido;
import java.time.LocalDateTime;
import java.util.UUID;

public class ResenaResponse {
    private Long id;
    private UUID userId;
    private String nombreUsuario;
    private TipoContenido tipoContenido;
    private Long contenidoId;
    private String titulo;
    private String comentario;
    private int likes;
    private int dislikes;
    private LocalDateTime fechaCreacion;
    private String votoActual;

    public static ResenaResponse fromEntity(Resena resena) {
        ResenaResponse response = new ResenaResponse();
        response.id = resena.getId();
        response.userId = resena.getUserId();
        response.nombreUsuario = resena.getNombreUsuario();
        response.tipoContenido = resena.getTipoContenido();
        response.contenidoId = resena.getContenidoId();
        response.titulo = resena.getTitulo();
        response.comentario = resena.getComentario();
        response.likes = resena.getLikes();
        response.dislikes = resena.getDislikes();
        response.fechaCreacion = resena.getFechaCreacion();

        return response;
    }

    public Long getId() {
        return id;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public TipoContenido getTipoContenido() {
        return tipoContenido;
    }

    public Long getContenidoId() {
        return contenidoId;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getComentario() {
        return comentario;
    }

    public int getLikes() {
        return likes;
    }

    public int getDislikes() {
        return dislikes;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public String getVotoActual() {
        return votoActual;
    }

    public void setVotoActual(String votoActual) {
        this.votoActual = votoActual;
    }
}
