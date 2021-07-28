var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var { DateTime } = require('luxon')

var MessageSchema = new Schema({
  title: { type: String, minLength: 3, maxLength: 100, required: true },
  timestamp: { type: Date, required: true },
  text: { type: String, minLength: 3, maxLength: 250, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

MessageSchema.virtual('url').get(function() {
  return '/membersonly/message/' + this._id;
})

MessageSchema.virtual('date').get(function() {
  return DateTime.fromJSDate(this.timestamp).toFormat('dd-MM-yyyy').toString();
})

module.exports = mongoose.model('Message', MessageSchema);