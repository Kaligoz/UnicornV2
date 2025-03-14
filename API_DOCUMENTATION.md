# API Endpoints

# Register Endpoint

**Endpoint URL**

```bash
/auth/register
```

**HTTP Method**

POST

**Request Headers**

```bash
Content_Type: application/json
```

**Request Parameters**

None

**Request Body**

```bash
{
    "username": "string",
    "password": "string"
}
```

**Response**

Success(200)
```bash
{
    "token": "string"
}
```

**Error Responses** 

400 Bad Request: User already exists

```bash
{
    "msg: "User already exists"
}
```

**Example Request**
```bash
curl -X POST https://localhost:5000/auth/register \
-H "Content-Type: application/json" \
-d '{
    "username": "exampleUser",
    "password": "examplePass"
}'
```

**Example Response**
```bash
{
    "token": "your.jwt.token"
}
```

# Login Endpoint

**Endpoint URL**

```bash
auth/login
```

**HTTP Method**

POST

**Request Headers**

```bash
Content_Type: application/json
```

**Request Parameters**

None

**Request Body**

```bash
{
    "username": "string",
    "password": "string"
}
```

**Response**

Success(200)
```bash
{
    "token": "string"
}
```

**Error Responses**

400 Bad Request: Invalid credentials

```bash
{
    "msg: " Invalid credentials"
}
```

**Example Request**
```bash
curl -X POST https://localhost:5000/auth/login \
-H "Content-Type: application/json" \
-d '{
    "username": "exampleUser",
    "password": "examplePass"
}'
```

**Example Response**
```bash
{
    "token": "your.jwt.token"
}
```

# Add Provider Endpoint

**Endpoint URL**

```bash
/providers
```

**HTTP Method**

POST

**Request Headers**

```bash
Content-Type: application/json
```

**Request Parameters**

None

**Request Body**

```bash
{
    "name": "string",
    "country": "string",
    "marketShare": "number",
    "renewablePercentage": "number",
    "yearlyRevenue": "number"
}
```

**Response**

Success(201)
```bash
{
    "_id": "string",
    "name": "string",
    "country": "string",
    "marketShare": "number",
    "renewablePercentage": "number",
    "yearlyRevenue": "number",
    "__v": "number"
}
```

**Error Responses**

500 Internal Server Error

```bash
{
    "success": false,
    "message": "Internal Server Error"
}
```

400 Bad Request

```bash
{
    "success": false,
    "message": "Specific error message"
}
```

**Example Request**
```bash
curl -X POST https://localhost:5000/providers \
-H "Content-Type: application/json" \
-d '{
    "name": "string",
    "country": "string",
    "marketShare": "number",
    "renewablePercentage": "number",
    "yearlyRevenue": "number"
}'
```

**Example Response**
```bash
{
    "_id": "string",
    "name": "string",
    "country": "string",
    "marketShare": "number",
    "renewablePercentage": "number",
    "yearlyRevenue": "number",
    "__v": "number"
}
```

# Delete Provider Endpoint

**Endpoint URL**

```bash
/providers/:id
```

**HTTP Method**

DELETE

**Request Headers**

```bash
Content-Type: application/json
```

**Request Parameters**

Path Parameters:

:id (string): The ID of the provider to be deleted.

**Request Body**

None

**Response**

Success(204)

The response indicates that the provider has been successfully deleted. No content is returned in the response body.

**Error Responses**

500 Internal Server Error

```bash
{
    "success": false,
    "message": "Internal Server Error"
}
```

400 Bad Request

```bash
{
    "success": false,
    "message": "Specific error message"
}
```

**Example Request**
```bash
curl -X POST https://localhost:5000/providers/{providerId} \
-H "Content-Type: application/json" 
```

**Example Response**

Success Response: Status: 204 No Content

Error Response: For example, if the provider with the given ID does not exist, you might get:

```bash
{
    "success": false,
    "message": "Provider not found"
}
```

# Get All Providers Endpoint

**Endpoint URL**

