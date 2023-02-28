FROM --platform=linux/amd64 node:14

#Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

#Bundle app source
COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]