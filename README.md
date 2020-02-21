# Ruth [![CircleCI](https://circleci.com/gh/10PinesLabs/ruth.svg?style=svg)](https://circleci.com/gh/10PinesLabs/ruth)
## Applicacion para cosas de roots.

### Desarollo
1. Instalar `node`. Ver la versión en el archivo `.nvmrc` (o hacer directamente `$ nvm use` y seguir las instruncciones).
1. Instalar las dependencias con `$ npm install`.
1. Levantar la DB con Docker en el directorio /backend con `$ docker-compose up --detach --no-recreate`.
1. Configurar las variables de ambiente correspondientes en /backend y /frontend. Podés pasar por el channel #Ruth
1. Correr las migraciones con `$ npm run migrate`.
1. Correr con `$ npm run start:dev`.  La app en `http://localhost:8761`.

El backend corre en  `8760`.
El frontend corre en  `8761`.

Leer cada `README` para entender más.
