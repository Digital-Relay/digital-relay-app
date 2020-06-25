# DigitalRelay - DXC RUN 4U

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.3.

## Docker
The application is prepared to run in a [Docker](https://www.docker.com/) container. To start the application in Docker, run:
```
docker run --name digital-relay digitalrelay/digital-relay-client:latest
```
This runs the app with default configuration. For the app to work properly, some additional configuration of [environment variables](https://docs.docker.com/engine/reference/run/#env-environment-variables) might be necessary.

The application is served by [nginx](https://www.nginx.com/) running in the container. To configure nginx, edit `default.conf`.

### Environment variables
This is a full list of environment variables used by the container.

|Variable name|Description|Default value|
|-------------|-----------|-------------|
|`API_URL`| Location of [API](https://github.com/Digital-Relay/digital-relay-server) root. | `http://dxcrun-dev-api.azurewebsites.net/api`
|`RACE_DATE`| Date of the race start, in `YYYY-MM-DD` format. | `2020-06-20`
|`PUSH_PUBLIC_KEY`| Public VAPID key for push notifications. | 
|`DRY_RUN`| Flag to run the app in dry run mode, enabling features that should only be enabled on race day. **Caution:** Server should be prepared for the dry run separately (database backup) To enable dry run, set this to `true` | `false`.
|`VERSION`| Version of the app displayed on the *about* page. Useful for checking whether new version has been deployed correctly. |Set at build time by the `BUILD_VERSION` argument.

#### Build argument
- `BUILD_VERSION` - App version to be shown in *about* page. Usually set by GitHub Release pipeline to match the release version.

#### Port
Application runs on the port *80*, exposed by the container.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
