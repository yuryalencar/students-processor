<br />
<p align="center">
  <h3 align="center">Students Processor: The backend to manage students.</h3>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About Project](#about-project)
- [Starting](#starting)
  - [Configuration](#configuration)
  - [Language Used](#language-used)
  - [How to Use](#how-to-use)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About Project

This project aims to manage students and use a queue to manage process.

## Starting

### Configuration

For configuration you require **Docker, Docker Compose, NodeJS**.

> To use docker do you need run this command:

```
docker-compose up
``` 

> To run in your machine do you need install dependencies:

```
yarn install
``` 

> Comment docker-compose api_and_consumer to not run and up rabbitmq:

```
docker-compose up
``` 

> Configure your env file and run application:

```
yarn start
``` 

### Language used

- Javascript

### How To Use

For test the API, you can use the requests-collection file and import in your insomnia or postman.

## Contributing

Contributions are what make the open source community an incredible place to learn, inspire and create. Any contribution you make will be **much appreciated**.
1. Make a project Fork
2. Create a Branch for your feature (`git checkout -b feature/amazing-feature`)
3. Insert your changes (`git add .`)
4. Make a commit with your changes (`git commit -m 'feat(<teasy-filename>): Inserting a Amazing Feature !`)
5. Push the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

Distributed under the MIT license. See `LICENSE` for more information.

## Contact

Yury Alencar - [Github](https://github.com/yuryalencar) - **yuryalencar19@gmail.com**
