require("dotenv").config()
const fs = require("fs")
const express = require("express")
const axios = require('axios');
const cache = require('memory-cache');

const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))

app.listen(3000, () => {
    
})

app.get("/", async (req, res) => {
    if (cache.get('weatherData')) {
      res.render("index", { data: cache.get('weatherData') })
    } else {
      const data = fs.readFileSync("./cities.json");
      const cityArr = JSON.parse(data).List;
    
      let str = "";
      for (let i = 0; i < cityArr.length; i++) {
        if (i !== 0) {
          str += ",";
        }
        str += cityArr[i].CityCode;
      }
    
      let response;
      try {
        response = await axios.get(
          "https://api.openweathermap.org/data/2.5/group?" +
            "id=" +
            str +
            "&units=metric" +
            "&APPID=" +
            process.env.API_KEY
        );
      } catch (error) {
        console.log(error);
      }

      cache.put('weatherData', response.data.list, 60000)
      res.render("index", { data: response.data.list })
    }
  });



