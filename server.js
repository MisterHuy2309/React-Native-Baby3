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

const savedItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const SavedItem = mongoose.model('SavedItem', savedItemSchema);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên là bắt buộc'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email là bắt buộc'],
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/80'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

const cartItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
  // Nếu muốn lưu theo user:
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastMessage: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  unread: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/50'
  }
});

const Chat = mongoose.model('Chat', chatSchema);

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

// API lấy danh sách saved items
app.get('/saveditems', async (req, res) => {
  try {
    const items = await SavedItem.find();
    res.json({ data: items });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// API thêm saved item (nếu cần)
app.post('/saveditems', async (req, res) => {
  try {
    const newItem = new SavedItem(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi thêm item', error: error.message });
  }
});

// API lấy thông tin user (ví dụ lấy theo email)
app.get('/user/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// API cập nhật thông tin user
app.put('/user/:email', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi cập nhật user', error: error.message });
  }
});

// API lấy danh sách cart items
app.get('/cart', async (req, res) => {
  try {
    const items = await CartItem.find();
    res.json({ data: items });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// API thêm cart item (nếu cần)
app.post('/cart', async (req, res) => {
  try {
    const newItem = new CartItem(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi thêm item', error: error.message });
  }
});

// API lấy danh sách chat
app.get('/chats', async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// API thêm chat mới (nếu cần)
app.post('/chats', async (req, res) => {
  try {
    const newChat = new Chat(req.body);
    const saved = await newChat.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi thêm chat', error: error.message });
  }
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Có lỗi xảy ra!', error: err.message });
});

app.listen(3002, () => console.log('Server đang chạy tại port 3002'));