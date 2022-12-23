FROM node:latest AS development

WORKDIR /src

COPY package*.json ./

COPY . .

COPY .eslintrc.js nest-cli.json tsconfig.json tsconfig.build.json ./

RUN npm install

RUN npm run build
