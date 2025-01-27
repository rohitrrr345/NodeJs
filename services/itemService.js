const Item = require('../models/Item');

class ItemService {
  static async createItem(userId, name, description) {
    const item = new Item({ name, description, createdBy: userId });
    await item.save();
    return item;
  }

  static async getItems(userId) {
    return await Item.find({ createdBy: userId });
  }

  static async updateItem(userId, itemId, updates) {
    const item = await Item.findOneAndUpdate(
      { _id: itemId, createdBy: userId },
      updates,
      { new: true }
    );
    if (!item) throw new Error('Item not found or unauthorized');
    return item;
  }

  static async deleteItem(userId, itemId) {
    const item = await Item.findOneAndDelete({ _id: itemId, createdBy: userId });
    if (!item) throw new Error('Item not found or unauthorized');
    return { message: 'Item deleted successfully' };
  }
}

module.exports = ItemService;
