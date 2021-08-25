var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
const { schema } = require('./product');

var userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

//creating a encrypted password and returning it
userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

// this.password refers to the user on which this valid password method is executed
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);