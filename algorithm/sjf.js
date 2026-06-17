function sjf(processes){
    let n = processes.length;

    let time=0 , completed=0;
    let result = [];
    let ganttChart = [];

    processes.forEach(p =>{
        p.done = false;
    });

    while(completed<n){
        let available = processes.filter(p => !p.done && p.at <= time);
        
        if(available.length == 0){
            time++;
            continue;
        }

        available.sort((a,b)=> a.bt - b.bt);

        let p = available[0];
        
        let startTime = time;
        time+= p.bt;

        p.ct = time;
        p.tat = p.ct - p.at;
        p.wt = p.tat - p.bt;
        p.done = true;

        result.push(p);
        ganttChart.push({
            pid : p.pid,
            start : startTime,
            end : time
        });

        completed++;
    }

    let totWt = 0;
    let totTat = 0;

    for(let p of result){
        totTat += p.tat;
        totWt += p.wt;
    }

    return{
        processes : result,
        avgTAT : (totTat/n).toFixed(2),
        avgWT : (totWt/n).toFixed(2),
        ganttChart
    };
};


module.exports = sjf;