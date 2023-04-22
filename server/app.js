const fs = require("fs")
require("dotenv").config("")
const cors = require('cors');
const axios = require('axios');
const express = require("express")
const { SERVER_PORT, DATA_PATH, UNITS, CLIENT_URL } = require("../src/constants")

const app = express()

const PORT = SERVER_PORT
const API_KEY = process.env.API_KEY || "83dd8a350290b263b44e060cb003ebf3"

app.use(cors({
    origin: CLIENT_URL
}))

app.get("/api", (req, res) => {

    fs.readFile(DATA_PATH, async (err, data) => {

        if (err) {
            res.send({"error": err.message})
        }

        const jsonData = JSON.parse(data);
        // STEP 1
        let cityCodes = jsonData.List.map(item => item.CityCode)
        cityCodes = cityCodes.join(',')

        // STEP 2
        try {
            let response = await axios.get(`https://api.openweathermap.org/data/2.5/group?id=${cityCodes}&units=${UNITS}&APPID=${API_KEY}`)
            res.send({"data": response.data.list})
        } catch (error) {
            res.send({"error": error.message})
        }
    })
})

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})
