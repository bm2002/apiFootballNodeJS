// // module.exports = function (app, db) {
// // };

// const bodyParser = require("body-parser");
// const MongoClient = require('mongodb').MongoClient;

// // const urlencodedParser = bodyParser.urlencoded({extended: true});

// module.exports = function (app, db) {
    
//     app.post('/api/createUser', (req, res) => {

//         MongoClient.connect('mongodb://localhost:27017', (err, database) => {


//         // Здесь будем создавать заметку.
//         let ObjectID = require('mongodb').ObjectID;
//         const user = {
//             fullName: req.body.fullName,
//             team: req.body.team,
//             avatar: req.body.avatar,
//             _id: new ObjectID()
//         };
//         // db.collections('football').insert(user);
//         res.send(`${user.fullName} - ${user.team}`);
//         // db.products.insert( { item: "card", qty: 15 } )

//         // try {
//         //     // res.send(db.football.find().limit(1));
//         //     let db = client.db('football');
//         //     res.send(db.collections('football'));
//         // }
//         // catch (e){
//         //     res.send(e.message);
//         // }
//         // const users = db.collection('users');
//         // const user = new users({ a: 'abc' });
//         // try {
//             // const result = await user.save();
//             // res.send(result.id);  // this will be the new created ObjectId
//         // } catch  {
//         //     res.send('e');
//         // }
// });
// };