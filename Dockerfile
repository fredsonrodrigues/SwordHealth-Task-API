FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000

RUN npx prisma generate

RUN yarn test

CMD [ "yarn", "start" ]
