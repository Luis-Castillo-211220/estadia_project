# Proyecto completo en rama -Development
# Estadia Project
Sistema de control de direcciones IP  SSPC

Servidor Backend el cual se encarga de conectar mediante SSH a fortigare para manejo de politicas de internet y control de Ips, esto incluyendo una base de datos para su sincronización y mejor administración.

Requisitos previos para instalación:
- Node Js
- SQL Server 2016
- Uso de Fortigate 900D

Instalación:
El proyecto no contiene el directorio de node_modules, por lo que habra que hacer uso de "npm install", esto usara el archivo package.json, el cual se encagara de usar las dependencias usadas en este proyecto.

Las variables de entorno requeridas son las siguientes (estas deben de estar en raiz en un archivo .env):
- DATABASE: nombre de la base de datos
- USER: nombre de usuario
- PASSWORD: contraseña de la base de datos
- IP_FORTIGATE: ip de donde este alojado el dispositivo de seguridad perimetral
- PORT_FORTIGATE: puerto de fortigate, por defecto es el 22
- USER_FORTIGATE: usuario para fortigate
- PASSWORD_FORTIGATE: contraseña para fortigate

Para ejecutar el proyecto usar el siguiente comando:
- npm run start:dev

Diseño de base de datos:
- https://drive.google.com/file/d/1cLZ3RjPa4WdpjiMINCIMbvuFuklAQi-R/view?usp=drive_link

Documentación de los endpoints en Postman:
- https://documenter.getpostman.com/view/19410025/2sAYJ1jMgU

# Estructura del proyecto.
Para este proyecto se opto por usar la arquitectura hexagonal, la cual permite escalar el proyecto mejor.

carpetas:
- src: donde se contiene el proyecto
- application: dentro de esta se encuentran los casos de uso, los cuales se encargan de conectar la logica de negocio con las solicitudes externas.
- domain: dentro de estas se definen las entidades (con sus atributos + sus relaciones, asi como la creación de sus respectivas tablas en la BD) y los puertos que se encargan de definir los metodos a usar en cada entidad.
- database: adaptadores que se centran en conectarse a la base de datos.
- infraestructure: esta se encarga de realizar la conexión con tecnologias externas, dentro de ella encontramos las subcarpertas de:
  Controladores; se encargan de recibir las solicitudes http asi como generar los objetos de respuesta.
  
  Repository; implementan los puertos (interfaces) y se encargan de interactuar con la base de datos directamente para las distinas operaciones correspondientes.
  
  Routes; estos mapean las solcitides HTTP a sus controladores correspondientes, ademas de generar los endpoints correspondientes.
  
  Dependencies; esta genera las dependencies que la aplicacion necesita, conectado los componentes necesario para el flujo constante de información.
  
  Services; aqui se alojan los servicios externos que requiera la app, en este caso conexión externa mediante SSH.
  
- Index.js: nucleo de la app, la cual permite su ejecución.
