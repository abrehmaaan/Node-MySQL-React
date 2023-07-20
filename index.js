import express from "express";
import request from "request";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors())

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "accessretail",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database!");
});

app.get('/', (req, res)=>{
    res.send("Hello World!");
})

app.get("/insert", (req, res) => {
  let url = "http://universities.hipolabs.com/search?country=Pakistan";
  request(url, { json: true }, (err, response, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching data");
    }
    let unis = [];
    for (let d of data) {
      unis.push({
        name: d.name,
        domain: d.domains[0],
        country: d.country,
        country_code: d.alpha_two_code,
        webpage: d.web_pages[0],
      });
    }
    console.log(unis);

    const insertQuery = "INSERT INTO universities (name, domain, country, country_code, webpage) VALUES ?";
    const values = unis.map((uni) => [
      uni.name,
      uni.domain,
      uni.country,
      uni.country_code,
      uni.webpage,
    ]);

    connection.query(insertQuery, [values], (err, result) => {
      if (err) {
        console.error("Error inserting data");
        return res.status(500).send("Error inserting data");
      }
      console.log("Data Inserted!");
      res.status(200).send("Data inserted!");
    });
  });
});

app.get("/universities", (req, res) => {
    const selectQuery = "SELECT * FROM universities";
    connection.query(selectQuery, (err, results) => {
      if (err) {
        console.error("Error fetching data");
        return res.status(500).send("Error fetching data");
      }
      res.status(200).json(results);
    });
  });

app.listen(8080, () => {
  console.log("Server Started!");
});
