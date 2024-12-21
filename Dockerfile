FROM node:alpine

RUN addgroup -g 1001 nest
RUN adduser -D -u 1001 -G nest docker

WORKDIR /app

COPY package*.json ./

RUN  chown -R docker:nest /app

USER docker
RUN npx yarn install

COPY . .

EXPOSE 4000:4000

CMD [ "npx", "yarn" , "start:dev" ]