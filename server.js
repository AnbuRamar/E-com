const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const storeRoutes = require('./routes/store');
const orderRoutes = require('./routes/order');
const orderReturnRoutes = require('./routes/orderReturn');

const app = express();
const PORT = process.env.PORT || 3000;

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());

connectDB();

app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', storeRoutes);
app.use('/api', orderRoutes);
app.use('/api', orderReturnRoutes);
app.use('/pdf/file', express.static(path.join(__dirname, './files')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
