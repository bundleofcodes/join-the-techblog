var inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    //DOM events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function logMeOut() {
        logMeOut();
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logMeOut, 600000);
        //1000 milliseconds = 1 second
    }
};

window.onload = function () {
    inactivityTime();
};