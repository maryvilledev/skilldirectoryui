FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /tmp/package.json
RUN cd /tmp && npm install --only=prod
RUN npm install -g pushstate-server

RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
COPY . /opt/app

EXPOSE 3000
CMD "/bin/bash ./buildUI"
