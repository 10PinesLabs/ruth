# Backend

## Desarollo
1. Instalar `node`. Ver la versión en el archivo `.nvmrc` (o hacer directamente `$ nvm use` y seguir las instruncciones).
1. Instalar las dependencias con `$ npm install`.
1. Tener postgress (ver "base de datos en docker").
1. Pedirle el `.env` a otre desarollader :)
1. Correr con `$ npm run start:dev`.

`start:dev` corre el servidor en el puerto `8760`, y levanta un inspector en el puerto `9529`. Tiene hot reload.

### Scafolding
Como tenemos `sequalize-cli` podemos crear modelos _a la rails_:
`$ npm run sequelize -- model:generate --name Reunion --attributes abierta:boolean`

### Base de datos en docker
Si tienen docker, pueden levantar la base de datos haciendo: `$ docker-compose up -d --no-recreate`.

#### Instalar Base de datos en Ubuntu
1. `sudo apt install postgresql`
1. `sudo su postgres` (esto cambia el ususario)
1. `psql`
1. `create user pino superuser;`
1. Editar `sudo vim /etc/postgresql/9.4/main/pg_hba.conf`
1. `$ createdb ruth`

