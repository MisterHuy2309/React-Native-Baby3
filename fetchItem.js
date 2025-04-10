const mongoose = require('mongoose');

// Kết nối tới đúng database "Web"
mongoose.connect('mongodb+srv://huy12589:0933689164huy@chauhuy.fcqn30a.mongodb.net/Web')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Connection error:', err));

// Định nghĩa Schema
const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
});

// Ép Mongoose dùng đúng collection "Items"
const Item = mongoose.model('Item', itemSchema, 'Items');

// Hàm fetch
const fetchItems = async () => {
    try {
        const items = await Item.find();
        console.log('Items:', items);
    } catch (error) {
        console.error('Error fetching items:', error);
    } finally {
        mongoose.connection.close();
    }
};

fetchItems();
