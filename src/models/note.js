// The Note model
const config = require('../config');
const mongoose = require('mongoose')
   ,Schema = mongoose.Schema;

const noteSchema = new Schema({
    date: {type: Date, default: Date.now},
    author: {type: String, default: 'Anon'},
    title: String,
    content: String
});

noteSchema.virtual('id').get(function () {
    return this._id;
});

noteSchema.set('toJSON', {
    virtuals: true
});

noteSchema.pre('save', function (next) {
    this.title = this.title || this.get('content').slice(0, config.DEFAULT_LETTER_COUNT);
    next();
});

noteSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Note', noteSchema);