function rr(processes,timeQuantum){
    let n = processes.length;

    let ganttChart = [];
    let queue = [];

    let time = 0;
    let completed = 0;

    processes.forEach(p =>{
        p.remainingTime = p.bt;
        p.completed = false;
    });

    processes.sort((a,b)=> a.at - b.at);

    let index = 0;

    while(completed<n){
        while(index < n && processes[index].at <= time){
            queue.push(processes[index]);
            index++;
        }

        if(queue.length == 0){
            time++;
            continue;
        }

        let p = queue.shift();

        let startTime = time;

        let executeTime = Math.min(timeQuantum , p.remainingTime);
        time+= executeTime;

        p.remainingTime -= executeTime;

        ganttChart.push({
            pid : p.pid,
            start : startTime,
            end : time
        });

        while(index < n && processes[index].at <= time){
            queue.push(processes[index]);
            index++;
        }

        if(p.remainingTime > 0){
            queue.push(p);
        }
        else{
            p.ct = time;
            p.tat = p.ct - p.at;
            p.wt = p.tat - p.bt;

            p.completed = true;
            completed++;
        }
    }

    let totWt = 0;
    let totTat = 0;

    processes.forEach(p =>{
        totTat += p.tat;
        totWt += p.wt;
    });

    return{
        processes,
        avgTAT : (totTat/n).toFixed(2),
        avgWT : (totWt/n).toFixed(2),
        ganttChart
    };
};

module.exports = rr;