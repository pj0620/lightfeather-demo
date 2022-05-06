FROM node:alpine
MAINTAINER daniel@lightfeather.io
EXPOSE 3000
WORKDIR /home/node
COPY package.json .
RUN npm install
COPY *.js .
ENTRYPOINT ["node", "index.js"]
