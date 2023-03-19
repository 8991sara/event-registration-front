FROM node:19.6.0-alpine3.16
WORKDIR /app
COPY package.json ./
COPY . .
RUN npm install
CMD ["npm", "run", "start"]
