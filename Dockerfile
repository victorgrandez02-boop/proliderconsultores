# Etapa 1: Construcción (Build)
FROM node:20-alpine as build
WORKDIR /app

# Copiar dependencias e instalar
COPY package*.json ./
RUN npm ci

# Copiar el resto del código y construir la aplicación
COPY . .
RUN npm run build

# Etapa 2: Servidor de Producción (Nginx)
FROM nginx:alpine

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estáticos construidos desde la etapa 1
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 (Coolify se encargará del HTTPS/SSL)
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
