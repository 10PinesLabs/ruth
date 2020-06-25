# Backend

## Desarollo
1. Instalar `node`. Ver la versión en el archivo `.nvmrc` (o hacer directamente `$ nvm use` y seguir las instruncciones).
1. Instalar las dependencias con `$ npm install`.
1. Tener mongo (ver "base de datos en docker")
1. Correr con `$ npm run start:dev`.

`start:dev` corre el servidor en el puerto `8760`, y levanta un inspector en el puerto `9529`. Tiene hot reload.

### Scafolding
Como tenemos `sequalize-cli` podemos crear modelos _a la rails_:
`$ npm run sequelize -- model:generate --name Reunion --attributes abierta:boolean`

### Base de datos en docker
Si tienen docker, pueden levantar la base de datos haciendo: `$ dcompose up -d --no-recreate`.

### mensajes
Si se setea MESSAGE_TESTING a true los mensajes de slack seran redirigidos a #ruth-dev, si no se enviaran como dm
### TODO
- proxy frontned