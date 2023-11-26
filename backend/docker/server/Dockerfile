

FROM node:18-alpine

EXPOSE 3000

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .

COPY yarn.lock .

RUN yarn install

# Bundle app source
COPY . .

CMD [ "yarn", "start:dev" ]