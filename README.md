
<img src="icon.png" align="right" />

# Wallet Engine [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/abduljeleelng/wallet-engine#readme)
> wallet-engine API Services, 
# Technology used
*  Nodejs, 
* Express, 
* MySQL 
* Sequelise ORM 
* Sequelise-cli e.t.c

# Basic guide

## Installation

You will need [NodeJS](https://nodejs.org/) and [MYSQL](https://www.mysql.com/), <br /> Clone the repo and install the dependencies.
```bash
git clone https://github.com/abduljeleelng/wallet-engine.git
```
Install the dependencies 

```bash
npm i
```
# set your environmental variable 
```bash
# create .env file, 
# copy data in .env.example to .env file created
# set the values for the variables
```
> Database services configuration 
```bash
# create Database if not exist 
npm run db:create
```
```bash
# Drop database services 
npm run db:drop
```
```bash
# Run migration 
npm run db:migration 
```
```bash
# Seed demo data 
npm run db:seed
```

Run the development version of the App 

```bash
npm run dev
```

Rebuild documentation

```bash
npm run docs
```

Run Automated test 

```
npm run test
```

Start the application in production

```bash
npm start
```

## Live Endpoint 
[API services endpoint](https://abduljeleelng-wallet-engine.herokuapp.com/)

## Documentation
[Documentation](https://abduljeleelng-wallet-engine.herokuapp.com/)

## Contact Me
[Abduljeleel](mailto:abduljeleelng@gmail.com) | email abduljeleelng@gmail.com