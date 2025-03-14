# API Endpoints

# Register Endpoint

Endpoint URL

```bash
/register
```

HTTP Method

POST

Request Headers

```bash
Content_Type: application/json
```

Request Parameters

None

Request Body

```bash
{
    "username": "string",
    "password": "string"
}
```

Response

Success(200)
```bash
{
    "token": "string"
}
```

Error Responses 

400 Bad Request: User already exists

```bash
{
    "msg: "User already exists"
}
```

Example Request
```bash
POST localhost:5000/auth/register \
-H "Content-Type: application/json" \
-d '{
    "username": "exampleUser",
    "password": "examplePass"
}'
```

Example Response
```bash
{
    "token": "your.jwt.token"
}
```

# Login Endpoint

Endpoint URL

```bash
/login
```

HTTP Method

POST

Request Headers

```bash
Content_Type: application/json
```

Request Parameters

None

Request Body

```bash
{
    "username": "string",
    "password": "string"
}
```

Response

Success(200)
```bash
{
    "token": "string"
}
```

Error Responses 

400 Bad Request: Invalid credentials

```bash
{
    "msg: " Invalid credentials"
}
```

Example Request
```bash
POST localhost:5000/auth/login \
-H "Content-Type: application/json" \
-d '{
    "username": "exampleUser",
    "password": "examplePass"
}'
```

Example Response
```bash
{
    "token": "your.jwt.token"
}
```
