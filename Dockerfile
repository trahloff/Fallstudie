FROM node:8.0.0-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

# Install Packages & Build Frontend
RUN npm run build

# Clean Up
RUN yarn clean

EXPOSE 8082

CMD [ "npm", "start" ]
