const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let mockUser = {
  pin: "1234",
  balance: 5000
};

app.post('/api/login', (req, res) => {
  const { pin } = req.body;
  if (pin === mockUser.pin) {
    return res.json({ success: true, balance: mockUser.balance });
  }
  res.json({ success: false, message: 'Invalid PIN' });
});

app.post('/api/deposit', (req, res) => {
  const { pin, amount } = req.body;
  if (pin === mockUser.pin && amount > 0) {
    mockUser.balance += amount;
    return res.json({ success: true, balance: mockUser.balance });
  }
  res.json({ success: false, message: 'Invalid deposit' });
});

app.post('/api/withdraw', (req, res) => {
  const { pin, amount } = req.body;
  if (pin === mockUser.pin && amount > 0 && amount <= mockUser.balance) {
    mockUser.balance -= amount;
    return res.json({ success: true, balance: mockUser.balance });
  }
  res.json({ success: false, message: 'Invalid withdrawal' });
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
