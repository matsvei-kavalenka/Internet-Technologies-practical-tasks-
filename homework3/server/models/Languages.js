const mongoose = require('mongoose');
const LanguagesSchema = new mongoose.Schema({
    userId: {
        type: String, required: true,
    },
    languages: {
        type: String, required: true,
    }
});

const LanguagesModel = mongoose.model('Languages', LanguagesSchema);
module.exports = LanguagesModel;