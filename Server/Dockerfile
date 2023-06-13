FROM node:14.21.3

# Install MongoDB client tools
RUN apt-get update && apt-get install -y mongo-tools

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
