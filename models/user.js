//In this file, the model for user is created

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//Creating a schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

//Passing the result of requiring the package 'passport-local-mongoose'.
//This is going to add on to the schema: username, field for password.
//It will make sure that usernames are unique
UserSchema.plugin(passportLocalMongoose);

//Exporting the schema
module.exports = mongoose.model('User', UserSchema);
