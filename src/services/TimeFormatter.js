export class TimeFormatter {
    constructor() { }

    formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60) || 0
        const seconds = Math.round((timeInSeconds - minutes * 60) || 0)
        return `${minutes < 10 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`
    }
}