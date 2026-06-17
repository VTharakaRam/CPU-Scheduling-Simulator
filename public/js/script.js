const processTable = document.getElementById("processTable");
const addProcessBtn = document.getElementById("addProcessBtn");
const algorithmSelect = document.getElementById("algorithm");

addProcessBtn.addEventListener("click", () => {

    const processCount =
        processTable.querySelectorAll("tr").length + 1;

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>P${processCount}</td>

        <td>
            <input
                type="number"
                class="form-control"
                name="arrivalTime"
                min="0"
                required
            >
        </td>

        <td>
            <input
                type="number"
                class="form-control"
                name="burstTime"
                min="1"
                required
            >
        </td>

        <td class="priorityCell" style="display:${algorithmSelect.value === 'priority' ? "" : "none"}">
            <input 
                type="number"
                class="form-control" 
                name="priority"
                min="1"
            >
        </td>

        <td>
            <button
                class="btn btn-danger deleteBtn"
                type="button">
                Delete
            </button>
        </td>
    `;

    processTable.appendChild(row);
    updateUI();
});

processTable.addEventListener("click", (e) => {

    if(e.target.classList.contains("deleteBtn")){
        const rows = processTable.querySelectorAll("tr");

        if(rows.length === 1){
            alert("At least one process is required.");
            return;
        }

        e.target.closest("tr").remove();

        updateProcessNumbers();
    }

});

function updateProcessNumbers() {
    const rows = processTable.querySelectorAll("tr");

    rows.forEach((row, index) => {
        row.cells[0].textContent = `P${index + 1}`;
    });
};

function updateUI(){
    const algorithmInfo = document.getElementById("algorithmInfo");

    const info = {
            fcfs: `
                <strong>FCFS (First Come First Serve)</strong><br>
                Processes are executed in the order of arrival.
                It is a non-preemptive scheduling algorithm.
            `,

            sjf: `
                <strong>SJF (Shortest Job First)</strong><br>
                The process with the shortest burst time is executed first.
                It is a non-preemptive scheduling algorithm.
            `,

            srtf: `
                <strong>SRTF (Shortest Remaining Time First)</strong><br>
                The process with the shortest remaining execution time is selected.
                It is the preemptive version of SJF.
            `,

            priority: `
                <strong>Priority Scheduling</strong><br>
                The process with the highest priority is executed first.
                Lower priority number usually means higher priority.
                It is a non-preemptive scheduling algorithm.
            `,

            rr: `
                <strong>Round Robin (RR)</strong><br>
                Each process gets a fixed time quantum.
                After the quantum expires, the process moves to the end of the ready queue.
                It is a preemptive scheduling algorithm.
            `
    };
    
    algorithmInfo.innerHTML = info[algorithmSelect.value];
    

    const showPriority = algorithmSelect.value === 'priority';

    document.getElementById("priorityHeader").style.display = showPriority ? "" : "none";

    document.querySelectorAll(".priorityCell").forEach(cell => {
        
        cell.style.display = showPriority ? "" : "none";

        const input = cell.querySelector('input');
        
        if(input){
            input.required = showPriority;
        }
    });

    const showTimeQuantum = algorithmSelect.value === 'rr';

    document.getElementById("quantumDiv").style.display = showTimeQuantum ? "" : "none";

    const timeQuantumInput = document.querySelector("#timeQuantum");

    if(timeQuantumInput){
        timeQuantumInput.required = showTimeQuantum;
    }
};

algorithmSelect.addEventListener("change",updateUI);

updateUI();