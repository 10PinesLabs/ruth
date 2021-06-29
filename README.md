# Ruth [![CircleCI](https://circleci.com/gh/10PinesLabs/ruth.svg?style=svg)](https://circleci.com/gh/10PinesLabs/ruth)
## Applicacion para cosas de roots.

### Desarrollo
1. Instalar `node`. Ver la versión en el archivo `.nvmrc` (o hacer directamente `$ nvm use` y seguir las instruncciones).
1. Instalar las dependencias con `$ npm install`.
1. Levantar el backend (ver [README del backend](./backend/README.md))
1. Levantar el frontend (ver [README del frontend](./frontend/README.md))

El backend corre en  `8760`.
El frontend corre en  `8761`.

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
