const Mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new Mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  userEmail: {
    type: Mongoose.SchemaTypes.Email,
    required: true,
    maxlength: 80,
    unique: true,
  },
  userPassCode: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get('jwtPrivateKey')
  );
  return token;
};

userSchema.pre('save', async function () {
  if (this.userEmail === 'admin@gmail.com') this.isAdmin = true;

  if (
    this.userName.length == '' ||
    this.userEmail.length == '' ||
    this.userPassCode.length == ''
  )
    return;
});

const User = Mongoose.model('User', userSchema);

exports.User = User;
exports.userSchema = userSchema;
