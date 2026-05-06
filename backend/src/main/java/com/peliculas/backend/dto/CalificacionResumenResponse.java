package com.peliculas.backend.dto;

public class CalificacionResumenResponse {
    private Double promedio;
    private Long total;
    private Integer miPuntuacion;

    public CalificacionResumenResponse(Double promedio, Long total, Integer miPuntuacion) {
        this.promedio = promedio;
        this.total = total;
        this.miPuntuacion = miPuntuacion;
    }

    public Double getPromedio() {
        return promedio;
    }

    public Long getTotal() {
        return total;
    }

    public Integer getMiPuntuacion() {
        return miPuntuacion;
    }
}
