package com.peliculas.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "calificaciones",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_calificacion_usuario_contenido", columnNames = {"usuario_id", "tipo_contenido", "contenido_id"})
        }
)
public class Calificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_contenido", nullable = false)
    private TipoContenido tipoContenido;

    @Column(name = "contenido_id", nullable = false)
    private Long contenidoId;

    @Column(nullable = false)
    private Integer puntuacion;

    @Column(name = "fecha_actualizacion", nullable = false)
    private LocalDateTime fechaActualizacion;

    @PrePersist
    @PreUpdate
    public void preUpdate() {
        this.fechaActualizacion = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
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

    public LocalDateTime getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(LocalDateTime fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }
}
