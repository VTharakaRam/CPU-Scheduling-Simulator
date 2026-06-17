function fcfs(processes){
    let n = processes.length;
    processes.sort((a,b)=> a.at - b.at);

    let time = 0;
    let result = [];
    let ganttChart = [];

    processes.forEach(process => {
        if(time < process.at){
            time = process.at;
        }

        let startTime = time;
        process.ct = time + process.bt;
        process.tat = process.ct - process.at;
        process.wt = process.tat - process.bt;
        time = process.ct;

        result.push(process);

        ganttChart.push({
            pid : process.pid,
            start : startTime,
            end : time
        });
    });

    let totWt = 0;
    let totTat = 0;

    for(let p of result){
        totTat += p.tat;
        totWt += p.wt;
    }


    return {
        processes : result,
        avgTAT : (totTat/n).toFixed(2),
        avgWT : (totWt/n).toFixed(2),
        ganttChart
    };
};

module.exports = fcfs;