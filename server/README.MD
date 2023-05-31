# TestApi

Este proyecto es una API desarrollada con Node.js y el framework Express.js. Proporciona diferentes rutas para gestionar posts, incluyendo la capacidad de listar, encontrar por ID, crear, editar y eliminar posts. Además, se ha implementado un mecanismo de autenticación para proteger las rutas relacionadas con posts.

La documentación de la API se generó Automaticamente utilizando Swagger y está disponible en `http://localhost:{puerto}/docs`, donde `{puerto}` es el número de puerto en el que se ejecuta la API.

## Instalación

- Clona el repositorio en tu máquina local:

```
git clone https://github.com/alex2rive3/TestApi.git
```

- Ve al directorio del proyecto:

```
cd TestApi
```

- Instala las dependencias:

```
npm install
```

## Configuración

Antes de ejecutar la API, asegúrate de configurar las variables de entorno necesarias. Renombra el archivo .env copy a .env y define las siguientes variables:

- PORT
- URL_BASE
- KEY_SECRET
- LOCAL_HOST

## Uso

Para ejecutar la API, utiliza el siguiente comando:

```
npm start
```

Para generar solo la documentacion ejecutar el comando:

```
npm run swagger-autogen
```

## Endpoints

A continuación se detallan los endpoints disponibles:

### Rutas de Autenticación

- **POST api/posts/login**: Permite autenticarse y obtener un token JWT válido.
- **POST api/posts/logout**: Cierra la sesión y revoca el token JWT.

### Rutas de Posts

Todas las rutas relacionadas con posts están protegidas y requieren autenticación con un token JWT válido.

- **GET /api/posts/** : Obtiene la lista de todos los posts.
- **GET /api/posts/:id**: Obtiene un post por su ID.
- **POST /api/posts/create**: Crea un nuevo post.
- **PATCH /api/posts/paching/:id**: Actualiza ciertos campos de un post existente por su ID.
- **PUT /api/posts/update/:id**: Actualiza un post existente por su ID.
- **DELETE /api/posts/delete/:id**: Elimina un post existente por su ID.

## Documentación

La documentación completa de la API se encuentra disponible en `http://localhost:{puerto}/docs`. Puedes acceder a esta URL en tu navegador para explorar los endpoints, ver los esquemas de datos y probar los diferentes métodos de la API.

## Contribución

Si deseas contribuir a este proyecto, siéntete libre de hacerlo. Puedes enviar pull requests para sugerir mejoras, correcciones de errores o nuevas características.
