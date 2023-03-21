# SwordHealth Task API

This api are builded for a test.

# How to run

First, you'll need install the packages.

```sh
yarn 
```

then, you'll build the docker image.

```sh
yarn build:docker
```

later, you will up the services

```sh
docker-compose up -d
```

If you are starting for the first time, the you should create the database and seed
```sh
yarn prod:configure-app
```

after this, the application is ready to use. You can run the tests with
```sh
yarn prod:test
```

## Obs
The .env is in the project just to make tests more easier.