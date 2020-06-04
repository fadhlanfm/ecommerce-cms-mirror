# Server side of E-Commerce CMS App:
- RESTful endpoint for asset's CRUD operation
- Return JSON formatted response
- Tech stack: node.js, express, postgres, sequelize, bcrypt, cors, jsonwebtoken

## REST endpoint
- [POST users/register](#post-register)
- [POST users/login](#post-login)
- [POST /products](#post-products)
- [GET /products](#get-products)
- [PUT /products/:id](#put-productsid)
- [DELETE /products/:id](#delete-productsid)
---

> ## POST /users/register

Register a new account

### Requests

#### _Header_
```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

#### _Body_
```json
{
  "email": "admin@admin.com",
  "password": "<your password>",
  "role": "Admin" || "User"
}
```

### Responses

#### _Status 201 Created_
```json
{
  "id": 1,
  "email": "admin@admin.com",
  "password": "hashedPassword",
  "role": "Admin",
  "createdAt": 2020-03-03T15:01:27.405Z,
  "updatedAt": 2020-03-03T15:01:27.405Z
}
```

#### _Status 400 Bad Request_
```json
{
  "status": 400,
  "msg": array of error messages
}
```

#### _Status 500 Internal Server Error_
```json
{
  "status": 500,
  "msg": "Internal server error"
}
```

> ## POST /users/login

Login an account

### Requests

#### _Header_
```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

#### _Body_
```json
{
  "email": "<your email>",
  "password": "<your password>"
}
```

### Responses

#### _Status 200 OK_
```json
{
  "token": "<your access token>"
}
```

#### _Status 400 Bad Request_
```json
{
  "status": 400,
  "msg": array of error messages
}
```

#### _Status 500 Internal Server Error_
```json
{
  "status": 500,
  "msg": "Internal server error"
}
```

> ## POST /products

Create a new product

### Requests

#### _Header_
```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "token": "<your access token>"
}
```

#### _Body_
```json
{
    "name": string,
    "image_url": string,
    "price": greater than 0 integer,
    "stock": greater than 0 integer
}
```

### Responses

#### _Status 201 Created_
```json
{
  "id": 1,
  "name": "<product name>",
  "image_url": "<image url>",
  "price": 9999,
  "stock": 9999,
  "updatedAt": "2020-05-08T10:09:35.368Z",
  "createdAt": "2020-05-08T10:09:35.368Z"
}
```

#### _Status 400 Bad Request_
```json
{
  "status": 400,
  "msg": array of error messages
}
```

#### _Status 403 Forbidden_
```json
{
  "status": 403,
  "msg": "You Have to login first"
}
```

#### _Status 500 Internal Server Error_
```json
{
  "status": 500,
  "msg": "Internal server error"
}
```

> ## GET /products

Get all products

### Requests

#### _Header_
```json
{
  "token": "<your access token>"
}
```

#### _Body_
```json
not needed
```

### Responses

#### _Status 200 OK_
```json
[
  {
    "id": 1,
    "name": "<product name>",
    "image_url": "<image url>",
    "price": 9999,
    "stock": 9999,
    "updatedAt": "2020-05-08T10:09:35.368Z",
    "createdAt": "2020-05-08T10:09:35.368Z"
  },
  {
    "id": 2,
    "name": "<product name>",
    "image_url": "<image url>",
    "price": 9999,
    "stock": 9999,
    "updatedAt": "2020-05-08T10:09:35.368Z",
    "createdAt": "2020-05-08T10:09:35.368Z"
  },
  {
    "id": 3,
    "name": "<product name>",
    "image_url": "<image url>",
    "price": 9999,
    "stock": 9999,
    "updatedAt": "2020-05-08T10:09:35.368Z",
    "createdAt": "2020-05-08T10:09:35.368Z"
  }
]
```

#### _Status 403 Forbidden_
```json
{
  "status": 403,
  "msg": "You Have to login first"
}
```

#### _Status 500 Internal Server Error_
```json
{
  "status": 500,
  "msg": "Internal server error"
}
```

> ## PUT /products/:id

Update a products

### Requests

#### _Header_
```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "token": "<your access token>"
}
```

#### _Body_
Choose the item property(s) that you want to update
```json
{
  "name": string,
  "image_url": string,
  "price": greater than 0 integer,
  "stock": greater than 0 integer
}
```

#### _Parameters_
| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### _Status 200 OK_
```json
{
  "id": 1,
  "name": "<product name>",
  "image_url": "<image url>",
  "price": 9999,
  "stock": 9999,
  "updatedAt": "2020-05-08T10:09:35.368Z",
  "createdAt": "2020-05-08T10:09:35.368Z"
}
```

#### _Status 404 Not Found_
```json
{
  "status": 403,
  "msg": "Error not found"
}
```

#### _Status 400 Bad Request_
```json
{
  "status": 400,
  "msg": array of error messages
}
```

#### _Status 403 Forbidden_
```json
{
  "status": 403,
  "msg": "You are forbidden to do that"
}
```

#### _Status 401 Unauthorized_
```json
{
  "status": 401,
  "msg": "You Have to login first"
}
```

#### _Status 500 Internal Server Error_
```json
{
  "status": 500,
  "msg": "Internal server error"
}
```

> ## DELETE /products/:id

Delete a products

### Requests

#### _Header_
```json
{
  "token": "<your access token>"
}
```

#### _Body_
```json
not needed
```

#### _Parameters_
| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### _Status 200 OK_
```json
{
  "message": "Your data has been deleted"
}
```

#### _Status 404 Not Found_
```json
{
  "status": 403,
  "msg": "Error not found"
}
```

#### _Status 403 Forbidden_
```json
{
  "status": 403,
  "msg": "You are forbidden to do that"
}
```

#### _Status 401 Unauthorized_
```json
{
  "status": 401,
  "msg": "You Have to login first"
}
```

#### _Status 500 Internal Server Error_
```json
{
  "status": 500,
  "msg": "Internal server error"
}
```