const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: { 
        type: String, required: true, 
    }, 
    age:{ 
        type: Number, required: true, 
    }, 
    username: { 
        type: String, required: true, 
    },
    email: { 
        type: String, required: false, 
    },
    birth_date: { 
        type: String, required: false, 
    }
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;