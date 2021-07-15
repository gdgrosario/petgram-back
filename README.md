# Petgram Backend

## THE pets social network

### (Spanish) Instructions so far

Esta armada la estructura del proyecto con:
* NodeJS
* Mongoose
* Express
* Typescript
* Jest

### Directory structure

/src
  /http  -  Express y endpoints
  /models  -  Database models
/test

### Database

Hay configurada una base de datos mongo con docker, se puede usar al principio hasta
que tengamos una en atlas, los datos se guardan en el directorio .data, cada uno tendría 
su propio set de datos de prueba.
Se puede iniciar con el siguiente comando (requiere docker instalado)

docker compose up -d
ò
npm run db

Y se detiene con 

docker compose down
ò
npm run stop-db

Si tienen mongo instalado tambien lo pueden usar, esto es para no instalar mongo localmente

### Environment

Las variables de entorno utilizadas hasta el momento son:
* DB_URL - URL de la base de datos (default: localhost)
* DB_PORT - Puerto de la base de datos (default: 27017)
* PORT - Puerto de la aplicación (default: 3000)

### VSCode

Yo uso dos espacios de indent, queda guardada esa personalización en la carpeta .vscode
Si alguien prefiere usar 4 o más :( lo charlamos

### TODO

* Agregar los modelos de datos necesarios y empezar a crear los endpoints
* Ver tema test
* Documentar la API (OpenAPI / Swagger)
