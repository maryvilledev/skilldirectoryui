FROM node:latest

ADD src src
ADD public public
ADD package.json package.json

RUN npm install
RUN npm run build

EXPOSE 9000

CMD "node_modules/pushstate-server/bin/pushstate-server" "build"
