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

Proyecto completo en rama -Development
