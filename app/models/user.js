const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const userScheme = new Schema({
//     fullName: String,
//     team: String,
//     avatar: String
// }, {versionKey: false});

const userScheme = mongoose.Schema({
    'fullName':{
        type:String
    },
    'team' : {
        type:String
    },
    'avatar' : {
        type:String
    }
});

