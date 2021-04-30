async function request(url, username, password, method="get", body=null) {
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

    const response = await fetch(url, options);
    return response.json();
}
export default request;