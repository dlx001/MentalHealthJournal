const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    time:String,
    description:String,
    val: String
})

const UserSchema = mongoose.Schema({
    email: String,
    calendarMap: {
        type:Map,
        of:{
            value:{
                type:Number,
                default:0
            },
            noteCollection:{
                type:[noteSchema],
                default:[]
            }
        },
        default: {}
    }
});

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports=UserModel;