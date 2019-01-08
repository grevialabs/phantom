/**
 * This calls N instances of URL in parallel
 */
// var url = "http://example.com/";
var url = "http://servicedev.klgsys.com";
var N = 30;

var cnt = 0;

function onResourceReceived(response) {
    console.log((Date.now() - startTime) + ':' + response.stage + ':' + response.url);
}

function onResourceRequested(requestData, networkRequest) {
    console.log((Date.now() - startTime) + ':Request:' + requestData.url);
}

function onCompletion(status) {
    ++cnt;
    console.log((Date.now() - startTime) + ':COMPLETE(' + cnt + '):' + status + ':' + this.url);
    if (cnt >= N) phantom.exit();
}

var startTime = Date.now();
for (var i = 0; i < N; i++) {
    var page = require('webpage').create();
    page.onResourceReceived = onResourceReceived;
    page.onResourceRequested = onResourceRequested;
    page.open(url + "?i=" + i, onCompletion); //Append i to allow tracking
}