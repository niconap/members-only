var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, minLength: 3, maxLength: 100, required: true },
  last_name: { type: String, minLength: 3, maxLength: 100, required: true },
  username: { type: String, minLength: 3, maxLength: 100, required: true },
  password: { type: String, minLength: 8, required: true },
  membership_status: { 
    admin: { type: Boolean, required: true },
    member: { type: Boolean, required: true }
  }
})

UserSchema.virtual('url').get(function() {
  return '/membersonly/user/' + this._id;
})

module.exports = mongoose.model('User', UserSchema);