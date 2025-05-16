const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB với xử lý lỗi
mongoose.connect('mongodb+srv://huy12589:0933689164huy@chauhuy.fcqn30a.mongodb.net/items', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Kết nối MongoDB thành công'))
.catch((error) => console.error('Lỗi kết nối MongoDB:', error));

// Định nghĩa schema với validation
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên item là bắt buộc'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    min: [0, 'Giá không được âm'],
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Item = mongoose.model('Item', itemSchema);

// API endpoints

// Lấy tất cả items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Lấy item theo ID
app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Không tìm thấy item' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Tạo item mới
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi tạo item', error: error.message });
  }
});

// Cập nhật item
app.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Không tìm thấy item' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi cập nhật item', error: error.message });
  }
});

// Xóa item
app.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Không tìm thấy item' });
    }
    res.json({ message: 'Xóa item thành công', item: deletedItem });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa item', error: error.message });
  }
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Có lỗi xảy ra!', error: err.message });
});

app.listen(3003, () => console.log('Server đang chạy tại port 3003'));