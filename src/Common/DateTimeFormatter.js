const DateTimeFormatter = () => {
    const format = (dt) => {
        var dateTime = new Date(dt);
        return dateTime.toLocaleDateString() || "";
    }

    return {
        format: format
    }
}

export default DateTimeFormatter;