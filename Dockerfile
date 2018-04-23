FROM node:8

WORKDIR /usr/src/app

COPY . ${WORKDIR}

# Express server packages
RUN npm install --no-optional --production

WORKDIR /usr/src/app/public

# Frontend packages
RUN npm install --no-optional --production

WORKDIR /usr/src/app

CMD node bin/www.js

