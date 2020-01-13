const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const ZCRMRestClient = require("zcrmsdk");
const mysql_util = require("zcrmsdk/lib/js/mysql/mysql_util");
const initialzie = require("./zoho/Initialize");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(pino);

const xdfRoutes = express.Router();
app.use("/xdf", xdfRoutes);

const port = 3300;

xdfRoutes.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

xdfRoutes.get("/getRecords/:module", function(req, res) {
  try {
    ZCRMRestClient.initialize().then(function() {
      mysql_util.getOAuthTokens().then(function(result) {
        if (result == null || result.length === 0) {
          //This token needs to be updated for initialization
          let token =
            "1000.8b10455febcd56e8884f7d92799ec540.fd95d5251a143391c26791afc38c3aa2";
          initialzie.getTokenOnetime(token);
        } else {
          getRecords(req.params.module, res);
        }
      });
    });
  } catch {
    throw new Error("exception!\n");
  }
});

function getRecords(module, res) {
  let input = {};
  input.module = module;
  ZCRMRestClient.API.MODULES.get(input).then(function(response) {
    let data = JSON.parse(response.body).data;
    res.send(data);
  });
}

app.listen(port, () =>
  console.log("Express server is running on localhost:" + port)
);
