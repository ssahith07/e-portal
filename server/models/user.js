// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const Joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");

// const userSchema = new mongoose.Schema({
// 	firstName: { type: String, required: true },
// 	lastName: { type: String, required: true },
// 	email: { type: String, required: true },
// 	password: { type: String, required: true },
// });

// userSchema.methods.generateAuthToken = function () {
// 	try {
// 		const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
// 			expiresIn: "7d",
// 		});
// 		return token;
// 	} catch (error) {
// 		console.error('Error generating auth token:', error);
//         throw new Error('Error generating auth token');
// 	}
	
// };

// const User = mongoose.model("user", userSchema);

// const validate = (data) => {
// 	const schema = Joi.object({
// 		firstName: Joi.string().required().label("First Name"),
// 		lastName: Joi.string().required().label("Last Name"),
// 		email: Joi.string().email().required().label("Email"),
// 		password: passwordComplexity().required().label("Password"),
// 	});
// 	return schema.validate(data);
// };

// module.exports = { User, validate };


const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  Role: { type: String, required: true }, // Add a 'role' field to distinguish between Seekers and Recruiters
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

// Define the Seeker model
const Seeker = mongoose.model("seeker", userSchema);

// Define the Recruiter model
const Recruiter = mongoose.model("recruiter", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    Role: Joi.string().valid("seeker", "recruiter").required().label("Role"), // Add validation for 'role'
  });
  return schema.validate(data);
};

module.exports = { Seeker, Recruiter, validate };
