# Overview
This is a demo Supervisor management notification module application. Users can view a list of supervisors as well as create new supervisors.

# Running with docker
Start with docker-compose
```
docker-compose build
```

```
docker-compose up
```

# Frontend

Access the front end of the site at http://localhost:8080. User can view a list of the supervisors and also create a new supervisor by hitting 'New Supervisor.' Built with Vue.js.

<img width="669" alt="image" src="https://user-images.githubusercontent.com/37814424/167231892-32530931-f281-4f31-9c44-7479d3561e5b.png">

# API

The backend is built with Express. There are two endpoints at http://localhost:3000/

## Get List of Supervisors

### Request

`GET /api/supervisors`

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    [
      {
          "id": "26",
          "phone": "(614) 469-7214 x5928",
          "jurisdiction": "0",
          "identificationNumber": "549f1832-d1df-4e22-845e-5adc2d39c73b",
          "firstName": "Jaren",
          "lastName": "Hickle"
      },
      ...
    ]
    

## Create Supervisors

### Request

`POST /api/submit`
{
  "firstName": "John",
  "firstName": "Doe",
  "phone": "1112223333",
  "email": "john.doe@gmail.com",
  "supervisor": "Albert Einstein"
}

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
      "firstName": "John",
      "firstName": "Doe",
      "phone": "1112223333",
      "email": "john.doe@gmail.com",
      "supervisor": "Albert Einstein"
    }
