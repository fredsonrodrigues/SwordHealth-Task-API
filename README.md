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

when the services start, you'll need configurate the Prisma
```sh
yarn prod:configure-prisma
```

after this, the application can be used. You can run the tests with
```sh
yarn prod:test
```

## Obs
The application isn't finished as I expected.