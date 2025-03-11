# 1.Backend Setup
   
1|Open a terminal and navigate to the backend directory.
2|Install dependencies by running:

```bash
pnpm install express mongoose bcrypt jsonwebtoken cors dotenv
```

3|Rename the .env.example file to .env.
4|Generate a custom JWT_SECRET and enter it in the .env file.
5|Use an existing MongoDB database and set its connection string in the .env file:

```bash
MONGO_URI=your_mongodb_connection_string
```

6|Start the backend server by running:

```bash
pnpm run dev
```

7|To verify that the backend is running, visit http://localhost:5000/. You should see the message:

```bash
API is running...
```

# 2.Frontend Setup

1|Open another terminal and navigate to the frontend directory.
2|Install dependencies by running:

```bash
pnpm install axios recharts shadcn-ui @radix-ui/react-toast react-toastify
```

4|Start the frontend by running:

```bash
pnpm run dev
```

5|Visit http://localhost:5173/ to view the project.
