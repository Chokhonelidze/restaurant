FROM node:slim

ENV PORT 5000

WORKDIR /app

COPY package.json /app/package.json

RUN npm install 

COPY . .

EXPOSE 5000

CMD "npm" "run" "dev"