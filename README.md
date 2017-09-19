# Demo Express Server

This is a very basic RESTful API server written in NodeJS

## Requirements

- [NodeJS](nodejs.org)
- [Yarn](https://yarnpkg.com/lang/zh-hans/)
  - you can install it by running `$ npm i -g yarn`

## Usage

- Install dependencies: `$ yarn`
- Run the server: `$ yarn start`
  - **this will start the server. the server will listen for clients. there will be no stdout because it is listening for request. this is for running the server, not for testing. if you want to test this server you have to run `$ yarn test`**
- Run the tests: `$ yarn test`
- Generate test coverage report: `$ yarn coverage`
  - the report will be located in `/coverage/`
- Generate code analysis report: `$ yarn code`
  - the report will be located in `/report/`
