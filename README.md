# DHIS2 Advanced Metadata Export App

This advanced export app allows the user to create packages of metadata with all the required  dependencies for a successful import.

## Prepare the environment

All the required dependencies to develop the app can be achieved through yarn.

```
yarn install
```

## Start a development server

- Create .env file with the following content

```
REACT_APP_DHIS2_BASE_URL=http://who-dev.essi.upc.edu:8081
```

- Launch Chrome with CORS disabled

https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome

## Build

```
$ yarn build-webapp
```

## i18n

### Update an existing language

```
$ yarn update-po
# ... add/edit translations in po files ...
$ yarn localize
```

### Create a new language

```
$ cp i18n/en.pot i18n/es.po
# ... add translations to i18n/es.po ...
$ yarn localize
```
