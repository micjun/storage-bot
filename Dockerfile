FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies -> copy both package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "run", "dev"]