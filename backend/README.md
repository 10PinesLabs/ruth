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

#### Mails
#####Produccion
En produccion, las variables de ambiente relacionadas a los mails deben quedar de esta manera:
```
MAIL_HOST=smtp.gmail.com,
MAIL_PORT=465,
```
Ademas de las variables relacionadas a usuario, contraseña, destinatarios, que tendras que pedirlas en el channel de #ruth

#####Local
En local, para poder verificar como se estan enviando de mails, podes settear las variables de ambiente del backend siguiendo el .example, utilizando una direccion de correo de Ethereal Mail:
1. Ir a `https://ethereal.email/` y crear una cuenta (lleva un solo click)
1. Settear las variables de entorno de la siguiente forma:
```
MAIL_HOST=smtp.ethereal.email,
MAIL_PORT=587,
MAIL_USER= (el dado por Ethereal)
MAIL_PASS= (el dado por Ethereal)
```
Tanto el destino (`MAIL_DESTINATION`) como la direccion de envio (`MAIL_SENDER_ADRESS`) son indistintas, porque todo es capturado por Ethereal.
1. Al cerrar una reunion, lo veras en la cuenta de Ethereal ingresada

### mensajes
Si se setea MESSAGE_TESTING a true los mensajes de slack seran redirigidos a #ruth-dev, si no se enviaran como dm
### TODO
- proxy frontned