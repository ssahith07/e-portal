// const router = require("express").Router();
// const { User, validate } = require("../models/user");
// const bcrypt = require("bcrypt");

// router.post("/", async (req, res) => {
// 	try {
// 		const { error } = validate(req.body);
// 		if (error)
// 			return res.status(400).send({ message: error.details[0].message });

// 		const user = await User.findOne({ email: req.body.email });
// 		if (user)
// 			return res
// 				.status(409)
// 				.send({ message: "User with given email already Exist!" });

// 		const salt = await bcrypt.genSalt(Number(process.env.SALT));
// 		const hashPassword = await bcrypt.hash(req.body.password, salt);

// 		await new User({ ...req.body, password: hashPassword }).save();
// 		res.status(201).send({ message: "User created successfully" });
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });

// module.exports = router;


// const router = require("express").Router();
// const { Seeker, Recruiter, validate } = require("../models/user");
// const bcrypt = require("bcrypt");

// router.post("/", async (req, res) => {
//   try {
// 	console.log("Request Body:", req.body);
//     const { error } = validate(req.body);
//     if (error) {
//       return res.status(400).send({ message: error.details[0].message });
//     }

//     const { email, password, Role } = req.body;

//     // Determine the user model based on the role
//     const userModel = Role === "seeker" ? Seeker : Recruiter;

//     // Check if the user with the given email already exists
//     const user = await userModel.findOne({ email });
//     if (user) {
//       return res.status(409).send({ message: "User with given email already exists" });
//     }

//     // If the user does not exist, proceed with creating the user
//     const salt = await bcrypt.genSalt(Number(process.env.SALT));
//     const hashPassword = await bcrypt.hash(password, salt);

//     await new userModel({ ...req.body, password: hashPassword }).save();
//     res.status(201).send({ message: "User created successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

// module.exports = router;


const router = require("express").Router();
const { Seeker, Recruiter, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      console.error("Validation Error:", error);
      return res.status(400).send({ message: error.details[0].message });
    }

    const { email, password, Role } = req.body;

    // Determine the user model based on the role
    const userModel = Role === "seeker" ? Seeker : Recruiter;

    // Check if the user with the given email already exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).send({ message: "User with given email already exists" });
    }

    // If the user does not exist, proceed with creating the user
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user object before saving
    const userToSave = new userModel({ ...req.body, password: hashPassword });

 

    // Save the user to the database
    await userToSave.save();

   

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;

