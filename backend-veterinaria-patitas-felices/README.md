# Backend Veterinaria Patitas Felices

Backend desarrollado en Node.js + Express + TypeScript + MySQL  
como Trabajo Práctico Intermedio.

## Descripción

El proyecto implementa una **API REST** con autenticación, autorización por roles y un CRUD real sobre una entidad del dominio veterinario.

## Tecnologías utilizadas

El sistema permite:

- Autenticación de usuarios mediante **JWT**
- Autorización por roles (**user** y **admin**)
- Registro de usuarios
- Acceso protegido a endpoints
- CRUD completo de la entidad **mascotas**
- Persistencia en base de datos **MySQL**
- Respeto por la **integridad referencial** del modelo de datos

El backend queda preparado para ser consumido por un frontend en una etapa posterior.

---

## Estructura del proyecto

src/
├─ config/
│ └─ db.ts
│ # Configuración y pool de conexión a MySQL
│
├─ controllers/
│ ├─ auth.controller.ts
│ │ # Controlador de login y registro
│ └─ mascota.controller.ts
│ # Controlador del CRUD de mascotas
│
├─ middlewares/
│ ├─ auth.middleware.ts
│ │ # Valida el JWT y autentica al usuario
│ └─ role.middleware.ts
│ # Verifica roles (user / admin)
│
├─ models/
│ ├─ user.model.ts
│ │ # Acceso a datos de usuarios y roles
│ │ # Utilizado en el proceso de login y autorización
│ │
│ ├─ auth.model.ts
│ │ # Acceso a datos para registro y asignación de roles
│ │
│ └─ mascota.model.ts
│ # CRUD SQL real de la entidad mascotas
│
├─ routes/
│ ├─ auth.routes.ts
│ │ # Rutas de autenticación (login / register)
│ └─ mascota.routes.ts
│ # Rutas del CRUD de mascotas
│
│
├─ services/
│ ├─ auth.service.ts
│ │ # Lógica de login y generación de JWT
│ ├─ register.service.ts
│ │ # Lógica de registro de usuarios
│ └─ mascota.service.ts
│ # Lógica de negocio del CRUD de mascotas
│
├─ app.ts
│ # Configuración de Express, middlewares y rutas
│
└─ server.ts # Punto de entrada del servidor

## Compilar y probar

npm run build
npm start

\*No se utiliza ts-node ni nodemon

## Autenticación y Autorización

La API utiliza JWT para autenticación y control de acceso por roles.

### Login

POST /auth/login

### Endpoints protegidos

- GET /protected/user → roles: user, admin
- GET /protected/admin → rol: admin

### Header requerido

Token User:

Authorization: Bearer <"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoyLCJlbWFpbCI6InVzZXJAdGVzdC5jb20iLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTc2OTYyMTExNSwiZXhwIjoxNzY5NjI0NzE1fQ.VmACbPobMUgSxhQVzr8jYPhcwphRVSC-g7PW5N2YQio">

Token Admin:

Authorization: Bearer <"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNzY5NjIwNzg4LCJleHAiOjE3Njk2MjQzODh9.uXxRWLttf66QZaCIChxWhf3H28cM8eL7IO8tNW7qgWo">

### Pruebas con curl

### Login (obtener token USER)

curl -X POST http://localhost:3000/auth/login \
 -H "Content-Type: application/json" \
 -d "{\"email\":\"user@test.com\",\"password\":\"1234\"}"

### Login (obtener token ADMIN)

curl -X POST http://localhost:3000/auth/login \
 -H "Content-Type: application/json" \
 -d "{\"email\":\"admin@test.com\",\"password\":\"admin123\"}"

## Acceso USER (con token)

curl http://localhost:3000/protected/user \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoyLCJlbWFpbCI6InVzZXJAdGVzdC5jb20iLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTc2OTYxMzc3NiwiZXhwIjoxNzY5NjE3Mzc2fQ.18z0kgqRdk3uz2_K5ikHhztupdHFUmvnTjvMmPpii0o"

Respuesta : {"message":"Acceso USER permitido"}

## Acceso ADMIN con usuario común (debe fallar)

curl http://localhost:3000/protected/admin \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNzY5NjIwNzg4LCJleHAiOjE3Njk2MjQzODh9.uXxRWLttf66QZaCIChxWhf3H28cM8eL7IO8tNW7qgWo"

Respuesta : { "message": "Acceso denegado" }

## Sin token (debe fallar)

curl http://localhost:3000/protected/user

Respuesta :{ "message": "Token requerido" }

### Registro de usuarios

POST /auth/register

Crea un usuario con rol `user` por defecto.

{
"email": "nuevo@test.com",
"password": "1234"
}

## Registrar Usuario (User)

curl -X POST http://localhost:3000/auth/register \
 -H "Content-Type: application/json" \
 -d "{\"email\":\"nuevo@user.com\",\"password\":\"1234\"}"

