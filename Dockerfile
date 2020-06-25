### STAGE 1: Build ###
FROM node:alpine AS build
WORKDIR /digital-relay
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build-prod

### STAGE 2: Run ###
FROM nginx:alpine
ARG BUILD_VERSION="Unknown version"
ENV API_URL http://dxcrun-dev-api.azurewebsites.net/api
ENV RACE_DATE "2020-06-20"
ENV PUSH_PUBLIC_KEY ""
ENV DRY_RUN false
ENV DEBUG true
ENV VERSION=$BUILD_VERSION
COPY --from=build /digital-relay/dist/digital-relay /usr/share/nginx/html
COPY --from=build /digital-relay/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
