const time = document.getElementById("time");
const day = document.getElementById("day");
const date = document.getElementById("date");

// Days
const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

// Months
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// Update Clock
function updateClock() {

    const now = new Date();

    // Time
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // 24 Hour Format
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    time.innerHTML = `${hours}:${minutes}:${seconds}`;

    // Day
    day.innerHTML = days[now.getDay()];

    // Date
    date.innerHTML =
        `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

}

// Update Immediately
updateClock();

// Update Every Second
setInterval(updateClock, 1000);