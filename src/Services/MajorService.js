const ApiUrl = "http://localhost:8081";


export const maj = {
    getList,
    getTop,
}

function getList() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${ApiUrl}/getMajors`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // console.log("This is data: " + data);
            return data;
        })
}

function getTop() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${ApiUrl}/getTopMajors`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // console.log("This is data: " + data);
            return data;
        })
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                //logout();
                //window.location.reload(true);
                alert('code: 401');
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export default maj;