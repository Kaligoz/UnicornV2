# Backend Setup
   
Open a terminal and navigate to the backend directory.

Install dependencies by running:

```bash
pnpm install express mongoose bcrypt jsonwebtoken cors dotenv
```

Rename the .env.example file to .env.

Generate a custom JWT_SECRET and enter it in the .env file.

Use an existing MongoDB database and set its connection string in the .env file:

```bash
MONGO_URI=your_mongodb_connection_string
```

Start the backend server by running:

```bash
pnpm run dev
```

To verify that the backend is running, visit http://localhost:5000/. You should see the message:

```bash
API is running...
```

# Frontend Setup

Open another terminal and navigate to the frontend directory.

Install dependencies by running:

```bash
pnpm install axios recharts shadcn-ui @radix-ui/react-toast react-toastify
```

Start the frontend by running:

```bash
pnpm run dev
```

Visit http://localhost:5173/ to view the project.
