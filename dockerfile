############################################################

# Stage 1: Compile and Build angular codebase

# Utiliser une image Node.js officielle comme base
FROM  node:16.14.2 AS build
# --platform=$BUILDPLATFORM

# Définir le répertoire de travail dans le conteneur
RUN mkdir /project
WORKDIR /project

# Installer les dépendances
RUN npm install -g @angular/cli@11

# Copier les fichiers package.json et package-lock.json COPY package*.json ./
COPY package.json package-lock.json ./
RUN npm ci

# Copier tout le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Commande pour lancer l'application
# CMD ["ng", "build", "--prod"]
RUN npm run build
# RUN npm run build-dev

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# copy the custom nginx configuration file to the container in the default location
COPY nginx.conf /etc/nginx/nginx.conf

COPY .htaccess /usr/share/nginx/html

# Copy the build output to replace the default nginx contents.
COPY --from=build /project/dist/gdo /usr/share/nginx/html



# Expose port 80
EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"] --no-cache

#docker build -t gdo-front .
#docker tag sm-shop josephaxelad/gdo-front
#docker push josephaxelad/gdo-front
#docker pull josephaxelad/gdo-front
#docker run -d -p 4201:80 josephaxelad/gdo-front
