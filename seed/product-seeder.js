var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/shopping');
var Product = require('../models/product');

var products = [
    
    new Product({
        imagePath: 'https://images.pexels.com/photos/6311140/pexels-photo-6311140.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        title: 'T-Shirt',
        description: 'Awesome Shirt!',
        price: 10
    }),
    new Product({
        imagePath: 'https://images.pexels.com/photos/6311140/pexels-photo-6311140.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        title: 'T-Shirt 2',
        description: 'Awesome Shirt!',
        price: 15
    }),
    new Product({
        imagePath: 'https://images.pexels.com/photos/6311140/pexels-photo-6311140.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        title: 'T-Shirt 3',
        description: 'Awesome Shirt!',
        price: 20
    }),
    new Product({
        imagePath: 'https://images.pexels.com/photos/6311140/pexels-photo-6311140.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        title: 'T-Shirt 3',
        description: 'Awesome Shirt!',
        price: 20
    }),
    new Product({
        imagePath: 'https://images.pexels.com/photos/6311140/pexels-photo-6311140.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        title: 'T-Shirt 3',
        description: 'Awesome Shirt!',
        price: 20
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
