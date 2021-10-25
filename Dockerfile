FROM node:14

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install

ENV NODE_ENV=dev

CMD [ "npm", "start" ]
