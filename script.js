
const currentTime = document.querySelector('h1');
const audio = new Audio('Alarm.mp3');

audio.loop = true;

let alarmTime = null;
let alarmTimeout = null;

const upcomingAlarmList = document.querySelector('#upcoming-alarms-list');
const addAlarm = document.querySelector('.setAlarm');
// for storing alarm list
const alarmList = []; 

// alarm ringing on right time
function ring(realTime) {
    audio.play();
    alert(`It's ${realTime}`);
}

// Shows the real time
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const realTime = `${hour}:${minutes}:${seconds}`;

    currentTime.innerText = `${hour}:${minutes}:${seconds}`;

    //      If the alarmList includes the current time "realTime" then ring() is called
    if (alarmList.includes(realTime)) {
        ring(realTime);
    }
}


function formatTime(time) {
    if (time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}

// function to clear  alarm
function stopAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
    }
}

// removes the alarm from the upcoming-alarms-list when "Delete Alarm" is clicked
upcomingAlarmList.addEventListener('click', e => {
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.remove();
    }
});

// removes the alarm from the alarmList array when "Delete Alarm" is clicked
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0; 
    alarmList.push.apply(alarmList, newList);
}


// Adds newAlarm 
function addNewAlarm(newAlarm) {
    const html = 
    `<li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm" onclick = "remove(this.value)" value=${newAlarm}>Clear</button>       
    </li>`
    upcomingAlarmList.innerHTML += html
};


// set a new alarm whenever the form is submitted 
addAlarm.addEventListener('submit', event => {

    event.preventDefault(); // to prevent default behaviour of webpage

    let hour = formatTime(addAlarm.hr.value);
    if (hour === '0') {
        hour = '00'
    }
    let minute = formatTime(addAlarm.min.value);
    if (minute === '0') {
        minute = '00'
    }
    let second = formatTime(addAlarm.sec.value);
    if (second === '0') {
        second = '00'
    }

    const newAlarm = `${hour}:${minute}:${second}`

    // add newAlarm to alarmList array
    if (isNaN(newAlarm)) {
        if (!alarmList.includes(newAlarm)) {
            alarmList.push(newAlarm);
            addNewAlarm(newAlarm);
            addAlarm.reset();
        } else {
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else {
        alert("Invalid Time Entered")
    }
})

// calls updateTime() every second
setInterval(updateTime, 1000);

