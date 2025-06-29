const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');


const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors()); // ← Enable CORS
app.use(express.json());

// Routes
app.use('/user', require('./router/userRouter'));
app.use('/auth', require('./router/authRouter'));
app.use('/product', require('./router/productRouter'));
app.use('/category', require('./router/categoryRouter'));
app.use('/ai', require('./router/aiRouter'));
app.use('/vet',require('./router/vetRouter'))
app.use("/appointment",require('./router/appointmentRouter'));
app.use('/esewa', require('./router/esewaRoutes'));
app.use('/cart', require('./router/cartRouter'));


app.use(express.json());



// Serve static uploads
app.use('/uploads', express.static('uploads'));

// Start Server
const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;

