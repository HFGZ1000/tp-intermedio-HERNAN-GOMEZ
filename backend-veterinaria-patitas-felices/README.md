🐾 TRABAJO PRÁCTICO FINAL
Backend – Veterinaria Patitas Felices

Backend desarrollado en Node.js + Express + TypeScript + MySQL

📌 Descripción

Sistema de gestión para la veterinaria “Patitas Felices” que permite administrar:

👤 Dueños

🐾 Mascotas

📂 Historial clínico (relación en base de datos)

🔐 Usuarios con roles (user, admin)

Incluye autenticación JWT, autorización por roles, validaciones con express-validator e integración con un frontend mínimo en HTML/CSS/JS.

🏗️ Arquitectura

El backend implementa arquitectura MVC:

src/
├── routes/
├── controllers/
├── services/
├── models/
├── middlewares/
├── types/
└── config/

📌 Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- MySQL
- JWT (jsonwebtoken)
- bcrypt
- mysql2
- dotenv
- express-validator
- HTML / CSS / JavaScript (Frontend)

⚙️ Instalación y ejecución

npm install
npm run build
npm start

No se utiliza ts-node ni nodemon.
El proyecto corre sobre la carpeta dist compilada.

🔐 Variables de entorno

Debe existir un archivo .env con:

PORT=3000
JWT_SECRET=clave_secreta
JWT_EXPIRES_IN=1h

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=veterinaria_patitas_felices

Se incluye .env.example.

🔐 Autenticación y Autorización

La API utiliza JWT para autenticación y control por roles.

Roles disponibles

user

admin

Header requerido
Authorization: Bearer <TOKEN>

🔑 Login
POST /auth/login

Usuario
curl -X POST http://localhost:3000/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"user@test.com","password":"123456"}'

Administrador
curl -X POST http://localhost:3000/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"admin@test.com","password":"123456"}'

📝 Registro
POST /auth/register

Incluye validaciones con express-validator:

Email obligatorio y válido

Password mínimo 6 caracteres

curl -X POST http://localhost:3000/auth/register \
 -H "Content-Type: application/json" \
 -d '{"email":"nuevo@user.com","password":"123456"}'

🔒 Reglas de acceso por rol

GET /mascotas user, admin
GET /mascotas/:id user, admin
POST /mascotas admin
PUT /mascotas/:id admin
DELETE /mascotas/:id admin
GET /duenos user, admin

🐶 Mascotas

# Campos

- id_mascota
- nombre
- especie
- fecha_nacimiento
- id_dueno

Validaciones implementadas

nombre obligatorio

especie obligatoria

fecha en formato YYYY-MM-DD

id_dueno numérico

📋 GET /mascotas

Incluye JOIN con tabla duenos, devolviendo:

dueno_nombre

dueno_apellido

Ejemplo:

{
"id_mascota": 1,
"nombre": "Michi",
"especie": "Gato",
"fecha_nacimiento": "2021-03-15",
"id_dueno": 1,
"dueno_nombre": "Juan",
"dueno_apellido": "Pérez"
}

➕ Crear Mascota (admin)
curl -X POST http://localhost:3000/mascotas \
 -H "Authorization: Bearer <TOKEN_ADMIN>" \
 -H "Content-Type: application/json" \
 -d '{"nombre":"Luna","especie":"Perro","fecha_nacimiento":"2021-03-15","id_dueno":1}'

❌ Eliminar Mascota (admin)
curl -X DELETE http://localhost:3000/mascotas/4 \
 -H "Authorization: Bearer <TOKEN_ADMIN>"

Respuesta:

{ "message": "Mascota eliminada" }

👤 Dueños

# Campos

- id_dueno
- nombre
- apellido
- telefono
- direccion

GET /duenos

Utilizado para poblar el <select> del modal en el frontend.

curl http://localhost:3000/duenos \
 -H "Authorization: Bearer <TOKEN>"

🖥️ Frontend (HTML + CSS + JS)

Login / Register

Tabla dinámica de mascotas con nombre y apellido del dueño

Modal para crear / editar mascota

CRUD habilitado solo para admin

Integración real con el backend mediante fetch

📜 Reglas de negocio

# Crear mascota

No puede existir una mascota sin dueño (FK obligatoria).

# Eliminar mascota

No se permite eliminar una mascota que tenga historial clínico asociado.

La API devuelve:

{
"message": "No se puede eliminar la mascota porque tiene historial clínico"
}

Esto se debe a restricciones de integridad referencial en MySQL.

🧪 Pruebas

Las pruebas se realizaron con:

curl

Insomnia

Se incluyen capturas y colección en carpeta /test.

Endpoints validados:

Login USER
Login ADMIN
Register USER
Listar Dueños
Listar Mascotas
Crear Mascota
Actualizar Mascota
Eliminar Mascota

✅ Resumen final del proyecto

✔ Arquitectura MVC
✔ Node.js & Express
✔ TypeScript
✔ DTOS
✔ JWT
✔ Roles
✔ bcrypt
✔ express-validator
✔ CRUD funcional
✔ JOIN Mascotas + Dueños
✔ Integración frontend-backend
✔ Manejo centralizado de errores
✔ Integridad referencial en base de datos
✔ Variables de entorno con archivo .env
