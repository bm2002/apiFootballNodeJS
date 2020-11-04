const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

let dbClient;

app.use(express.static(__dirname + "/public"));

mongoClient.connect(function (err, client) {
    if (err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("football").collection("users");
    app.listen(3001, function () {
        console.log("Сервер ожидает подключения...");
    });
});

app.get("/api/users", function (req, res) {

    const collection = req.app.locals.collection;
    collection.find({}).toArray(function (err, users) {

        if (err) return console.log(err);
        res.send(users)
    });

});

app.get("/api/test", function (req, res) {
    res.send('test');
});

app.get("/api/users/:id", function (req, res) {

    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOne({ _id: id }, function (err, user) {

        if (err) return console.log(err);
        res.send(user);
    });
});

app.post("/api/createUser", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const user = {
        fullName: req.body.fullName,
        team: req.body.team,
        avatar: req.body.avatar
    };

    const collection = req.app.locals.collection;
    try {
        collection.insertOne(user, function (err, result) {

            // if(err) res.send(err);
            res.send(user);
        });
    }
    catch (e) {
        res.send(e.message);
    }
});

app.delete("/api/userdelete/:id", function (req, res) {

    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({ _id: id }, function (err, result) {

        if (err) return console.log(err);
        let user = result.value;
        res.send(user);
    });
});

app.put("/api/userupdate", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    // res.send(new objectId(req.body._id));

    const collection = req.app.locals.collection;
    collection.findOneAndUpdate({ _id: new objectId(req.body._id) }, {
        $set: {
            fullName: req.body.fullName.trim(),
            team: req.body.team,
            avatar: req.body.avatar
        }
    },
        { returnOriginal: false }, function (err, result) {

            if (err) return console.log(err);
            const user = result.value;
            res.send(user);
        });
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});