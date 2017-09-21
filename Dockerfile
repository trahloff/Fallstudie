FROM node:8.0.0-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

# Install Packages & Build Frontend
RUN yarn

# Clean Up
RUN yarn clean

EXPOSE 80

CMD [ "yarn", "start" ]
