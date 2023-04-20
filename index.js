const fs = require("fs")
const express = require("express")

const app = express()

app.set("view engine", "ejs")

app.listen(3000, () => {
    const data = fs.readFileSync("./cities.json");
    const obj = JSON.parse(data);
    console.log(obj.List[0])
})

app.get("/", (req, res) => {
    const data = fs.readFileSync("./cities.json");
    const obj = JSON.parse(data);
    console.log(obj.List[0])
    res.render("index")
})

