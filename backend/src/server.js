const dotenv = require("dotenv");
const path = require("path");

console.log('ran server.js');
// Load environment variables from .env file
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const app = require("./app");
const connectDB = require("./config/db");
const Login = require("./models/auth");

const seedAdmin = async () => {
  await Login.findOneAndUpdate(
    { email: "admin@admin.com", role: "admin" },
    { email: "admin@admin.com", password: "admin", role: "admin" },
    { upsert: true, new: true }
  );
  console.log("Admin seeded");
};

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();

    // Start listening only after MongoDB is connected.
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);

      console.log("Available Routes:");
      console.log("============HOME====================");
      console.log(`http://localhost:${PORT}`);

      console.log(`

--Health Check Route (to check if server is running)			
GET http://localhost:${PORT}/health 	

--Get all Customers
GET http://localhost:${PORT}/admin/ 


--Create Customer
POST http://localhost:${PORT}/admin/ 
{
  "name": "Aman Greval",
  "address": "123 MG Road, Bengaluru",
  "contactNumber": "+91-9876543210",
  "email": "aman@example.com"
}

--Delete Customer
DELETE http://localhost:${PORT}/admin/:id 
`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
