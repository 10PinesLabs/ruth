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
MAILGUN_SMTP_SERVER=smtp.gmail.com,
MAILGUN_SMTP_PORT=465,
```
Ademas, las variables `MAILGUN_SMTP_LOGIN` Y `MAILGUN_SMTP_PASSWORD`, que son las credenciales del mail que usaremos, `MAIL_DESTINATION`, a que direccion de mail se quiere mandar el resumen, y `MAIL_SENDER_ADDRESS`, que es la direccion que aparecerá como remitente, que son privadas y habra que pedirlas en #ruth.

#####Local
En local, para poder verificar como se estan enviando de mails, podes settear las variables de ambiente del backend siguiendo el .example, utilizando una direccion de correo de Ethereal Mail:
1. Ir a `https://ethereal.email/` y crear una cuenta (lleva un solo click)
1. Settear las variables de entorno de la siguiente forma:
```
MAILGUN_SMTP_SERVER=smtp.ethereal.email,
MAILGUN_SMTP_PORT=587,
MAILGUN_SMTP_LOGIN= (el dado por Ethereal)
MAILGUN_SMTP_PASSWORD= (el dado por Ethereal)
```
Tanto el destino (`MAIL_DESTINATION`) como la direccion de envio (`MAIL_SENDER_ADRESS`) son indistintas, porque todo es capturado por Ethereal.
1. Al cerrar una reunion, lo veras en la cuenta de Ethereal ingresada

### mensajes
Si se setea MESSAGE_TESTING a true los mensajes de slack seran redirigidos a #ruth-dev, si no se enviaran como dm
### TODO
- proxy frontned
