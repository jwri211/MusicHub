const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

Schema = mongoose.Schema;

//Describes the users of the MusicHub database.
var UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    hash_password: {
        type: String
      },
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };

mongoose.model("User", UserSchema);
