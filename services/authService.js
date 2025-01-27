const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = process.env;

class AuthService {
  static async register(username, password) {
    const existingUser = await User.findOne({ username });
    if (existingUser) throw new Error('User already exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    return { message: 'User registered successfully' };
  }

  static async login(username, password) {
    const user = await User.findOne({ username });
    if (!user) throw new Error('Invalid username or password');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid username or password');
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    return { token };
  }
}

module.exports = AuthService;