Respuesta :{ "message": "Usuario registrado correctamente" }

## Registro duplicado

curl -X POST http://localhost:3000/auth/register \
 -H "Content-Type: application/json" \
 -d "{\"email\":\"nuevo@user.com\",\"password\":\"1234\"}"

Respuesta :{"message":"El email ya está registrado"}

## Reglas de acceso:

GET → user, admin

POST / PUT / DELETE → admin

### CRUD Mascotas

Campos:

- id_mascota
- nombre
- especie
- fecha_nacimiento
- id_dueno

Accesos:

- GET /mascotas → user, admin
- GET /mascotas/:id → user, admin
- POST /mascotas → admin
- PUT /mascotas/:id → admin
- DELETE /mascotas/:id → admin

## Listar (user/admin)

curl http://localhost:3000/mascotas \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoyLCJlbWFpbCI6InVzZXJAdGVzdC5jb20iLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTc2OTYyMTQ2NSwiZXhwIjoxNzY5NjI1MDY1fQ.MIen930oZtt0QhCWmSqBSSA3NxYtQsiLbjLLFTcFXq8"

Respuesta :[{"id_mascota":1,"nombre":"Firulais","especie":"Perro","fecha_nacimiento":"201
8-05-01T03:00:00.000Z","id_dueno":1},{"id_mascota":2,"nombre":"Miau","especie":"Gato","fecha_nacimiento":"2020-08-15T03:00:00.000Z","id_dueno":2}]

## Listar x Id (user/admin)

curl http://localhost:3000/mascotas/1 \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoyLCJlbWFpbCI6InVzZXJAdGVzdC5jb20iLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTc2OTYyMTQ2NSwiZXhwIjoxNzY5NjI1MDY1fQ.MIen930oZtt0QhCWmSqBSSA3NxYtQsiLbjLLFTcFXq8"

Respuesta :{"id_mascota":1,"nombre":"Firulais","especie":"Perro","fecha_nacimiento":"2018
-05-01T03:00:00.000Z","id_dueno":1}

## Crear (admin)

curl -X POST http://localhost:3000/mascotas \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNzY5NjIwNzg4LCJleHAiOjE3Njk2MjQzODh9.uXxRWLttf66QZaCIChxWhf3H28cM8eL7IO8tNW7qgWo" \
 -H "Content-Type: application/json" \
 -d '{"nombre":"Luna","especie":"Perro","fecha_nacimiento":"2021-03-15","id_dueno":1}'

Respuesta :{"nombre":"Luna","especie":"Perro","fecha_nacimiento":"2021-03-15","id_dueno":1}';0fda9aa7-288b-43c8-b1eb-ae24bc8c4c2f{"id_mascota":3}

## Actualizar (admin)

curl -X PUT http://localhost:3000/mascotas/1 \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNzY5NjIwNzg4LCJleHAiOjE3Njk2MjQzODh9.uXxRWLttf66QZaCIChxWhf3H28cM8eL7IO8tNW7qgWo" \
 -H "Content-Type: application/json" \
 -d '{"nombre":"Luna","especie":"Perro","fecha_nacimiento":"2021-03-15","id_dueno":1}'

Respuesta :{"nombre":"Luna","especie":"Perro","fecha_nacimiento":"2021-03-15","id_dueno":1}';0fda9aa7-288b-43c8-b1eb-ae24bc8c4c2f{"message":"Mascota actualizada"}

## Eliminar (admin)

curl -X DELETE http://localhost:3000/mascotas/4 \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNzY5NjIwNzg4LCJleHAiOjE3Njk2MjQzODh9.uXxRWLttf66QZaCIChxWhf3H28cM8eL7IO8tNW7qgWo"

Respuesta : {"message":"Mascota eliminada"}

### Eliminación de mascotas

No se permite eliminar una mascota que tenga historial clínico asociado.
Esto se debe a restricciones de integridad referencial definidas en la base de datos.

En ese caso, la API devuelve:

{
"message": "No se puede eliminar la mascota porque tiene historial clínico"
}

## Pruebas

Todas las pruebas se realizaron con curl e Insomnia

### Configuración del entorno

En Insomnia se definieron las siguientes variables de entorno:

- `BASE_URL`: URL base del backend (http://localhost:3000)
- `TOKEN_USER`: Token JWT obtenido al autenticar un usuario con rol `user`
- `TOKEN_ADMIN`: Token JWT obtenido al autenticar un usuario con rol `admin`

Los tokens se obtienen ejecutando los endpoints de login y luego se reutilizan automáticamente en las requests protegidas.

Se validaron:
Auth – Login USER
Auth – Login ADMIN
Listar mascotas (USER)
Crear mascota (ADMIN)
Actualizar mascota (ADMIN)
Eliminar mascota (ADMIN)

## Se adjuntan capturas en la carpeta Test.

```

```

```

```
