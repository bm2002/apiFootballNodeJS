const express = require('express');
const mongoose = require('mongoose');
const jsonParser = express.json();

mongoose.connect('mongodb://localhost:27017/football', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
});

// const Schema = mongoose.Schema;

const app = express();

//const userScheme = require('./app/models/user')

const userScheme = mongoose.Schema({
    'fullName': {
        type: String
    },
    'team': {
        type: String
    },
    'avatar': {
        type: String
    },
    'profile' :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }
}, { versionKey: false });

const User = mongoose.model('User', userScheme);

const profileScheme = mongoose.Schema({
    'user_id': {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    'music': {
        type: String
    },
    'job': {
        type: String
    },
    'age': {
        type: Number
    }
}, { versionKey: false });

const Profile = mongoose.model('Profile', profileScheme);

app.listen(3001, function () {
    console.log('Сервер ожидает подключения...');
});

app.get('/api/users', function (req, res) {
    User.find({}, function (err, docs) {
        if (err) res.send(err);

        res.send(docs);

    });
});

app.get('/api/user/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if(!err && user){
            Profile.findOne({user_id:req.params.id},function(error,profile){
                if(!error && profile){
                    user.profile=profile;
                }else{
                    user.profile=null;
                }
                res.send(user);
           });
        }
    });
//     User.findById(req.params.id).populate('profile').exec(function(err,user){
//         if (err) res.send(err);

//         res.send(user);
//    });
});

app.post('/api/createUser', jsonParser, function (req, res) {

    var user = new User({
        fullName: req.body.fullName,
        team: req.body.team,
        avatar: req.body.avatar
    });

    User.create(
        user,
        function (err, doc) {
            // mongoose.disconnect();

            if (err) res.send(err);

            res.send(doc);
        }
    )
});

app.post('/api/createProfile', jsonParser, function (req, res) {

    var profile = new Profile({
        user_id: req.body.user_id,
        music: req.body.music,
        job: req.body.job,
        age: req.body.age
    });

    Profile.create(
        profile,
        function (err, doc) {
            // mongoose.disconnect();

            if (err) res.send(err);

            res.send(doc);
        }
    )
});
 
app.put('/api/userupdate', jsonParser, function (req, res) {

    User.findByIdAndUpdate(req.body._id,
        {
            $set: {
                fullName: req.body.fullName,
                team: req.body.team,
                avatar: req.body.avatar
            }
        },
        function (err, doc) {
            // mongoose.disconnect();

            if (err) res.send(err);

            User.findById(req.body._id, function (err2, doc2) {
                // mongoose.disconnect();

                if (err) res.send(err2);

                res.send(doc2);
            });
        });
});

app.delete('/api/userdelete/:id', function (req, res) {
    User.findByIdAndDelete(req.params.id, function (err, doc) {
        // mongoose.disconnect();

        if (err) res.send(err);

        res.send(doc);
    });
});



app.get('/api/test', function (req, res) {

    const user = new User({
        fullName: 'Bill2',
        team: 'team2',
        avatar: 'avatar2'
    });

    res.send(user);
});


process.on("SIGINT", () => {
    mongoose.disconnect();
    process.exit();
});



