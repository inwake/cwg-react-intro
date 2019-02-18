function ajaxRequest(requestType, url, requestData) {

    const args = arguments;
    let ajaxSuccess;
    let headersArray;
    let callback;

    for (let i = 0; i < args.length; i++) {
        if (typeof args[i] === 'object') {
            headersArray = Object.entries(args[i]);
        } else if (typeof args[i] === 'function') {
            callback = args[i];
        }
    }

    var httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        console.warn('Giving up :( Cannot create an XMLHTTP instance');
    }

    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            const responseData = JSON.parse(httpRequest.responseText);
            const rawResponseHeaders = httpRequest.getAllResponseHeaders().trim().split(/[\r\n]+/);
            let responseHeaders = {};

            rawResponseHeaders.forEach(function(line) {
                const parts = line.split(': ');
                const header = parts.shift().replace("-", "");
                const value = parts.join(': ');
                responseHeaders[header] = value;
            });

            if (httpRequest.status === 200 || httpRequest.status === 201) {
                ajaxSuccess = true;
                callback(ajaxSuccess, responseData, responseHeaders);
            } else {
                console.warn("Ajax Request NOT Successful " + httpRequest.status);
                console.log(responseHeaders);
                console.log(responseData);
                ajaxSuccess = false;
                callback(ajaxSuccess, responseData, responseHeaders);
            }
        }
    };

    httpRequest.open(requestType.toUpperCase(), url);
    httpRequest.setRequestHeader("Accept", "application/json");
    httpRequest.setRequestHeader("Content-Type", "application/json");

    if (typeof headersArray !== 'undefined') {
        headersArray.forEach(function (arrayIndex) {
            httpRequest.setRequestHeader(arrayIndex[0], arrayIndex[1]);
        });
    }

    httpRequest.send(JSON.stringify(requestData));
}

export default ajaxRequest;