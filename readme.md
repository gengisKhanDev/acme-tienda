# Proyecto de Gestor de Inventario

Este proyecto permite gestionar de forma eficaz el inventario de productos en una cadena de tiendas minoristas, proporcionando funcionalidades como la actualización en tiempo real, la administración de pedidos y proveedores, y el control de calidad de productos perecederos.

## Características

- **Gestión en tiempo real:** Actualización continua del inventario en cada tienda, incluyendo detalles como el nombre del producto, número de serie, ubicación en la tienda y cantidad disponible.
- **Gestión de pedidos:** Seguimiento y administración de pedidos de clientes con opciones de entrega y recogida.
- **Gestión de proveedores:** Registro de proveedores con información de productos, precios y condiciones de pago.
- **Actualización de inventario:** Ajustes automáticos tras compras a proveedores.
- **Gestión de devoluciones:** Procesamiento de devoluciones con reembolsos o reemplazos.
- **Control de calidad:** Seguimiento de fechas de caducidad para productos perecederos.

## Tecnologías utilizadas

- **Meteor.js:** Framework principal para el desarrollo de la aplicación.
- **Blaze:** Motor de plantillas utilizado para la interfaz de usuario.
- **MongoDB:** Base de datos NoSQL para almacenar la información de los usuarios y las mascotas.
- **Bootstrap:** Framework CSS para el diseño responsivo.
- **SendGrid (Brevo):** Servicio de envío de correos electrónicos (requiere configuración de API Key).

## Requisitos

- Node.js
- Meteor.js
- MongoDB

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/gengisKhanDev/acme-tienda.git
   cd acme-tienda
   ```

2. Instala Meteor.js (si aún no lo tienes):

   ```bash
   curl https://install.meteor.com/ | sh
   ```

3. Instala las dependencias del proyecto:

   ```bash
   meteor npm install
   ```

4. Configura el archivo `smtp.js` con tu clave API de SendGrid para enviar correos:

   ```javascript
   // smtp.js
   process.env.MAIL_URL =
     "smtps://apikey:<YOUR_SENDGRID_API_KEY>@smtp.sendgrid.net:465";
   ```

5. Inicia la aplicación:

   ```bash
   npm start
   ```

6. Abre tu navegador web y visita `http://localhost:3000` para ver la aplicación en acción.

## Uso

### Creación de Usuario Inicial

Cuando inicias la aplicación por primera vez, se crea un usuario por defecto. Puedes usar este usuario para iniciar sesión y gestionar la aplicación:

- **Correo:** admin@admin.com
- **Contraseña:** holaMundo123


## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
