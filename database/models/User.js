const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le champ "nom" est requis.']
    },
    email: {
        type: String,
        required: [true, 'Le champ "Email" est requis.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Le champ "Mot de passe" est requis.']
    }
})

UserSchema.pre('save', function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted;
        next()
    })
})

const User = mongoose.model('User', UserSchema);

module.exports = User;