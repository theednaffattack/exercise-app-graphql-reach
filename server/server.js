// server.js

// init project
const atob = require("atob");
const bodyParser = require("body-parser");
const btoa = require("btoa");
const chalk = require("chalk");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const myNetworkInterfaces = require("./helpers/networkInterfaces");

const { log } = console;

const bottomLabel = log(
  chalk
    .bgHex("#89CFF0")
    .hex("#36454F")
    .bold("\n   👍🏾   inside POST /api/exercises/add   👍🏾  \n")
);

const whitelist = [
  "http://localhost:7070",
  "http://evil.com/",
  "http://192.168.180.160:7070",
  "http://192.168.180.248:7070"
];
const corsOptions = {
  origin(origin, callback) {
    if (origin) {
      if (whitelist.indexOf(origin) !== -1) {
        console.log("origin");
        console.log(origin);
        callback(null, true);
      } else {
        console.log("not reading whitelist??????");
        console.log(origin);
        callback(null, true);

        // callback(new Error("Not allowed by CORS"));
      }
    } else {
      // callback(new Error("Can't detect Origin!!!"));
      callback(null, true);
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const { Exercise } = require("./models/Exercise");
const { ExerciseUser } = require("./models/ExerciseUser");

const app = express();

const connectionString = process.env.MONGO_ATLAS_CONNECTION_STRING;

const port = process.env.PORT || 8080;

// http://expressjs.com/en/starter/static-files.html
app.use(cors(corsOptions));
app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
// http://expressjs.com/en/starter/basic-routing.html
app.get("/*", function(request, response) {
  response.sendFile(path.resolve(__dirname + "/../dist/index.html"), function(
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// app.get('/*', function(req, res) {
//   res.sendFile(path.resolve(__dirname, 'path/to/your/index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

app.get("/:hash", (req, res) => {
  const baseId = req.params.hash;
  const id = atob(baseId);
  Exercise.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      res.redirect(doc.url);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/api/exercise/log", function(req, res) {
  let userId = req.userId;
  let from = req.from;
  let to = req.to;
  let limit = req.limit;

  // PSUEDO:
  // if, from, to, and limit are absent get all of the user's exercises
});

app.post("/api/getShortLink", (req, res, next) => {
  // const { hash } = req.body;
  console.log("hash");
  console.log(req.body);
  // const id = atob(hash);
  // let shortLink = {hash: baseId, }
  // TODO: add the host data
  res.send(req.body);
});

app.post("/api/exercise/new-user", function(req, res, next) {
  log(
    chalk
      .bgHex("#89CFF0")
      .hex("#36454F")
      .bold("\n   👍🏾   inside POST /api/exercises/new-user   👍🏾  \n")
  );
  log(req.body);

  let { username } = req.body;

  const exerciseUser = new ExerciseUser({
    username
  });
  exerciseUser.save((err, doc) => {
    // Use any CSS color name

    // crayon('#ffcc00').log('old gold');

    // Compose multiple styles using the chainable API
    // log(chalk.grey.bgGreen.bold('FROM SAVE'));

    log(
      chalk
        .bgHex("#89CFF0")
        .hex("#36454F")
        .bold("\n      SAVING EXERCISE    \n")
    );
    // guard-if statement to block execution if an error is detected
    if (err) return console.error(err);

    let { username: usernameFromResponse, _id: userId } = doc;

    // log the doc returned from mongo?
    log(
      chalk
        .bgHex("#89CFF0")
        .hex("#36454F")
        .bold("\n      FROM MONGO: USER    \n" + JSON.stringify(doc, null, 2))
    );

    // otherwise log it on the console and respond
    log("saving \n", {
      username,
      status: 200,
      statusTxt: "OK"
    });
    res.send({
      usernameFromResponse,
      userId,
      status: 200,
      statusTxt: "OK"
    });
  });
});

app.post("/api/exercise/add", function(req, res, next) {
  log(
    chalk
      .bgHex("#89CFF0")
      .hex("#36454F")
      .bold("\n   👍🏾   inside POST /api/exercises/add   👍🏾  \n")
  );
  log(req.body);

  let { userId, date, description, duration } = req.body;

  const exercise = new Exercise({
    userId,
    date,
    description,
    duration
  });
  exercise.save(err => {
    // Use any CSS color name

    // crayon('#ffcc00').log('old gold');

    // Compose multiple styles using the chainable API
    // log(chalk.grey.bgGreen.bold('FROM SAVE'));

    log(
      chalk
        .bgHex("#89CFF0")
        .hex("#36454F")
        .bold("\n      SAVING EXERCISE    \n")
    );
    // guard-if statement to block execution if an error is detected
    if (err) return console.error(err);

    // otherwise log it on the console and respond
    log("saving \n", {
      userId,
      date,
      description,
      duration,
      status: 200,
      statusTxt: "OK"
    });
    res.send({
      userId,
      date,
      description,
      duration,
      status: 200,
      statusTxt: "OK"
    });
  });
});

app.post("/shorten", (req, res, next) => {
  console.log("Inside post req.body.url");
  console.log(req.body);
  const urlData = req.body.url;
  Url.findOne({ url: urlData }, (err, doc) => {
    if (doc) {
      console.log("entry found in db");
      console.log({
        url: urlData,
        hash: btoa(doc._id),
        status: 200,
        statusTxt: "OK"
      });
      res.send({
        url: urlData,
        hash: btoa(doc._id),
        status: 200,
        statusTxt: "OK"
      });
    } else {
      console.log("entry NOT found in db, saving new");
      const stringUrl = urlData.toString();
      const url = new Url({
        url: stringUrl
      });
      url.save(() => {
        // Use any CSS color name

        // crayon('#ffcc00').log('old gold');

        // Compose multiple styles using the chainable API
        // log(chalk.grey.bgGreen.bold('FROM SAVE'));

        log(
          chalk
            .bgHex("#89CFF0")
            .hex("#36454F")
            .bold("\n      FROM SAVE    \n")
        );
        console.log("url._id");
        console.log(url._id);
        console.log("btoa");
        console.log(btoa(url._id));
        if (err) console.error(err);
        res.send({
          url: urlData,
          hash: btoa(url._id),
          status: 200,
          statusTxt: "OK"
        });
      });
    }
  });
});

var network = require("network");

// ROUTES
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  log(
    chalk
      .bgHex("#FFCC00")
      .hex("#36454F")
      .bold(
        `              Your app is listening at http://${
          myNetworkInterfaces[0].address
        }:${port}              `
      )
  );
});

// connect to mongoose
// the `dbName` below is essential, the db in the connection string is now ignored
const db = mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    dbName: "test"
  }
);

db.then(
  database => {
    console.log("we're connected to mongoDB!");
  },
  err => {
    console.error(err);
  }
).catch(err => {
  console.error(err);
});
