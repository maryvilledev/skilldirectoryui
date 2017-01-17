FROM node:latest

RUN npm install -g pushstate-server

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


EXPOSE 3000
CMD "/bin/bash ./buildUI"

COPY . /usr/src/app
