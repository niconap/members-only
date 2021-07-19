var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  title: { type: String, minLength: 3, maxLength: 100, required: true },
  timestamp: { type: Date, required: true },
  text: { type: String, minLength: 3, maxLength: 250, required: true },
})

MessageSchema.virtual('url').get(function() {
  return '/app/message/' + this._id;
})

module.exports = mongoose.model('Message', MessageSchema);