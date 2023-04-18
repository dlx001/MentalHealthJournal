const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    calendarMap: {
        type:Map,
        of:Number,
        default:new Map(),
    }
});

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports=UserModel;