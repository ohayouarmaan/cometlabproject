FROM node:18
WORKDIR /usr/dist/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE $PORT

CMD ["npm", "run", "start"]