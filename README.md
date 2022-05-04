# asw2122_es5a
[![pages-build-deployment](https://github.com/Arquisoft/dede_es5a/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Arquisoft/dede_es5a/actions/workflows/pages/pages-build-deployment)
[![CI for ASW2122](https://github.com/Arquisoft/dede_es5a/actions/workflows/asw2122.yml/badge.svg)](https://github.com/Arquisoft/dede_es5a/actions/workflows/asw2122.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_dede_es5a&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_dede_es5a)
[![codecov](https://codecov.io/gh/Arquisoft/dede_es5a/branch/master/graph/badge.svg?token=bS9nkjfy5q)](https://codecov.io/gh/Arquisoft/dede_es5a)

### Tecnologías utilizadas:

<p float="left">
<img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img src="https://miro.medium.com/max/1200/0*RbmfNyhuBb8G3LWh.png" height="100">
<img src="https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png" height="100">
</p>

### ArquiSocks: la mayor variedad de calcetines. Disponible tanto en Heroku como en Azure. Se puede acceder tanto en este [readme](https://github.com/Arquisoft/dede_es5a/edit/master/README.md#despliegue) a los enlaces web como en la sección about del repositorio del proyecto. 😉 

![image](https://user-images.githubusercontent.com/79643267/166711671-a928fcb4-143a-4589-8df8-3c88000b502f.png)
 


## Miembros del equipo
Diego González Suárez - UO276406  
Alonso Álvarez Díaz-Ordóñez - UO270262  
Sofía Yiyu Qiu - UO277360  
Gaspar Pisa Eyaralar - UO250825  
María Urrutia Fernández - UO251282

## Despliegue
Nuestra propuesta de tienda virtual está desplegada tanto en Azure como en Heroku con el objetivo de incrementar la disponibilidad de la misma. Los enlaces son los siguientes:
- [Heroku](https://dede-es5a.herokuapp.com/)
- [Azure](http://20.228.137.74:3000)  

En caso de que alguno de los servicios no esté disponile. Póngase en contacto con nosotros y lo solucionaremos :)

## Tests de carga usando gatling
Se pueden ver los resultados de los tests de carga en la wiki del proyecto. Haciendo click [aquí](https://github.com/Arquisoft/dede_es5a/wiki/Tests-de-carga-usando-gatling).
También están disponibles los resultados de las dos prueas realizadas en los siguientes enlaces.
- [P1](https://uo276406.github.io/ArquisocksLoadTests/p1-20220429155339720/)
- [P2](https://uo276406.github.io/ArquisocksLoadTests/p2-20220429163850305/)

## Guia de inicio rápido

<mark>Si tienes instalados node.js y npm, asegurate de actualizarlos antes de intentar construir las imagenes</mark>

Si quieres ejecutar el proyecto necesitarás [git](https://git-scm.com/downloads), [Node.js and npm](https://www.npmjs.com/get-npm) y [Docker](https://docs.docker.com/get-docker/). Asegurate de tenerlos instalados en tu equipo. Descarga el proyecto con `git clone https://github.com/Arquisoft/dede_es5a`. La manera más rápìda de ejecutar todo es con Docker.

```bash
docker-compose up --build
```
Este comando creará dos imagenes de docker si no existen en tu equipo (la webapp y la restapi) y lanzará un contenedor de mongoDB. Además lanzará contenedores de Prometheus y Grafana para monitorizar el servicio web. Deberias ser capaz de acceder a todo desde aqui:

 - [Webapp - http://localhost:3000](http://localhost:3000)
 - [Ejemplo llamada a RestApi - http://localhost:5000/api/users/list](http://localhost:5000/api/users/list)
 - [Metricas RestApi - http://localhost:5000/metrics](http://localhost:5000/metrics)
 - [Servidor Prometheus - http://localhost:9090](http://localhost:9090)
 - [Servidor Grafana http://localhost:9091](http://localhost:9091)
 
Si quieres ejecutar el proyecto sin Docker primero complila y ejecuta la restapi:

```shell
cd restapi
npm install
npm start
```
a continuación la webapp:
```shell
cd webapp
npm install
npm start
```

Deberias ser capaz de acceder a la aplicación en [http://localhost:3000](http://localhost:3000).

## Mas información
Encontrarás más información sobre el repositorio en los otros archivos README:
- Documentación: https://github.com/Arquisoft/dede_es5a/tree/master/docs
- Webapp: https://github.com/Arquisoft/dede_es5a/tree/master/webapp
- Restapi: https://github.com/Arquisoft/dede_es5a/tree/master/restapi
