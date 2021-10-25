FROM node:14

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install

ENV NODE_ENV=dev
#ENV WAIT_VERSION 2.7.2
#
#ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
#RUN chmod +x /wait
#
#CMD ["/sayhello"]
CMD [ "npm", "start" ]
