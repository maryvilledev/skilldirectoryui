FROM node:6.3.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


EXPOSE 3000
CMD "/bin/bash ./buildUI"

COPY . /usr/src/app
