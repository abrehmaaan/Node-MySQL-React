import express from "express";
import request from "request";

const app = express()

app.get('/', (req, res)=>{
    let name = req.query.country;
    let url = "http://universities.hipolabs.com/search?country=Pakistan";
    request(url, { json: true }, (err, response, data) => {
        if (err) { return console.log(err); }
        let unis = []
        for(let d of data){
            unis.push({
                name: d.name,
                domain: d.domains[0],
                country: d.country,
                country_code: d.alpha_two_code,
                webpage: d.web_pages[0]
            })
            console.log(unis);
        }
    });
    res.end()
})

app.listen(8080, ()=>{
    console.log("Server Started");
})