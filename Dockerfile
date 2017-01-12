FROM node

RUN mkdir -p /app
WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

# We add package.json first so that the  docker image build
# can use the cache as long as contents of package.json
# hasn't changed.

COPY package.json /app
RUN npm install --ignore-scripts --unsafe-perm --production

COPY . /app/

EXPOSE 3000
CMD "/bin/bash ./buildUI"
