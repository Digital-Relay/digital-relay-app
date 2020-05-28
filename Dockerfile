### STAGE 1: Build ###
FROM node:alpine AS build
### buildType: prod or staging - difference: API URL
ARG buildType=prod
WORKDIR /digital-relay
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build-$buildType

### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build /digital-relay/dist/digital-relay /usr/share/nginx/html
COPY --from=build /digital-relay/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
