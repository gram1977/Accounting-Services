const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer"], // adjust roles as needed
      required: true,
    },
  },
  { timestamps: true },
);

/*  
    In Mongoose, when you define a model like mongoose.model('Login', LoginSchema), 
    it creates (or uses) a collection named logins (lowercase, pluralized) in your MongoDB database. 
    So, Login is the model, and logins is the actual collection in MongoDB.

    LoginSchema is the Mongoose schema that defines the structure, data types, and validation rules for documents 
    in the Login (logins) collection. 
    It specifies what fields each document should have (like email, password, and role) and their constraints. 
*/
module.exports = mongoose.model("Login", LoginSchema);
