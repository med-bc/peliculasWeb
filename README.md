# 🚀 Proyecto Full Stack - Spring Boot + Angular

Este proyecto es una aplicación web full stack desarrollada con:

- Backend: Spring Boot (Java)
- Frontend: Angular
- Base de datos: Supabase (PostgreSQL)

---

# 📌 Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

## 🔧 Backend
- Java JDK 17 o superior
- Git

## 🌐 Frontend
- Node.js (LTS recomendado)
- npm (viene con Node.js)
- Angular CLI


# 🚀 Ejecución del proyecto

El proyecto debe ejecutarse en dos terminales (backend y frontend).

## 🖥️ Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```
📍 Backend disponible en:
http://localhost:8080


## 🎨 Frontend (Angular)
```bash
cd frontend
npm install
npm install -g @angular/cli
ng serve
```
📍 Frontend disponible en:
http://localhost:4200


# ⚠️ Solución de problemas

Si tienes problemas con el backend (por ejemplo, el puerto 8080 está ocupado), puedes seguir estos pasos:

## 🔍 Verificar qué proceso está usando el puerto

En CMD o PowerShell (como administrador):

```bash
netstat -ano | findstr :8080
```

## 🛑 Finalizar el proceso que usa el puerto

Una vez identificado el PID (última columna), ejecuta:
```bash
taskkill /F /PID <PID>
```
