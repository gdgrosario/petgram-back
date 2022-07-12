FROM node:16-alpine as builder

ENV NODE_ENV build


USER node

WORKING /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]

