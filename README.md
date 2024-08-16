<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Text Analyzer by Sajib
# Setup:
- run ```npm install && npm run start:dev``` on the root directory
- and use a ```.env``` file for `PORT` `JWT_SECRET_KEY` `JWT_EXPIRE_LIMIT` `MONGODB_URI` Value on the root directory, for reference you can refer to `example.env` file

# API Endpoints:
- swagger is on so you can see all the API Endpoints in one place, check your terminal its showing "App Started on http://localhost:PORT/api"
- text analyzing APIs guard protected, you can creat account using username and password for which API Endpoint is there

# GUI Interface
- if you don't want to test api using swagger or postman then you just hit http://localhost:PORT/api/ui this route, there is a simple gui interface using ejs

# Test Code
- proper test code is written, for mock testing run `npm run test:watch`
- for e2e testing run `npm run test:e2e`