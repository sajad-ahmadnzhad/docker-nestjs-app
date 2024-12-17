FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npx yarn install

COPY . .

EXPOSE 4000:4000

CMD [ "npx", "yarn" , "start:dev" ]