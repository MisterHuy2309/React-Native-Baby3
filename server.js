const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/teddyshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema và model cho Cart
const cartSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});
const Cart = mongoose.model('Cart', cartSchema);

// Schema và model cho SaveItem
const savedItemSchema = new mongoose.Schema({
  name: String,
  desc: String,
});
const SavedItem = mongoose.model('SavedItem', savedItemSchema);

// Schema và model cho User
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  phone: String,
  address: String,
  avatar: String,
});
const User = mongoose.model('User', userSchema);

// Schema và model cho Order (ĐƠN HÀNG)
const orderSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', orderSchema);

// Route lưu giỏ hàng
app.post('/cart', async (req, res) => {
  const item = new Cart(req.body);
  await item.save();
  res.json(item);
});

// Route xóa toàn bộ giỏ hàng
app.delete('/cart', async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.json({ success: true, message: 'Đã xóa toàn bộ giỏ hàng' });
  } catch (err) {
    res.json({ success: false, message: 'Lỗi server' });
  }
});

// Route xóa 1 sản phẩm khỏi giỏ hàng dựa trên name, price, image
app.delete('/cart', async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    return res.json({ success: false, message: 'Thiếu thông tin' });
  }
  try {
    const result = await Cart.deleteOne({ name, price, image });
    if (result.deletedCount === 0) {
      return res.json({ success: false, message: 'Không tìm thấy sản phẩm để xóa' });
    }
    res.json({ success: true, message: 'Đã xóa sản phẩm khỏi giỏ hàng' });
  } catch (err) {
    res.json({ success: false, message: 'Lỗi server' });
  }
});

// Route lưu thông tin SaveItem
app.post('/saveditem', async (req, res) => {
  const { name, desc } = req.body;
  if (!name || !desc) return res.json({ success: false, message: 'Thiếu thông tin' });
  try {
    await SavedItem.create({ name, desc });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: 'Lỗi server' });
  }
});

// Route lấy danh sách SaveItem
app.get('/saveditem', async (req, res) => {
  const items = await SavedItem.find();
  res.json(items);
});

// Route đăng ký
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.json({ success: false, message: 'Thiếu thông tin' });
  const exists = await User.findOne({ username });
  if (exists) return res.json({ success: false, message: 'Tên đăng nhập đã tồn tại' });
  await User.create({ username, password });
  res.json({ success: true });
});

// Route đặt hàng
app.post('/order', async (req, res) => {
  const { productName, price } = req.body;
  if (!productName || !price) return res.json({ success: false, message: 'Thiếu thông tin' });
  try {
    await Order.create({ productName, price });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: 'Lỗi server' });
  }
});

// Route lấy thông tin user
app.get('/user/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) return res.json({ success: false, message: 'Không tìm thấy user' });
  res.json({ success: true, user });
});

// Route cập nhật thông tin user
app.put('/user/:username', async (req, res) => {
  const { name, email, phone, address, avatar } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { name, email, phone, address, avatar },
      { new: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: 'Lỗi server' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));