const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/rideease', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log('MongoDB connected'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/bookings', require('./routes/bookings'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
