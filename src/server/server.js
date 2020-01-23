const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pino = require("express-pino-logger")();
const ZCRMRestClient = require("zcrmsdk");
const mysql_util = require("zcrmsdk/lib/js/mysql/mysql_util");
const initialzie = require("./zoho/Initialize");

const app = express();
app.use(cors());
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

async function getRecords(module, res) {
  let input = {};
  input.module = module;
  let params = {};
  params.per_page = 200;
  params.page = 1;
  input.params = params;
  // ZCRMRestClient.API.MODULES.get(input).then(function(response) {
  //   let data = JSON.parse(response.body).data;
  //   res.send(data);
  // });
  let resData = [];
  for (let i = 1; i <= 2; i++) {
    params.page = i;
    input.params = params;
    let asyncResp = await ZCRMRestClient.API.MODULES.get(input);
    let asyncdata = JSON.parse(asyncResp.body).data;
    resData = resData.concat(asyncdata);
    // console.log("resData");
    // console.log(resData);
  }
  // console.log("resData");
  // console.log(resData);

  res.send(resData);
}

app.listen(port, () =>
  console.log("Express server is running on localhost:" + port)
);
