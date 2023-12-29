
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');

//  User register
const registerController = async (req, res, next) => {
	const { name, email, password,} = req.body;
	
	console.log("object")
	try {
	  const existingUser = await User.findOne({ email });
	
	  if (existingUser) {
		return res.status(409).json({ error: 'Email already exists' });
	  }
	
	  const hashedPassword = await bcrypt.hash(password, 10);
	
	  const newUser = new User({
		name,
		email,
		password: hashedPassword,
		role:req.body.role || 'user'
	  });
	
	  await newUser.save();
	 console.log("swve data ")
	  res.json({ message: 'Registration successful' });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Internal server error' });
	}
  };
  
//   login and set cookie
  const loginController = async (req, res, next) => {
	try {
	  const { email, password } = req.body;
  
	  const user = await User.findOne({ email });
	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
  
	  const isPasswordMatch = await bcrypt.compare(password, user.password);
	  if (!isPasswordMatch) {
		return res.status(401).json({ error: 'Authentication failed' });
	  }
  
	  const token = jwt.sign(
		{ id: user.id, username: user.username, role: user.role },
		process.env.SECRET_KEY,
		{ expiresIn: '6h' }
	  );
  
	  res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful', token });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Internal server error' });
	}
  };
  


module.exports = { registerController, loginController };
