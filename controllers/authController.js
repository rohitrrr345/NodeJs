const AuthService = require('../services/authService');

class AuthController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;
      const result = await AuthService.register(username, password);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await AuthService.login(username, password);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = AuthController;
