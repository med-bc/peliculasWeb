package com.peliculas.backend.dto;

public class LoginResponse {
    private String token;
    private Long usuarioId;
    private String nombreUsuario;
    private String rol;

    public LoginResponse(String token, Long usuarioId, String nombreUsuario, String rol) {
        this.token = token;
        this.usuarioId = usuarioId;
        this.nombreUsuario = nombreUsuario;
        this.rol = rol;
    }

    public String getToken() {
        return token;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public String getRol() {
        return rol;
    }
}
