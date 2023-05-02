const timeToMilliseconds = (time, unit) => {
    if (unit === "MIN") {
        return time * 60 * 1000
    } else if (unit === "SEC") {
        return time * 1000
    } else {
        console.log("Unsupported time unit")
    }
}

const formatTimeAndDate = (time) => {
    return new Date(time * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true}) + ", " + new Date(time * 1000).toLocaleString('en-US', {month: 'short', day: 'numeric'})
}

const formatTime = (time) => {
    return new Date(time * 1000).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute:'numeric' })
}

module.exports = Object.freeze({
    timeToMilliseconds,
    formatTimeAndDate,
    formatTime
});