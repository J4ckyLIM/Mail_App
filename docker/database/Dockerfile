
FROM postgres:12-alpine

# Copy the .env file
COPY .env /app/.env

# Install Node.js and the Prisma CLI
RUN apk add --update nodejs yarn
RUN yarn global add prisma

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Run database migrations
COPY . .
RUN yarn run prisma migrate dev

# # Set the PostgreSQL data directory as a volume
# VOLUME /var/lib/postgresql/data

EXPOSE 5432
CMD ["npm", "start"]