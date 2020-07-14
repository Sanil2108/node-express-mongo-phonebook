const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
});

userSchema.methods.firstName = function () {
    return this.name.split(' ')[0];
}

userSchema.methods.lastName = function () {
    return this.name.split(' ')[1];
}

module.exports = mongoose.model('User', userSchema);
