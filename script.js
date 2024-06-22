let startTime;
let updatedTime;
let difference;
let timerInterval;
let isRunning = false;
let lapTimes = [];

const display = document.getElementById('display');
const lapsList = document.getElementById('lapsList');

document.getElementById('start').addEventListener('click', () => {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 1000);
        isRunning = true;
    }
});

document.getElementById('pause').addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        isRunning = false;
    }
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timerInterval);
    display.innerText = '00:00:00';
    isRunning = false;
    difference = 0;
    lapTimes = [];
    updateLaps();
});

document.getElementById('lap').addEventListener('click', () => {
    if (isRunning) {
        const lapTime = difference + new Date().getTime() - startTime;
        lapTimes.push(formatTime(lapTime));
        updateLaps();
    }
});

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerText = formatTime(difference);
}

function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    let seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    return ${pad(hours)}:${pad(minutes)}:${pad(seconds)};
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

function updateLaps() {
    lapsList.innerHTML = '';
    lapTimes.forEach((lap, index) => {
        const li = document.createElement('li');
        li.innerText = Lap ${index + 1}: ${lap};
        lapsList.appendChild(li);
    });
}