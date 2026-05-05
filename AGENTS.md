# AGENTS

## Repo shape (do not mix these by accident)
- `backend/` is the real API (Spring Boot + JPA + Security + JWT).
- `frontend/` is the real SPA (Angular 20 standalone app).
- `PAGINA WEB/` is a separate static HTML/CSS/JS site; treat it as legacy/independent unless a task explicitly asks for that folder.

## Verified run commands
- Backend dev server (Windows PowerShell): `./mvnw.cmd spring-boot:run` from `backend/`.
- Backend tests: `./mvnw.cmd test` from `backend/`.
- Single backend test: `./mvnw.cmd -Dtest=BackendApplicationTests test` (or another test class name) from `backend/`.
- Frontend install: `npm install` from `frontend/`.
- Frontend dev server: `npm run start` (alias of `ng serve`) from `frontend/`.
- Frontend build: `npm run build` from `frontend/`.
- Frontend tests: `npm run test` from `frontend/`.

## Runtime wiring that agents often miss
- Frontend auth service calls `http://localhost:8080/api/usuarios` directly (`frontend/src/app/services/auth.ts`), so backend must be running on `8080` for login flows.
- Backend CORS is configured for `http://localhost:4200` in `backend/src/main/java/com/peliculas/backend/config/SecurityConfig.java`.
- Security is feature-flagged by `app.security.enabled`; current default in `backend/src/main/resources/application.properties` is `false` (all requests permitted).
- Initial movie/series seed data is auto-loaded at startup by `backend/src/main/java/com/peliculas/backend/DataLoader.java` when tables are empty.

## Entry points and boundaries
- Backend entry point: `backend/src/main/java/com/peliculas/backend/BackendApplication.java`.
- Main backend API controllers: `/api/usuarios`, `/api/peliculas`, `/api/series` under `backend/src/main/java/com/peliculas/backend/controller/`.
- Frontend bootstrap: `frontend/src/main.ts` -> `frontend/src/app/app.config.ts` -> `frontend/src/app/app.routes.ts`.
- Angular routes are component-routed (no NgModule app module): `login`, `home`, `peliculas`, `series`, `generos/:genero`, `contactos`, `nosotros`.

## Safety and hygiene notes
- `backend/src/main/resources/application.properties` currently contains a real-looking DB password and username; do not copy this into PR text/issues/logs. Prefer moving secrets to env vars for any security-related task.
- Build outputs and dependencies (`backend/target`, `frontend/dist`, `frontend/node_modules`, `frontend/.angular/cache`) should not be edited manually.

## Current Progress (May 2026)

### Completed Features
- Full authentication system (login/register) with JWT
- Movie and series catalog loaded from Supabase
- Detail pages (/detalle/:tipo/:id) with reviews, ratings, favorites
- User profile page (/perfil) showing favorites, reviews, ratings
- Admin panel (/admin) with CRUD for movies/series and review deletion
- Admin access restricted to users with rol="ADMIN" in database
- Search with autocomplete suggestions in header
- Improved responsive design and spacing

### Pending Tasks
- Verify admin functionality with actual ADMIN user in database
- Test CRUD operations (edit/delete movies, series, reviews)
- End-to-end testing of social features (reviews, ratings, favorites)

### Known Issues
- CSS budget warnings (non-blocking, build succeeds)
- Security currently disabled (app.security.enabled=false in application.properties)