```bash
/providers
```

**HTTP Method**

GET

**Request Headers**

```bash
Content-Type: application/json
```

**Request Parameters**

None

**Request Body**

None

**Response**

Success (200)

```bash
[
    {
        "_id": "string",
        "name": "string",
        "country": "string",
        "marketShare": "number",
        "renewablePercentage": "number",
        "yearlyRevenue": "number"
    },
    ...
]
```

**Error Responses**

500 Internal Server Error

```bash
{
    "success": false,
    "message": "Internal Server Error"
}
```

400 Bad Request

```bash
{
    "success": false,
    "message": "Specific error message"
}
```

**Example Request**
```bash
curl -X GET https://localhost:5000/providers \
-H "Content-Type: application/json" 
```

**Example Response**
```bash
[
    {
        "_id": "string",
        "name": "string",
        "country": "string",
        "marketShare": "number",
        "renewablePercentage": "number",
        "yearlyRevenue": "number",
        "__v": 0
    }
]
```

# Get Provider By ID Endpoint

**Endpoint URL**

```bash
/providers/:id
```

**HTTP Method**

GET

**Request Headers**

```bash
Content-Type: application/json
```

**Request Parameters**

Path Parameters:

:id (string): The ID of the provider to be deleted.

**Request Body**

None

**Response**

Success (200)

```bash
{
    "_id": "string",
    "name": "string",
    "country": "string",
    "marketShare": "number",
    "renewablePercentage": "number",
    "yearlyRevenue": "number"
    "__v": 0
}
```

**Error Responses**

500 Internal Server Error

```bash
{
    "success": false,
    "message": "Internal Server Error"
}
```

400 Bad Request

```bash
{
    "success": false,
    "message": "Specific error message"
}
```

404 Provider not found

```bash
{
    "success": false,
    "message": "Provider not found"
}
```

**Example Request**
```bash
curl -X GET https://localhost:5000/providers/{providerId} \
-H "Content-Type: application/json" 
```

**Example Response**

Success Response:

```bash
{
    "_id": "string",
    "name": "string",
    "country": "string",
    "marketShare": "number",
    "renewablePercentage": "number",
    "yearlyRevenue": "number",
    "__v": 0
}
```

Error Response: If the provider with the given ID does not exist, you might get:

```bash
{
    "success": false,
    "message": "Provider not found"
}
```

# Edit Provider Endpoint

**Endpoint URL**

```bash
/providers/:id
```

**HTTP Method**

PUT

**Request Headers**

```bash
Content-Type: application/json
```

**Request Parameters**

Path Parameters:

:id (string): The ID of the provider to be deleted.

**Request Body**

```bash
{
    "name": "string",
    "country": "string",
    "marketShare": "number",
    "renewablePercentage": "number",
    "yearlyRevenue": "number"
}
```
**Response**

Success (200)

```bash
{
    "_id": "string",
    "name": "string",
    "country": "string",
    "marketShare": "number",
    "renewablePercentage": "number",
    "yearlyRevenue": "number"
    "__v": 0
}
```

**Error Responses**

500 Internal Server Error

```bash
{
    "success": false,
    "message": "Internal Server Error"
}
```

400 Bad Request

```bash
{
    "success": false,
    "message": "Specific error message"
}
```

404 Provider not found

```bash
{
    "success": false,
    "message": "Provider not found"
}
```

**Example Request**
```bash
curl -X GET https://localhost:5000/providers/{providerId} \
-H "Content-Type: application/json" \
-d '{
    "name": "newName",
    "country": "newCountry",
    "marketShare": 25,
    "renewablePercentage": 60,
    "yearlyRevenue": 2000000
}'
```

**Example Response**

Success Response:

```bash
{
    "name": "newName",
    "country": "newCountry",
    "marketShare": 25,
    "renewablePercentage": 60,
    "yearlyRevenue": 2000000
}
```

Error Response: If the provider with the given ID does not exist, you might get:

```bash
{
    "success": false,
    "message": "Provider not found"
}

```
