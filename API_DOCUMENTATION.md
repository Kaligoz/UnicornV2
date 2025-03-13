# Get All Providers

Endpoint: GET /providers

Description: Fetches a list of all electricity providers.

Request Parameters: None

Response:

```bash
[
  {
    "id": "1",
    "name": "Provider A",
    "country": "Germany",
    "marketShare": 15.5,
    "renewablePercentage": 70,
    "yearlyRevenue": 5000000
  },
  {
    "id": "2",
    "name": "Provider B",
    "country": "France",
    "marketShare": 10,
    "renewablePercentage": 60,
    "yearlyRevenue": 4000000
  }
]
```

# Get Provider by ID

Endpoint: GET /providers/{id}

Description: Fetches a single electricity provider by its ID.

Request Parameters:

id (string, required) – The unique identifier of the provider.

Response:

```bash
{
  "id": "1",
  "name": "Provider A",
  "country": "Germany",
  "marketShare": 15.5,
  "renewablePercentage": 70,
  "yearlyRevenue": 5000000
}
```

# Add a New Provider

Endpoint: POST /providers

Description: Adds a new electricity provider to the database.

Request Body:

```bash
{
  "name": "Provider C",
  "country": "Spain",
  "marketShare": 12.5,
  "renewablePercentage": 80,
  "yearlyRevenue": 6000000
}
```

Response:

```bash
{
  "id": "3",
  "name": "Provider C",
  "country": "Spain",
  "marketShare": 12.5,
  "renewablePercentage": 80,
  "yearlyRevenue": 6000000
}
```

# Update an Existing Provider

Endpoint: PUT /providers/{id}

Description: Updates an existing electricity provider's details.

Request Parameters:

id (string, required) – The unique identifier of the provider.

Request Body:

```bash
{
  "name": "Updated Provider A",
  "country": "Germany",
  "marketShare": 16.0,
  "renewablePercentage": 75,
  "yearlyRevenue": 5500000
}

Response:

{
  "id": "1",
  "name": "Updated Provider A",
  "country": "Germany",
  "marketShare": 16.0,
  "renewablePercentage": 75,
  "yearlyRevenue": 5500000
}
```

# Delete a Provider

Endpoint: DELETE /providers/{id}

Description: Deletes an electricity provider by its ID.

Request Parameters:

id (string, required) – The unique identifier of the provider.

Response:

Status Code: 204 No Content (if successful)

Status Code: 404 Not Found (if provider does not exist)
