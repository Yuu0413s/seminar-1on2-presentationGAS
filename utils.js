// 共通で使う便利な関数
function getFriday(baseDate, weeksAhead) {
    var date = new Date(baseDate);
    var day = date.getDay();
    var daysUntilFriday = (5 - day + 7) % 7;
    date.setDate(date.getDate() + daysUntilFriday + weeksAhead * 7);
    return date;
}

function formatDate(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
}

function parseTime(timeStr) {
    var parts = String(timeStr).split(":");
    var result = new Date();
    result.setHours(parseInt(parts[0]));
    result.setMinutes(parseInt(parts[1]));
    result.setSeconds(0);
    return result;
}