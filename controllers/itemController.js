const ItemService = require('../services/itemService');

class ItemController {
  static async createItem(req, res) {
    try {
      const { name, description } = req.body;
      const result = await ItemService.createItem(req.userId, name, description);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getItems(req, res) {
    try {
      const items = await ItemService.getItems(req.userId);
      res.json(items);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async updateItem(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const result = await ItemService.updateItem(req.userId, id, updates);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const result = await ItemService.deleteItem(req.userId, id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = ItemController;
