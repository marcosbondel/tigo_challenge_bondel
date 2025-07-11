<p align="center">
    <img width="300" alt="TigoMock logo" src="./docs/tigo_logo.png" />
</p>

<h3 align="center">API-based app intented for mocks of REST services</h3>
<hr/>

Version 0.7.0 :octocat:

Encuentra los requerimientos iniciales [aquí](./docs/requirements.md)

---
## Tabla de contenidos
- [Tabla de contenidos](#tabla-de-contenidos)
- [Estructura de la aplicación](#estructura-de-la-aplicación)
- [Instrucciones de instalación](#instrucciones-de-instalación)
  - [🖥️ Requisitos del Sistema](#️-requisitos-del-sistema)
    - [🔧 Requerimientos de software](#-requerimientos-de-software)
    - [💻 Requerimientos de hardware](#-requerimientos-de-hardware)
- [🚀 Instalación](#-instalación)
  - [1. Clona el repositorio](#1-clona-el-repositorio)
  - [2. Instala las dependencias](#2-instala-las-dependencias)
  - [3. Configura las variables de entorno](#3-configura-las-variables-de-entorno)
  - [4. Ejecuta la aplicación en modo desarrollo](#4-ejecuta-la-aplicación-en-modo-desarrollo)
  - [🧪 Ejecutar pruebas](#-ejecutar-pruebas)
  - [✅ ¡Listo!](#-listo)
- [API Docs](#api-docs)
- [📡 API - Gestión de Mocks](#-api---gestión-de-mocks)
  - [🔎 GET `/api/configure-mock`](#-get-apiconfigure-mock)
  - [🔎 GET `/api/configure-mock/:id`](#-get-apiconfigure-mockid)
  - [➕ POST `/api/configure-mock`](#-post-apiconfigure-mock)
  - [📝 PUT `/api/configure-mock/:id`](#-put-apiconfigure-mockid)
  - [✏️ PATCH `/api/configure-mock/:id`](#️-patch-apiconfigure-mockid)
  - [❌ DELETE `/api/configure-mock/:id`](#-delete-apiconfigure-mockid)
- [🛡️ Tokens de acceso](#️-tokens-de-acceso)
- [🧪 Ejemplo de prueba con `curl`](#-ejemplo-de-prueba-con-curl)
- [Lisencia](#lisencia)



---
## Estructura de la aplicación
```
├── config
│   ├── app.js
│   ├── database.js
│   ├── index.js
│   └── server.js
├── controllers
│   ├── index.js
│   ├── mocks_controller.js
│   └── resources_controller.js
├── docs
│   ├── api.md
│   ├── english.md
│   ├── requirements.md
│   └── spanish.md
├── index.js
├── license
├── middlewares
│   ├── index.js
│   └── validators.js
├── models
│   ├── index.js
│   └── mock_model.js
├── package-lock.json
├── package.json
├── readme.md
├── routes
│   ├── index.js
│   ├── mock_routes.js
│   └── resource_routes.js
├── system
│   ├── http_responder.js
│   ├── index.js
│   └── jwt.js
├── tests
│   ├── controllers
│   │   └── mocks_controller.test.js
│   └── helper.js
└── utils
    ├── compare.js
    └── index.js
```

## Instrucciones de instalación
---
### 🖥️ Requisitos del Sistema
---

Antes de instalar este proyecto, asegúrate de cumplir con los siguientes requerimientos mínimos:

#### 🔧 Requerimientos de software
---

- Node.js v18 o superior
- npm v9 o superior
- MongoDB Atlas (o instancia local ≥ 5.0)
- Sistema operativo: Linux, macOS o Windows (WSL recomendado en Windows)

#### 💻 Requerimientos de hardware
---

- CPU: 1 núcleo (recomendado: 2+)
- RAM: 512 MB (recomendado: 2 GB)
- Almacenamiento: 200 MB libres para dependencias y base de datos
- Conexión a internet (para MongoDB Atlas)

---

## 🚀 Instalación

### 1. Clona el repositorio

Se recomienda usar el protocolo **SSH** para facilitar autenticación con GitHub:

```bash
git clone git@github.com:marcosbondel/tigo_challenge_bondel.git
```

> 💡 Si no tienes configurado SSH, también puedes usar HTTPS:
> `git clone https://github.com/marcosbondel/tigo_challenge_bondel.git`

---

### 2. Instala las dependencias

Accede a la carpeta del proyecto y ejecuta la instalación de paquetes:

```bash
cd tigo_challenge_bondel
npm install
```

---

### 3. Configura las variables de entorno

Para manejar credenciales y configuraciones por entorno (desarrollo, pruebas y producción), crea los siguientes archivos en la raíz del proyecto:

* `.env.development`
* `.env.test`
* `.env.production`

Ejemplo de contenido para `.env.development`:

```env
SERVER_PORT=3001
MONGODB_URI=mongodb://localhost:27017/bondel_challenge_development
MONGODB_DB_NAME=bondel_challenge_development
JWT_SECRET=011235813
JWT_EXPIRATION=1h
```

> ⚠️ Asegúrate de **no subir estos archivos a GitHub**. Ya están ignorados en `.gitignore`.

---

### 4. Ejecuta la aplicación en modo desarrollo

```bash
npm run dev
```

Salida esperada:

```bash
> tigo_challenge_bondel@1.0.0 dev
> NODE_ENV=development nodemon index.js

[nodemon] starting `node index.js`
[dotenv@17.2.0] injecting env (12) from .env.development
HTTP server is listening on port: 3001
Mongoose online
```

---

### 🧪 Ejecutar pruebas

Para correr los tests del proyecto:

```bash
npm run test
```

Este comando usará el entorno de pruebas (`.env.test`) y ejecutará todos los archivos `*.test.js` ubicados dentro de la carpeta `tests`.

---

### ✅ ¡Listo!

Tu API debería estar corriendo en:
**[http://localhost:3001/](http://localhost:3001/)**

---

## API Docs
---

## 📡 API - Gestión de Mocks

### 🔎 GET `/api/configure-mock`

Obtiene una lista de todos los mocks registrados.

- **Respuesta exitosa (200):**
```json
[
  {
    "_id": "64cf...",
    "resource": "productos",
    "version": "v1.0.0",
    "method": "GET",
    "headers": [],
    "query_params": [],
    "content_type": "application/json",
    "access_token": null
  }
]
```

---

### 🔎 GET `/api/configure-mock/:id`

Obtiene un mock específico por ID.

* **Parámetros:**

  * `id`: ID del mock (Mongo ObjectId)

* **Respuesta exitosa (200):**

```json
{
  "_id": "64cf...",
  "resource": "productos",
  "version": "v1.0.0",
  "method": "GET",
  "headers": [],
  "query_params": [],
  "content_type": "application/json"
}
```

---

### ➕ POST `/api/configure-mock`

Crea una nueva configuración de mock.

* **Campos requeridos (JSON en body):**

```json
{
  "resource": "productos",
  "version": "1.0.0",
  "method": "GET",
  "headers": ["Authorization"],
  "query_params": ["categoria", "activo"],
  "content_type": "application/json"
}
```

* **Notas:**

  * Si incluyes el header `Authorization`, se generará automáticamente un `access_token`.
  * Si el método es `GET`, se validará que `query_params` sea un array.
  * Si el método es `POST`, `PUT` o `PATCH`, `body_params` debe ser un array.

* **Respuesta exitosa (200):**

```json
{
  "_id": "...",
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  ...
}
```

---

### 📝 PUT `/api/configure-mock/:id`

Actualiza completamente una configuración de mock.

* **Parámetro:**

  * `id`: ID del mock a actualizar

* **Body (ejemplo):**

```json
{
  "headers": [],
  "method": "POST"
}
```

---

### ✏️ PATCH `/api/configure-mock/:id`

Actualiza parcialmente un mock (igual que `PUT`, pero parcial).

---

### ❌ DELETE `/api/configure-mock/:id`

Elimina una configuración de mock por ID y su colección asociada.

* **Parámetro:**

  * `id`: ID del mock

* **Respuesta exitosa (200):**

```json
{
  "success": true,
  "message": "Document in mocks with id: ... deleted successfully"
}
```

---

## 🛡️ Tokens de acceso

Si un mock tiene configurado el header `Authorization`, el sistema generará un JWT de acceso. Este debe ser incluido en las peticiones al endpoint configurado:

```http
Authorization: Bearer <access_token>
```

---

## 🧪 Ejemplo de prueba con `curl`

```bash
curl -X POST http://localhost:3001/api/configure-mock \
  -H "Content-Type: application/json" \
  -d '{
    "resource": "clientes",
    "version": "1.0.0",
    "method": "GET",
    "headers": ["Authorization"],
    "query_params": ["nombre", "activo"],
    "content_type": "application/json"
  }'
```

---
## Lisencia

```
MIT License

Copyright (c) 2025 Marcos Bonifasi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
---
Built with :blue_heart: by [Marcos Bonifasi](https://github.com/marcosbondel)