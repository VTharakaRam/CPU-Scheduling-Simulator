function srtf(processes){
    let n = processes.length;

    processes.forEach(p =>{
        p.remainingTime = p.bt;
    });

    let time=0 , completed=0;
    let result = [];
    let ganttChart = [];

    let lastProcess = null;

    while(completed<n){
        let available = processes.filter(p =>
            p.remainingTime > 0 && p.at <= time
        );

        if(available.length == 0){
            time++;
            continue;
        }

        available.sort((a,b)=>{
            if(a.remainingTime === b.remainingTime){
                return a.at - b. at;
            }
            return a.remainingTime - b.remainingTime;
        });

        let p = available[0];

        if(!lastProcess || lastProcess.pid !== p.pid){
            ganttChart.push({
                pid : p.pid,
                start :time,
                end : time+1
            });
        }
        else{
            ganttChart[ganttChart.length-1].end++;
        }

        p.remainingTime--;
        time++;

        if(p.remainingTime == 0){

            p.ct = time;
            p.tat = p.ct - p.at;
            p.wt = p.tat - p.bt;

            result.push({
                pid : p.pid,
                at : p.at,
                bt : p.bt,
                ct : p.ct,
                tat : p.tat,
                wt : p.wt
            });
            completed++;
        }

        lastProcess = p;
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


module.exports = srtf;