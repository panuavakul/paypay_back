FROM node:10.15.3-alpine

WORKDIR /usr/local/paypay_back

COPY package*.json ./

RUN npm install

COPY . .

RUN mv ormconfig-docker.json ormconfig.json

EXPOSE 3080

CMD ["npm", "run", "start"]