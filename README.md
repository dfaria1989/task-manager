## Installation

```bash
$ npm install
```

## Running the app

```bash
$ docker compose up
```

## Endpoints

```bash
# Authentication
# Using HttpOnly

$ POST http://localhost:3000/auth/login
# Technician
{
    "username": "arnaldo",
    "password": "123456789"
}
# Manager
{
    "username": "josh",
    "password": "123456789"
}
```
```bash
# Creating new task
$ POST http://localhost:3000/auth/login
{
    "name": "Button Login",
    "summary": "Add button to login"
}
```
```bash
# Retrieve all tasks
$ GET http://localhost:3000/tasks
```
```bash
# Update status to "finalize"
$ PATCH http://localhost:3000/tasks/1
{
    "status": "finished"
}
```


## Running the tests

```bash
$ npm run test
```