FROM node:18-alpine

EXPOSE 3000

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

CMD ["yarn", "dev"]