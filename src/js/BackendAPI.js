async function requestFromAPI(url, username, password, method="get", body=null) {
    let correctUrl = url.replace("localhost:8080", "Powerninefinal-env.eba-uampycwm.us-east-2.elasticbeanstalk.com")
    console.log(correctUrl)
    let options = {
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            Authorization: "Basic " + btoa(username + ":" + password),
            'Content-Type': 'application/json'
        },
        method: method
    };

    if (body !== null)
        options.body = JSON.stringify(body);

    const response = await fetch(correctUrl, options);
    return response.json();
}

export default requestFromAPI;