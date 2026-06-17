# CPU Scheduling Simulator

A web-based CPU Scheduling Simulator that visualizes CPU scheduling algorithms using Gantt Charts and computes key performance metrics such as Completion Time (CT), Turnaround Time (TAT), and Waiting Time (WT).

---

## Project Structure

cpu-scheduling-simulator/
├── algorithm/        (FCFS, SJF, SRTF, Priority, RR)
├── public/           (CSS, JavaScript files)
├── views/            (EJS templates)
├── app.js            (Main server file)
├── package.json      (Project dependencies)

---

## Installation

git clone https://github.com/VTharakaRam/CPU-Scheduling-Simulator.git
cd cpu-scheduling-simulator  
npm install  
node app.js  

---

## How to Run

Open browser and go to:  
http://localhost:3000  

---

## How to Use

1. Select a scheduling algorithm (FCFS, SJF, SRTF, Priority, RR)
2. Enter process details:
   - Arrival Time
   - Burst Time
   - Priority (if required)
3. Enter Time Quantum (only for Round Robin)
4. Click Solve
5. View results:
   - Gantt Chart
   - Completion Time
   - Turnaround Time
   - Waiting Time
   - Average metrics

---

## Project Overview

This project simulates CPU scheduling algorithms used in Operating Systems. It dynamically takes process inputs, executes the selected scheduling algorithm on the backend, and visualizes execution using a Gantt Chart along with calculated performance metrics.

---

## Author

Tharaka Ram
