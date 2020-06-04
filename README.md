# Ruth [![CircleCI](https://circleci.com/gh/10PinesLabs/ruth.svg?style=svg)](https://circleci.com/gh/10PinesLabs/ruth)
## Applicacion para cosas de roots.

### Desarrollo
1. Instalar `node`. Ver la versión en el archivo `.nvmrc` (o hacer directamente `$ nvm use` y seguir las instruncciones).
1. Instalar las dependencias con `$ npm install`.
1. Levantar la DB con Docker en el directorio /backend con `$ docker-compose up --detach --no-recreate`.
1. Configurar las variables de ambiente del front move el archivo frontend/env.example a frontend/.env
1. Configurar las variables de ambiente del back move el archivo backend/env.example a backend/.env, aun asi hay
   algunar variables de ambiente que son secretas, podes preguntar en #ruth para que otro dev te los pase.
1. Correr las migraciones con `$ npm run migrate`.
1. Correr con `$ npm run start:dev`.  La app en `http://localhost:8761`.

El backend corre en  `8760`.
El frontend corre en  `8761`.

Leer cada `README` para entender más.

Si se esta utilizando vscode, para poder debuggear, es necesario agregar el archivo `launch.json` a la carpeta .vscode

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Attach",
            "port": 9529,
            "skipFiles": [
                "<node_internals>/**"
            ]
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Launch backend NPM",
            "runtimeExecutable": "npm",
            "console": "integratedTerminal",
            "cwd": "${workspaceFolder}/backend",
            "runtimeArgs": [
                "run",
                "start:dev"
            ],
            "port": 9529,
            "sourceMaps": true,
            "restart": true,
            "protocol": "inspector",
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Launch frontend NPM",
            "runtimeExecutable": "npm",
            "cwd": "${workspaceFolder}/backend",
            "runtimeArgs": [
                "run",
                "start:dev"
            ],
            "skipFiles": [
                "<node_internals>/**"
            ]
        }
    ],
    "compounds": [{
        "name": "Ruth",
        "configurations": ["Launch backend NPM", "Launch frontend NPM"]
    }]
}
```
