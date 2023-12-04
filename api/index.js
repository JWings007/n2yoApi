const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
console.log(process.env)
require('dotenv').config()
let userData = {};


const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => {
  console.log("Server started");
});

app.post("/", (req, res) => {
  userData = {
    lat: req.body.lat,
    lon: req.body.lon,
  };
});

app.get("/", (req, res)=> {
    res.send("WELCOME TO n2yo API FETCHER")
  })

app.get("/:norad", (req, res) => {
  const id = req.params.norad;
  axios
    .get(
      `https://api.n2yo.com/rest/v1/satellite/positions/${id}/${userData.lat}/${userData.lon}/0/300/&apiKey=${process.env.API_KEY}`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});
