# API para Mocks de Servicios REST

## Contexto

En proyectos de desarrollo de software es muy común tener que simular el comportamiento de servicios externos mediante mocks, lo cual facilita el desarrollo y las pruebas de sistemas que dependen de ellos.

El objetivo de este challenge es desarrollar una API que permita definir y gestionar mocks de endpoints. La API deberá devolver respuestas personalizadas según la configuración especificada, teniendo en cuenta la ruta, el método HTTP, y los parámetros enviados en la URL, el cuerpo de la solicitud o los headers, así como variaciones en el Content-Type.

**Tiempo estimado de resolución: 12 horas.**

---

## Requisitos Funcionales

### 1. Configuración Dinámica de Mocks

#### Endpoint de Configuración

`POST /configure-mock`

Permite registrar nuevas configuraciones para mocks. La configuración deberá incluir:

- **Ruta:** URL para acceder al mock (ej. `/api/v1/productos`)
- **Método HTTP:** `GET`, `POST`, `PUT`, `DELETE`, etc.
- **Parámetros en URL:** (ej. `fechaInicial=2021-01-29 13:01:00&fechaFinal=2021-01-29 13:06:00`)
- **Parámetros en Body:** (ej. `{"telefono": "45456060"}`)
- **Encabezados:** (ej. `Authorization: Bearer xxxxxxxxxxxxxxx`)
- **Código de Estado HTTP:** `200`, `404`, `500`, etc.
- **Contenido de la Respuesta:** Datos estáticos o basados en plantillas.
- **Content-Type:** (ej. `application/json`, `text/xml`)

### 2. Ejecución del Mock

#### Endpoint Genérico

La API debe escuchar todas las rutas configuradas. Al recibir una solicitud:

- Buscar la configuración correspondiente.
- Verificar coincidencia del método HTTP y parámetros.
- Devolver la respuesta configurada con el código HTTP y `Content-Type`.
- Si no hay coincidencia, devolver `404 Not Found`.

### 3. Gestión de Configuraciones

- Ver configuraciones: `GET /configure-mock`
- Eliminar configuración: `DELETE /configure-mock/:id`
- (Opcional) Actualización de configuración

### 4. Variaciones y Lógica Condicional

La configuración debe admitir variaciones en función de los parámetros, por ejemplo:

- Si `usuario=admin`, retornar una respuesta distinta.
- Se valora el uso de lógica condicional y plantillas dinámicas.

---

## Requisitos Técnicos

### Lenguaje y Framework

Puedes usar el lenguaje y framework de tu preferencia:
- Node.js + Express
- Python + Flask / FastAPI
- Otro

### Documentación

Este archivo `README.md` debe incluir:

- Instrucciones de instalación y ejecución
- Ejemplos de configuración y solicitudes (curl)
- Descripción de la arquitectura y decisiones de diseño

### Buenas Prácticas

- Manejo adecuado de errores
- Validación de datos
- Código modular y limpio

### (Opcional) Pruebas Unitarias

Implementar pruebas para demostrar la robustez de tu solución.

### Entrega

- Subir el proyecto a un repositorio público (GitHub, etc.)
- Incluir instrucciones claras para probar la aplicación

---

## Bonus (Opcionales)

Agrega funcionalidades extra que creas que puedan aportar valor adicional a la solución.

---

## Puntos a Evaluar

- **Diseño y Arquitectura:** Claridad en la modularidad y separación de responsabilidades
- **Funcionalidad:** El API debe comportarse según la configuración definida
- **Calidad del Código:** Legibilidad, buenas prácticas, patrones adecuados
- **Documentación y Pruebas:** Claridad y cobertura de pruebas
- **Creatividad y Extensibilidad:** Funcionalidades extra y facilidad para escalar

---

## Uso de herramientas de IA

Describe aquí los *prompts* o consultas que utilizaste con herramientas de IA (como ChatGPT, Gemini, Copilot, etc.) para acelerar el desarrollo.

---

¡Buena suerte y esperamos ver soluciones creativas y robustas!