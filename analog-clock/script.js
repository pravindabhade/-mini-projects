const hourHand = document.getElementById("hour");
const minuteHand = document.getElementById("minute");
const secondHand = document.getElementById("second");

// Update Clock
function updateClock() {

    const now = new Date();

    // Current Time
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Calculate Rotation
    const secondDeg = seconds * 6;

    const minuteDeg = (minutes * 6) + (seconds * 0.1);

    const hourDeg = ((hours % 12) * 30) + (minutes * 0.5);

    // Rotate Hands
    secondHand.style.transform =
        `translateX(-50%) rotate(${secondDeg}deg)`;

    minuteHand.style.transform =
        `translateX(-50%) rotate(${minuteDeg}deg)`;

    hourHand.style.transform =
        `translateX(-50%) rotate(${hourDeg}deg)`;

}

// Run Immediately
updateClock();

// Update Every Second
setInterval(updateClock, 1000);