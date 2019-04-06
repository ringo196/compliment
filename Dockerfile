FROM node:10.14.2
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
EXPOSE 8080
CMD [ "npm", "start" ]