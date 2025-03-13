# Backend Setup
   
Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Install dependencies by running:

```bash
pnpm install
```

Rename the .env.example file to .env

Generate a custom JWTSECRET and enter it in the .env file:

```bash
JWTSECRET=your_jwtsecret_custom_key
```

Use an existing MongoDB database and set its connection string in the .env file:

```bash
MONGO_URI=your_mongodb_connection_string
```

Start the backend server by running:

```bash
pnpm run dev
```

To verify that the backend is running, visit http://localhost:5000/ You should see the message:

```bash
API is running...
```

# Frontend Setup

Open another terminal and navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies by running:

```bash
pnpm install
```

Start the frontend by running:

```bash
pnpm run dev
```

Visit http://localhost:5173/ to view the project.
