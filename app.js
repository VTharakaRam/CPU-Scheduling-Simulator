const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const fcfs = require("./algorithm/fcfs");
const sjf = require("./algorithm/sjf");
const srtf = require("./algorithm/srtf");
const priority = require("./algorithm/priority");
const rr = require("./algorithm/rr");

app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
    res.render('home.ejs');
});


app.post('/result', (req, res) => {

    let algorithm = req.body.algorithm;
    
    let arivaltimes = req.body.arrivalTime;
    let bursttimes = req.body.burstTime;

    let processes = [];

    for (let i = 0; i < arivaltimes.length; i++) {
        processes.push({
            pid: `P${i + 1}`,
            at: parseInt(arivaltimes[i]),
            bt: parseInt(bursttimes[i])
        });
    }

    let result;
    if(algorithm === 'fcfs'){
        result = fcfs(processes);
    }
    else if(algorithm === "sjf"){
        result = sjf(processes);
    }
    else if(algorithm === "srtf"){
        result = srtf(processes);
    }
    else if(algorithm === "rr"){
        let TimeQuantum = parseInt(req.body.timeQuantum);
        result = rr(processes , TimeQuantum);
    }
    else{
        let priorities = req.body.priority;

        for(let i = 0; i < arivaltimes.length; i++){
            processes[i].priority = parseInt(priorities[i]);
        }

        result = priority(processes);
    }


    res.render('result.ejs', { result ,algorithm ,timeQuantum : req.body.timeQuantum });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});