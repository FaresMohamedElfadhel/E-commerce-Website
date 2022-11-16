const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://ecommerce:fares1012141618@cluster0.myiiy.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
    })
    
    .then(() => console.log('Succefuly connected'))
    .catch((err) => console.log('Connection error : ', err));