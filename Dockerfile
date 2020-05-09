### STAGE 1: Build ###
FROM node:alpine AS build
WORKDIR /digital-relay
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build-prod

### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build /digital-relay/dist/digital-relay /usr/share/nginx/html
EXPOSE 80
