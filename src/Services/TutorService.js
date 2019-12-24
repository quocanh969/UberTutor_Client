const ApiUrl = "http://localhost:8081";

export const ts = {
    getTopTutor,
    getTutorList,   
    getTutorDetail,
    getContracts,
}

function getTopTutor() {
    const requestOption = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${ApiUrl}/getTopTutor`, requestOption)
        .then(handleResponse);
}

function getTutorList(option) {
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(option),
    };

    return fetch(`${ApiUrl}/getTutorList`, requestOption)
        .then(handleResponse);
}

function getTutorDetail(id) {
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id}),
    };

    return fetch(`${ApiUrl}/getTutorDetail`, requestOption)
        .then(handleResponse);
}

function getContracts(option) {
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(option),
    };

    return fetch(`${ApiUrl}/getContracts`, requestOption)
        .then(handleResponse);
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